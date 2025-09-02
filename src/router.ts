import { Router } from "express";
import { BookRepository } from "./repositories/book.repository.ts";
import { VerseRepository } from "./repositories/verse.repository.ts";
import { LanguageRepository } from "./repositories/language.repository.ts";

const router = Router();

router.get("/books/count", async (req, res) => {
    const booksCount = await BookRepository.getCount();
    res.send({ count: booksCount });
})

router.get("/books/slugs", async (req, res) => {
    const slugList = await BookRepository.getAvailableSlugs();
    res.send({ slugs: slugList });
})

router.get("/books/:id", async (req, res) => {
    const book = await BookRepository.getById(+req.params.id);
    res.send({ book: book });
});

router.get("/verses/random", async (req, res) => {
    const lang = req.query.lang?.toString() || "en";
    const verse = await VerseRepository.getRandomVerse(lang);
    res.send(verse);
});

router.get("/languages", async (req, res) => {
    const languages = await LanguageRepository.getAvailableLanguages();
    res.send({ languages });
})
router.get("/:slug/:chapter/:verse", async (req, res) => {
    const verseParams = {
        ...req.params,
        lang: req.query.lang?.toString() || "en",
    };
    const verse = await VerseRepository.getVerse(verseParams)
    res.send({ verse: verse?.content });
})

export default router;