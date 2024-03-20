import {
  Body,
  Post,
  Controller,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import {
  AssignTicketDto,
  ChangeTicketProgressDto,
  CreateTicketDto,
  UpdateTicketDto,
} from '../models/ticket.model';

@Controller('api/v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async postUser(@Body() postData: CreateTicketDto): Promise<any> {
    try {
      await this.ticketService.createTicket(postData);

      return {
        statusCode: 201,
        message: 'Success',
      };
    } catch (e) {
      return {
        statusCode: 400,
        message: e.message,
      };
    }
  }

  @Get()
  async getAllUser(): Promise<any> {
    return {
      statusCode: 200,
      message: 'Success',
      data: await this.ticketService.getAllTicket(),
    };
  }

  @Get(':id')
  async getTicketDetail(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      const result = await this.ticketService.getTicketDetail(id);
      return {
        statusCode: 200,
        message: 'Success',
        data: result,
      };
    } catch (e) {
        return {
            statusCode: 400,
            message: e.message
          };
    }
  }

  @Put(':id')
  async updateTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body() postData: UpdateTicketDto,
  ): Promise<any> {
    try {
      await this.ticketService.updateTicket(id, postData);
      return {
        statusCode: 200,
        message: 'Success',
      };
    } catch (e) {
      return {
        statusCode: 400,
        message: e.message,
      };
    }
  }

  @Post('/assign')
  async assignTicket(@Body() postData: AssignTicketDto): Promise<any> {

    try{
        await this.ticketService.assignTicket(postData);

        return {
          statusCode: 200,
          message: 'Success',
        };
    }catch(e){
        return{
            statusCode: 400,
            message: e.message
        }
    }
    
  }

  @Post('/change-progress')
  async changeTicketProgress(
    @Body() postData: ChangeTicketProgressDto,
  ): Promise<any> {
    try{
        await this.ticketService.changeTicketProgress(postData);

        return {
          statusCode: 200,
          message: 'Success',
        };
    }catch(e){
        return{
            statusCode: 400,
            message: e.message
        }
    }

  }

  @Get('/task-summary/:id')
  async getTaskSummary(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return {
      statusCode: 200,
      message: 'Success',
      data: await this.ticketService.getTaskSummary(id),
    };
  }
}
