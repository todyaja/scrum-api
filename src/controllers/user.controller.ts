import { Body, Get, Param, Post, Delete, Put, Controller, UseInterceptors, UploadedFile, ParseIntPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto, User } from "../models/user.model";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('api/v1/user')
export class UserController{
    constructor(private readonly userService : UserService){}

    @Get()
    async getAllUser():Promise<any>{
        return{
            statusCode: 200,
            message: "Success",
            data: await this.userService.getAllUser()
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('profilePicture'))
    async postUser(@UploadedFile() File : Express.Multer.File = null, @Body() postData: CreateUserDto):Promise<any>{
        if(!File){
            return {
                statusCode: 422,
                message: 'Profile picture is empty',
            };
        }
        const userData:CreateUserDto = {
            name: postData.name,
            email: postData.email,
            profilePictureUrl: File.originalname,
        }
        return{
            statusCode: 200,
            message: "Success",
            data: await this.userService.createUser(userData)
        }
    }

    @Get(':id')
    async getUser(@Param('id') id:number):Promise<User | null>{
        return this.userService.getUser(id)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:number):Promise<User>{
        return this.userService.deleteUser(id)
    }

    @Put(':id')
    async updateUser(@Param('id') id:number, @Body() postData: User):Promise<User>{
        return this.userService.updateUser(id, postData)
    }

    @Get('/user-performance/:id')
    async getUserPerformance(@Param('id', ParseIntPipe) id: number):Promise<any>{
        try{
            const result = await this.userService.getUserPerformance(id);

            return{
                statusCode: 200,
                message: "Success",
                data: result
            }
        }catch(e){
            return {
                statusCode: 400,
                message: e.message
            }
        }

        
    }

}