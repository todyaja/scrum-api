import { Prisma } from "@prisma/client"
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class Ticket implements Prisma.TicketCreateInput {
    description: string
    title: string
    ticketLogs?: Prisma.TicketLogCreateNestedManyWithoutTicketInput
    assignedUser: Prisma.UserCreateNestedOneWithoutTicketsInput
    ticketStatus: Prisma.TicketStatusCreateNestedOneWithoutTicketInput
    assignToId: number
    point: number=0
    status: Prisma.TicketStatusCreateNestedOneWithoutTicketInput
}

export class TicketLog implements Prisma.TicketLogCreateInput {
    ticket: Prisma.TicketCreateNestedOneWithoutTicketLogsInput
    editedUser: Prisma.UserCreateNestedOneWithoutTicketLogsInput
    editedBy: number
    title: string
    date: string | Date
    ticketId: number
}

export class CreateTicketDto {
    @IsOptional()
    @IsInt()
    assignToId: number
    @IsInt()
    point: number
    @IsNotEmpty()
    @IsString()
    title: string
    @IsOptional()
    @IsString()
    description: string
    @IsInt()
    createdBy: number
}

export class TicketStatus {
    id: number
    description: string
}

export class TicketDetail{
    assignedProfileUrl: string | null
    assignedUsername: string | null
    title: string
    description: string
}

export class TicketHistoryLog{
    date: string
    title: string
    user: string
}

export class TicketDetailWithHistory extends TicketDetail{
    histories: TicketLogHistory[]
}

export class TicketLogHistory{
    date: string
    title: string
    user: string
}

export class UpdateTicketDto{
    @IsOptional()
    @IsString()
    title: string | null
    @IsOptional()
    @IsString()
    description: string | null
    @IsNumber()
    point: number | null
    @IsNumber()
    editedBy: number
}

export class AssignTicketDto{
    @IsNumber()
    ticketId: number
    @IsNumber()
    assignTo: number
    @IsNumber()
    editedBy: number
}
export class ChangeTicketProgressDto{
    @IsNumber()
    ticketId: number
    @IsNumber()
    statusId: number
    @IsNumber()
    editedBy: number
}

export class UserTask{
    numberOfTask: string
    progressDescription: string
    point: string
}



