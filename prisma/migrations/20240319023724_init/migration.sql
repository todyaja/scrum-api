/*
  Warnings:

  - Added the required column `assignToId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `TicketLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketId` to the `TicketLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TicketLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "assignToId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TicketLog" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ticketId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignToId_fkey" FOREIGN KEY ("assignToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketLog" ADD CONSTRAINT "TicketLog_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
