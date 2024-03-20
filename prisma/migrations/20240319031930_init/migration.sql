/*
  Warnings:

  - You are about to drop the column `poin` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "poin",
ADD COLUMN     "point" INTEGER NOT NULL DEFAULT 0;
