import { PrismaService } from 'src/prisma.service';
import {
  AssignTicketDto,
  ChangeTicketProgressDto,
  TicketDetail,
  TicketDetailWithHistory,
  CreateTicketDto,
  UpdateTicketDto,
  UserTask,
} from '../models/ticket.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async createTicket(data: CreateTicketDto): Promise<void> {
    //Check is there a user that creates the ticket by id
    await this.validateUser(data.createdBy)

    //Check is there a user that is assigned to the ticket by id if assignToId is not null
    if (data.assignToId != null) {
      await this.validateUser(data.assignToId)
    }

    const ticket = await this.prisma.ticket.create({
      data: {
        title: data.title,
        assignToId: data.assignToId,
        point: data.point,
        description: data.description,
        statusId: 0,
      },
    });

    await this.prisma.ticketLog.create({
      data: {
        ticketId: ticket.id,
        title: 'Ticket Created!',
        date: new Date(),
        editedBy: data.createdBy,
      },
    });
  }

  async getAllTicket(): Promise<TicketDetail[]> {
    const data = await this.prisma.ticket.findMany({
      include: {
        assignedUser: true,
      },
    });

    const returnData: TicketDetail[] = data.map((x) => {
      return {
        assignedProfileUrl:
          x.assignedUser == null ? null : x.assignedUser.profilePictureUrl,
        assignedUsername: x.assignedUser == null ? null : x.assignedUser.name,
        title: x.title,
        description: x.description,
      };
    });

    return returnData;
  }

  async getTicketDetail(ticketId: number): Promise<TicketDetailWithHistory> {
    const data = await this.prisma.ticket.findUnique({
      where: {
        id: Number(ticketId),
      },
      include: {
        ticketLogs: {
          include: {
            editedUser: true,
          },
        },
        assignedUser: true,
      },
    });

    //Validate ticket exists or not
      if (data == null) {
        throw Error('ticket with the id ' + ticketId.toString() + ' not found');
      }

    const returnData: TicketDetailWithHistory = {
      assignedProfileUrl:
        data.assignedUser == null ? null : data.assignedUser.profilePictureUrl,
      assignedUsername:
        data.assignedUser == null ? null : data.assignedUser.name,
      title: data.title,
      description: data.description,
      histories: data.ticketLogs.map((x) => {
        return {
          date: x.date.toDateString(),
          title: x.title,
          user: x.editedUser.name,
        };
      }),
    };

    return returnData;
  }

  async updateTicket(id: number, data: UpdateTicketDto): Promise<void> {
    //Validate ticket exists or not
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: Number(id) },
    });
    if (ticket == null) {
      throw Error('ticket with the id ' + id.toString() + ' not found');
    }
    //Validate edited by
    await this.validateUser(data.editedBy)
    // Edit the main ticket
    // Construct update data object dynamically
    const updateData: any = {};
    const thingsChanged: string[] = [];
    // Add fields to updateData only if they are not null in data
    if (data.title != null) {
      updateData.title = data.title;
      thingsChanged.push('Title');
    }
    if (data.description != null) {
      updateData.description = data.description;
      thingsChanged.push('Description');
    }
    if (data.point != null) {
      updateData.point = data.point;
      thingsChanged.push('Point');
    }

    // Update the ticket
    await this.prisma.ticket.update({
      where: { id: Number(id) },
      data: updateData,
    });

    const title =
      thingsChanged.join(', ') +
      (thingsChanged.length > 1 ? ' have' : ' has') +
      ' been changed';

    //Insert to Log
    await this.prisma.ticketLog.create({
      data: {
        ticketId: Number(id),
        title: title,
        date: new Date(),
        editedBy: data.editedBy,
      },
    });
  }

  async assignTicket(data: AssignTicketDto): Promise<void> {

    //validate ticket exists or not

    const ticket = await this.prisma.ticket.findUnique({
        where:{id: Number(data.ticketId)}
    })

    if(ticket == null){
        throw Error("ticket with the id "+ data.ticketId.toString() +" not found")
    }

    //validate assignTo and editedBy
    await this.validateUser(data.assignTo)
    await this.validateUser(data.editedBy)

    await this.prisma.ticket.update({
      where: {
        id: Number(data.ticketId),
      },
      data: {
        assignToId: data.assignTo,
      },
    });

    //Get Assignee Name
    const assignee = await this.prisma.user.findUnique({
      where: {
        id: Number(data.assignTo),
      },
    });

    //Create Log
    await this.prisma.ticketLog.create({
      data: {
        ticketId: Number(data.ticketId),
        title: 'Change Assignee to ' + assignee.name,
        date: new Date(),
        editedBy: data.editedBy,
      },
    });
  }

  async changeTicketProgress(data: ChangeTicketProgressDto): Promise<void> {

    //validate ticket exists or not

    const ticket = await this.prisma.ticket.findUnique({
        where:{id: Number(data.ticketId)}
    })

    if(ticket == null){
        throw Error("ticket with the id "+ data.ticketId.toString() +" not found")
    }

    //validate status exists or not

    const status = await this.prisma.ticketStatus.findUnique({
        where:{id: Number(data.statusId)}
    })


    if(status == null){
        throw Error("ticket status with the id "+ data.statusId.toString() +" is not valid")
    }

    //validate editedBy
    await this.validateUser(data.editedBy)

    await this.prisma.ticket.update({
      where: {
        id: Number(data.ticketId),
      },
      data: {
        statusId: data.statusId,
      },
    });

    //Get Assignee Name
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(data.editedBy),
      },
    });

    //Get Status Desc
    const ticketStatus = await this.prisma.ticketStatus.findUnique({
      where: {
        id: Number(data.statusId),
      },
    });

    //Create Log
    await this.prisma.ticketLog.create({
      data: {
        ticketId: Number(data.ticketId),
        title: user.name + ' Change Status to ' + ticketStatus.description,
        date: new Date(),
        editedBy: data.editedBy,
      },
    });
  }

  async getTaskSummary(userId: number): Promise<UserTask[]> {
    const data = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        tickets: {
          include: {
            status: true,
          },
        },
      },
    });

    const ticketStatus = await this.prisma.ticketStatus.findMany();

    const TaskSummary: UserTask[] = [];

    for (let i = 0; i <= 3; i++) {
      const currentTask = data.tickets.filter((x) => x.statusId == i);
      const totalPoints = currentTask.reduce(
        (sum, task) => sum + task.point,
        0,
      );
      TaskSummary.push({
        numberOfTask: currentTask.length.toString() + ' Task(s)',
        progressDescription: ticketStatus.find((x) => x.id == i).description,
        point: totalPoints.toString() + ' Point(s)',
      });
    }
    return TaskSummary;
  }

  async validateUser(userId: number){
    //Check is there a user that creates the ticket by id
    const creator = await this.prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (creator == null) {
        throw Error(
          'user with the id ' + userId.toString() + ' not found',
        );
      }
    }
}
