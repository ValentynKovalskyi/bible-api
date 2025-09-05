import prisma from "../prisma/client.js";

export class LanguageRepository {
    static async getAvailableLanguages() {
        const result = await prisma.language.findMany();
        return result;
    }
}