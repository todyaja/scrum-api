import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { TicketModule } from './modules/ticket.module';

@Module({
  imports: [UserModule, TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}