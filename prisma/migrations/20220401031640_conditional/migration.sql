-- AlterTable
ALTER TABLE "CatFactMessageStats" ADD COLUMN "lastSent" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatFactMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "raw" TEXT
);
INSERT INTO "new_CatFactMessage" ("createdAt", "id", "message", "raw", "status") SELECT "createdAt", "id", "message", "raw", "status" FROM "CatFactMessage";
DROP TABLE "CatFactMessage";
ALTER TABLE "new_CatFactMessage" RENAME TO "CatFactMessage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
