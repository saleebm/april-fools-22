-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatFactMessageStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 0,
    "numberSent" INTEGER NOT NULL,
    "totalFacts" INTEGER NOT NULL,
    "lastSent" DATETIME
);
INSERT INTO "new_CatFactMessageStats" ("id", "lastSent", "numberSent", "totalFacts") SELECT "id", "lastSent", "numberSent", "totalFacts" FROM "CatFactMessageStats";
DROP TABLE "CatFactMessageStats";
ALTER TABLE "new_CatFactMessageStats" RENAME TO "CatFactMessageStats";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
