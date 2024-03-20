-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignToId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "assignToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignToId_fkey" FOREIGN KEY ("assignToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
