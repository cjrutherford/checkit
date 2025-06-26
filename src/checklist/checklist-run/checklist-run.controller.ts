import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ChecklistRunService } from './checklist-run.service';
import User, { UserType } from '../../authentication/user.decorator';
import CreateChecklistRunDto from '../dto/create-checklist-run.dto';
import UpdateChecklistRunDto from '../dto/update-checklist-run.dto';
import { AuthGuard } from '../../authentication/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('checklist-run')
export class ChecklistRunController {
    constructor(private readonly checklistRunService: ChecklistRunService) {}

    @Post()
    async createChecklistRun(@User() user: UserType, @Body() createChecklistRunDto: CreateChecklistRunDto) {
        const newCheckList = await this.checklistRunService.create({...createChecklistRunDto, checklistTemplateId: createChecklistRunDto.checklistTemplateId}, user.userId);
        return newCheckList;
    }

    @Get()
    async getAllChecklistRuns(@User() user: UserType) {
        return this.checklistRunService.findAll(user.userId);
    }

    @Get(':id')
    async getChecklistRunById(@Param('id') id: string) {
        return this.checklistRunService.findOne(id);
    }

    @Patch(':id')
    async updateChecklistRun(@Param('id') id: string, @Body() updateChecklistRunDto: UpdateChecklistRunDto) {
        return this.checklistRunService.update(id, updateChecklistRunDto);
    }

    @Delete(':id')
    async deleteChecklistRun(@Param('id') id: string) {
        return this.checklistRunService.remove(id);
    }
}
