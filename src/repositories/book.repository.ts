import prisma from "../prisma/client.js";

export class BookRepository {
    static async getAvailableSlugs() {
        const result = await prisma.book.findMany({
            select: {
                slug: true,
            }
        });
        return result.map((obj) => obj.slug);
    }

    static async getCount() {
        return await prisma.book.count();
    }

    static async getById(id: number) {
        const result = await prisma.book.findUnique({
            where: {
                id
            },
        })
        return result;
    }
}