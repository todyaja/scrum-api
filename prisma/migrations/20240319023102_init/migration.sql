-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "poin" INTEGER NOT NULL DEFAULT 0,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketStatus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TicketStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketLog" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "TicketLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TicketStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
