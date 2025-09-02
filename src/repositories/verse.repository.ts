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
}