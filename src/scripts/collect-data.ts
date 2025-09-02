import { Book } from "@prisma/client";
import "dotenv/config";
import puppeteer from "puppeteer";
import { getNormalizedName } from "../utils/getNormalizedName.ts";
import { getSlug } from "../utils/getSlug.ts";

const baseUrl = process.env.DATA_URL;
const browser = await puppeteer.launch();
const page = await browser.newPage();

async function collectBooks() {
    await page.goto(baseUrl + "/bibles/kj/index.htm", { waitUntil: "networkidle2", })

    const bookNames = await page.$$eval("ul[class] > li > a", (elements) => elements.map(el =>  el.innerText))
    const booksData: Partial<Book>[] = bookNames.map((book) => ({ original_name: getNormalizedName(book), slug: getSlug(book)}))

    //TODO: ADD DB RECORDING
}

async function collectLanguages() {
    
}
