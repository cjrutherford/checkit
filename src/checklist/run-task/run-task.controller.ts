import { Controller, Param, Get, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { RunTaskService } from './run-task.service';
import { RunTask } from '../../database/entities';
import UpdateRunTaskDto from '../dto/update-run-task.dto';
import { AuthGuard } from '../../authentication/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('run-task')
export class RunTaskController {
    constructor(private readonly runTaskService: RunTaskService) {}

    @Get(':checklistRunId')
    async findAll(@Param('checklistRunId') checklistRunId: string): Promise<RunTask[]> {
        return await this.runTaskService.findAll(checklistRunId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<RunTask> {
        return await this.runTaskService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTask: UpdateRunTaskDto): Promise<RunTask> {
        return await this.runTaskService.update(id, updateTask);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.runTaskService.remove(id);
    }
}
