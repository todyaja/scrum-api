import { PrismaService } from "src/prisma.service";
import { User, UserPerformance } from '../models/user.model';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(private prisma: PrismaService){}

    async getAllUser(): Promise<User[]>{
        return this.prisma.user.findMany()
    }

    async getUser(id:number): Promise<User | null>{
        return this.prisma.user.findUnique({where: {id:Number(id)}})
    }

    async createUser(data: User):Promise<User>{
        return this.prisma.user.create({data})
    }

    async updateUser(id:number, data:User):Promise<User>{
        return this.prisma.user.update({
            where: {id:Number(id)},
            data: {name: data.name, email:data.email, profilePictureUrl: data.profilePictureUrl}
        })
    }

    async deleteUser(id:number):Promise<User>{
        return this.prisma.user.delete({where:{id:Number(id)}})
    }

    async getUserPerformance(userId: number):Promise<UserPerformance>{
        const data = await this.prisma.user.findUnique({
            where: {id: Number(userId)},
            include: {
                tickets: {
                    include: {
                        ticketLogs: true
                    }
                }
            }
        })

        if(data == null){
            throw new Error("user with the id "+userId+" not found")
        }

        const twoWeeksPrior = new Date();
        twoWeeksPrior.setDate(twoWeeksPrior.getDate() - 14);
        const completedTask = data.tickets.filter( x => x.statusId == 3 && x.ticketLogs.find(x => x.date >= twoWeeksPrior))
        const unCompletedTask = data.tickets.filter( x => x.statusId != 3 && x.ticketLogs.find(x => x.date >= twoWeeksPrior))
        
        const completedPoint = completedTask.reduce((sum, task) => sum + task.point, 0);
        const unCompletedPoint = unCompletedTask.reduce((sum, task) => sum + task.point, 0);

        const userPerformance:UserPerformance = {
            completedTask: completedTask.length,
            unCompletedTask: unCompletedTask.length,
            totalTask: completedTask.length + unCompletedTask.length,
            completedTaskPercentage: (completedTask.length + unCompletedTask.length) == 0 ? "0%" :
            (completedTask.length/(completedTask.length + unCompletedTask.length)*100).toString()+"%",
            completedPoint: completedPoint,
            unCompletedPoint: unCompletedPoint,
            totalPoint: completedPoint + unCompletedPoint,
            completedPointPercentage: (completedPoint + unCompletedPoint) == 0 ? "0%" :
            (completedPoint/(completedPoint + unCompletedPoint)*100).toString()+"%"
        }

        return userPerformance

    }

}