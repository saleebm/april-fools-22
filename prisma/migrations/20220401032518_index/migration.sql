/*
  Warnings:

  - Added the required column `index` to the `CatFact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatFact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index" INTEGER NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_CatFact" ("content", "id") SELECT "content", "id" FROM "CatFact";
DROP TABLE "CatFact";
ALTER TABLE "new_CatFact" RENAME TO "CatFact";
CREATE UNIQUE INDEX "CatFact_index_key" ON "CatFact"("index");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
