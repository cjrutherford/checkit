/**
 * Controller for checklist run endpoints.
 * Handles creation, retrieval, update, and deletion of checklist runs for users.
 * Requires authentication.
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ChecklistRunService } from './checklist-run.service';
import User, { UserType } from '../../authentication/user.decorator';
import CreateChecklistRunDto from '../dto/create-checklist-run.dto';
import UpdateChecklistRunDto from '../dto/update-checklist-run.dto';
import { AuthGuard } from '../../authentication/auth/auth.guard';
import CreateAdhocChecklistRunDto from '../dto/create-adhoc-checklist-run.dto';

@UseGuards(AuthGuard)
@Controller('checklist-run')
export class ChecklistRunController {
    /**
     * Injects the ChecklistRunService for checklist run logic.
     */
    constructor(private readonly checklistRunService: ChecklistRunService) {}

    /**
     * Creates a new ad-hoc checklist run for the authenticated user.
     * @param user The authenticated user
     * @param createAdhocChecklistRunDto The ad-hoc checklist run data
     * @returns The created checklist run
     */
    @Post('ad-hoc')
    async createAdhocChecklistRun(@User() user: UserType, @Body() createAdhocChecklistRunDto: CreateAdhocChecklistRunDto) {
        return this.checklistRunService.createAdhoc(createAdhocChecklistRunDto, user.userId);
    }

    /**
     * Creates a new checklist run for the authenticated user.
     * @param user The authenticated user
     * @param createChecklistRunDto The checklist run data
     * @returns The created checklist run
     */
    @Post()
    async createChecklistRun(@User() user: UserType, @Body() createChecklistRunDto: CreateChecklistRunDto) {
        const newCheckList = await this.checklistRunService.create({...createChecklistRunDto, checklistTemplateId: createChecklistRunDto.checklistTemplateId}, user.userId);
        return newCheckList;
    }

    /**
     * Gets all checklist runs for the authenticated user.
     * @param user The authenticated user
     * @returns Array of checklist runs
     */
    @Get()
    async getAllChecklistRuns(@User() user: UserType) {
        return this.checklistRunService.findAll(user.userId);
    }

    /**
     * Gets a checklist run by its ID.
     * @param id The checklist run ID
     * @returns The checklist run
     */
    @Get(':id')
    async getChecklistRunById(@Param('id') id: string) {
        return this.checklistRunService.findOne(id);
    }

    /**
     * Updates a checklist run by its ID.
     * @param id The checklist run ID
     * @param updateChecklistRunDto The update data
     * @returns The updated checklist run
     */
    @Patch(':id')
    async updateChecklistRun(@Param('id') id: string, @Body() updateChecklistRunDto: UpdateChecklistRunDto) {
        return this.checklistRunService.update(id, updateChecklistRunDto);
    }

    /**
     * Deletes a checklist run by its ID.
     * @param id The checklist run ID
     * @returns The result of the deletion
     */
    @Delete(':id')
    async deleteChecklistRun(@Param('id') id: string) {
        return this.checklistRunService.remove(id);
    }
}
