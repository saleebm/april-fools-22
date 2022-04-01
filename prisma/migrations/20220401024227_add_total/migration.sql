/*
  Warnings:

  - Added the required column `totalFacts` to the `CatFactMessageStats` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatFactMessageStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberSent" INTEGER NOT NULL,
    "totalFacts" INTEGER NOT NULL
);
INSERT INTO "new_CatFactMessageStats" ("id", "numberSent") SELECT "id", "numberSent" FROM "CatFactMessageStats";
DROP TABLE "CatFactMessageStats";
ALTER TABLE "new_CatFactMessageStats" RENAME TO "CatFactMessageStats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
