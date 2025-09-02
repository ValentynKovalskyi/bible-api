import "dotenv/config";
import puppeteer, { connect } from "puppeteer";

import prisma from "../prisma/client.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();

/** 
 * Function collect Holy Bible verses from site. 
 * @param url - URL of table of content from source
*/
async function collectVariant(url: string, lang?: string) {

    const variantRootUrl = url.replace(/\/\w+\.\w+$/gi, "/");
    await page.goto(url, { waitUntil: "networkidle2"});
    const langCode = lang || await page.$eval("html", (html) => html.getAttribute("lang"));

    if(!langCode) throw Error("No language code on specified page. Add language code manually via second argument.");

    await prisma.language.create({
        data: {
            code: langCode,
            name: langCode,
        }
    });

    const bookHrefs = await page.$$eval("ul[class] > li > a", (elements) => elements.map(el =>  el.getAttribute("href")))

    for(let href of bookHrefs) {
        const bookIndex = Number.parseInt(href!.split("/")[0]);
        let chapterIndex = 1;
        await page.goto(variantRootUrl + href, { waitUntil: "networkidle2" });
        let nextChapterLink;

        do {
            const chapterRecord = await prisma.chapter.upsert({
                where: {
                    book_id_order_number: {
                        book_id: bookIndex,
                        order_number: chapterIndex
                    }
                },
                create: {
                    order_number: chapterIndex,
                    book: {
                        connect: {
                            id: bookIndex,
                        }
                    }
                },
                update: {
                    
                }
            });

            const verses = await page.$eval("[class=dimver] + p", (element) => {
                return element.innerText.split(/\r?\n(?=\d+\s)/).map((str, index) => {
                    const result = str.trim().split(/\s/);
                    if(index !== 0) result.shift();
                    return result.join(" ");
                });
            });
            
            const addVerses = verses.map(async (verse, index) => {
                const verseIndex = index + 1;
                const verseRecord = await prisma.verse.upsert({
                    where: {
                        chapter_id_order_number: {
                            chapter_id: chapterRecord.id,
                            order_number: verseIndex
                        }
                    },
                    create: {
                        order_number: verseIndex,
                        chapter: {
                            connect: {
                                book_id_order_number: {
                                    book_id: bookIndex,
                                    order_number: chapterIndex
                                }
                            }
                        }
                    },
                    update: {
                        
                    }
                });

                const addContent = await prisma.verseLanguage.create({
                    data: {
                        language: {
                            connect: {
                                code: langCode,
                            }
                        },
                        verse: {
                            connect: {
                                chapter_id_order_number: {
                                    chapter_id: chapterRecord.id,
                                    order_number: verseIndex
                                }
                            }
                        },
                        content: verse!,
                    }
                })
            });

            await Promise.all(addVerses);

            nextChapterLink = await page.$("span[class=chapread] + a[class=chap]");
            
            console.log("Book / Chapter")
            console.log(bookIndex + "/" + chapterIndex)

            if(nextChapterLink) {
                await nextChapterLink.click();
                await page.waitForNavigation({ waitUntil: "networkidle2"});
                ++chapterIndex;
            }
        } while (nextChapterLink);
    }
}

collectVariant(process.argv[2], process.argv[3]).finally(() => browser.close());

