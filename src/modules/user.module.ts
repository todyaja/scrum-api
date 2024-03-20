import { Module } from "@nestjs/common";
import { UserController } from '../controllers/user.controller';
import { UserService } from "../services/user.service";
import { PrismaService } from "src/prisma.service";


@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule{}