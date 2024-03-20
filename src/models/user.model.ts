import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class User implements Prisma.UserCreateInput{
    id?: number
    name: string
    email: string
    profilePictureUrl: string
}

export class UserPerformance{
    completedTask: number
    unCompletedTask: number
    totalTask: number
    completedTaskPercentage: string
    completedPoint: number
    unCompletedPoint: number
    totalPoint: number
    completedPointPercentage: string
}

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string
    profilePictureUrl: string
}


