-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignToId_fkey" FOREIGN KEY ("assignToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketLog" ADD CONSTRAINT "TicketLog_editedBy_fkey" FOREIGN KEY ("editedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
