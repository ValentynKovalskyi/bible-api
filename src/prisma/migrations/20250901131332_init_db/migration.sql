-- CreateTable
CREATE TABLE "public"."Book" (
    "id" SERIAL NOT NULL,
    "original_title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Chapter" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Verse" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Language" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "public"."VerseLanguage" (
    "verse_id" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "VerseLanguage_pkey" PRIMARY KEY ("verse_id","language_code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "public"."Book"("slug");

-- AddForeignKey
ALTER TABLE "public"."Chapter" ADD CONSTRAINT "Chapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Verse" ADD CONSTRAINT "Verse_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "public"."Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VerseLanguage" ADD CONSTRAINT "VerseLanguage_verse_id_fkey" FOREIGN KEY ("verse_id") REFERENCES "public"."Verse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VerseLanguage" ADD CONSTRAINT "VerseLanguage_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "public"."Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
