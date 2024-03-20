/*
  Warnings:

  - You are about to drop the column `editedBy` on the `TicketStatus` table. All the data in the column will be lost.
  - Added the required column `editedBy` to the `TicketLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketLog" ADD COLUMN     "editedBy" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TicketStatus" DROP COLUMN "editedBy";
