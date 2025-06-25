import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TemplateTaskService } from './template-task.service';
import CreateTemplateTaskDto from '../dto/create-template-task.dto';
import { TemplateTask, UserEntity } from '../../database/entities';
import { AuthGuard } from '../../authentication/auth/auth.guard';
import User from '../../authentication/user.decorator';

@UseGuards(AuthGuard)
@Controller('template-task')
export class TemplateTaskController {
    constructor(private readonly templateTaskService: TemplateTaskService) {}
    
    @Post()
    async createTempateTask(@User() user: UserEntity, @Body() createTask: CreateTemplateTaskDto): Promise<TemplateTask> {
        return await this.templateTaskService.create(createTask);
    }

    @Get('/template/:templateId')
    async findAll(@Param('templateId') templateId: string): Promise<TemplateTask[]> {
        return await this.templateTaskService.findAll(templateId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TemplateTask> {
        return await this.templateTaskService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTask: CreateTemplateTaskDto): Promise<TemplateTask> {
        return await this.templateTaskService.update(id, updateTask);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.templateTaskService.remove(id);
    }
}
