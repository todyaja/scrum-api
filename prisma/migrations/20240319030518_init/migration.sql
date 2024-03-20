-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignToId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_statusId_fkey";

-- DropForeignKey
ALTER TABLE "TicketLog" DROP CONSTRAINT "TicketLog_ticketId_fkey";
