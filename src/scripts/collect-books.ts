import "dotenv/config";
import puppeteer from "puppeteer";
import { getNormalizedName } from "../utils/getNormalizedName.js";
import { getSlug } from "../utils/getSlug.js";
import prisma from "../prisma/client.js";

const baseUrl = process.env.DATA_URL;
const browser = await puppeteer.launch();
const page = await browser.newPage();

async function collectBooks() {
    await page.goto(baseUrl + "/bibles/kj/index.htm", { waitUntil: "networkidle2", })

    const bookNames = await page.$$eval("ul[class] > li > a", (elements) => elements.map(el =>  el.innerText))
    const booksData = bookNames.map((book) => ({ original_title: getNormalizedName(book), slug: getSlug(book)}))

    const dbRecords = await prisma.book.createMany({
        data: booksData
    })
}

collectBooks().finally(() => browser.close());


