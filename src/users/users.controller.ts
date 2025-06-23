import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { CreateUserProfileDto, UserEntity } from '../database/entities';
import User from '../authentication/user.decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    
    @Get()
    async getUserProfile(@User() user: UserEntity) {
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.getUserProfile(user.id);
    }

    @Post()
    async createUserProfile(@User() user: UserEntity, @Body() profileData: CreateUserProfileDto) {
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.createUserProfile(user.id, profileData);
    }


    @Put('')
    async updateUserProfile(@User() user: UserEntity, @Body() profileData: CreateUserProfileDto) {
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.updateUserProfile(user.id, profileData);
    }

    @Delete()
    async deleteUserProfile(@User() user: UserEntity) {
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }
        return await this.usersService.deleteUserProfile(user.id);
    }
}
