import prisma from "../prisma/client.ts";

export class VerseRepository {
    static async getVerse(params: { slug: string, chapter: string, verse: string, lang: string }) {
        const result = await prisma.verseLanguage.findFirst({
            where: {
                verse: {
                    order_number: +params.verse,
                    chapter: {
                        order_number: + params.chapter,
                        book: {
                            slug: params.slug,
                        }
                    }
                },
                language: {
                    code: params.lang,
                }
            },
            select: {
                content: true,
            }
        })
        return result;
    }

    static async getRandomVerse(lang: string) {
        const versesIds = await prisma.verse.findMany({
            select: {
                id: true,
            }
        })
        const randId = Math.floor(Math.random() * versesIds.length);
        const result = await prisma.verseLanguage.findUnique({
            where: {
                verse_id_language_code: {
                    verse_id: versesIds[randId].id,
                    language_code: lang
                }
            },
            include: {
                verse: {
                    include: {
                        chapter: {
                            include: {
                                book: true,
                            }
                        }
                    }
                }
            }
        });
        
        return {
            book: result?.verse.chapter.book.slug,
            chapter: result?.verse.chapter.order_number,
            verseNumber: result?.verse.order_number,
            verse: result?.content
        };
    }
}