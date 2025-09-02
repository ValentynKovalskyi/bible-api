/*
  Warnings:

  - A unique constraint covering the columns `[book_id,order_number]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_id,order_number]` on the table `Verse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chapter_book_id_order_number_key" ON "public"."Chapter"("book_id", "order_number");

-- CreateIndex
CREATE UNIQUE INDEX "Verse_chapter_id_order_number_key" ON "public"."Verse"("chapter_id", "order_number");
