import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { CreateUserProfileDto } from '../database/entities';
import User, { UserType } from '../authentication/user.decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    
    @Get()
    async getUserProfile(@User() user: UserType) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.getUserProfile(user.userId);
    }

    @Post()
    async createUserProfile(@User() user: UserType, @Body() profileData: CreateUserProfileDto) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.createUserProfile(user.userId, profileData);
    }


    @Put('')
    async updateUserProfile(@User() user: UserType, @Body() profileData: CreateUserProfileDto) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.updateUserProfile(user.userId, profileData);
    }

    @Delete()
    async deleteUserProfile(@User() user: UserType) {
        if (!user?.userId) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.deleteUserProfile(user.userId);
    }
}
