import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TicketController } from "../controllers/ticket.controller";
import { TicketService } from "../services/ticket.service";


@Module({
  controllers: [TicketController],
  providers: [TicketService, PrismaService]
})
export class TicketModule{}