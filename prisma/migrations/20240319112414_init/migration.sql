/*
  Warnings:

  - Added the required column `editedBy` to the `TicketStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketStatus" ADD COLUMN     "editedBy" INTEGER NOT NULL;
