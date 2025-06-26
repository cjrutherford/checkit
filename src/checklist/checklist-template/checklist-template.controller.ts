/**
 * Controller for checklist template endpoints.
 * Handles creation, retrieval, update, and deletion of checklist templates for users.
 * Requires authentication.
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChecklistTemplateService } from './checklist-template.service';
import { CreateChecklistTemplateDto } from '../dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from '../dto/update-checklist-template.dto';
import User, { UserType } from '../../authentication/user.decorator';
import { AuthGuard } from '../../authentication/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('checklist-template')
export class ChecklistTemplateController {
  /**
   * Injects the ChecklistTemplateService for template logic.
   */
  constructor(private readonly checklistTemplateService: ChecklistTemplateService) {}

  /**
   * Creates a new checklist template for the authenticated user.
   * @param user The authenticated user
   * @param createChecklistTemplateDto The template data
   * @returns The created checklist template
   */
  @Post()
  create(@User() user: UserType, @Body() createChecklistTemplateDto: CreateChecklistTemplateDto) {
    return this.checklistTemplateService.create(createChecklistTemplateDto, user.userId);
  }

  /**
   * Gets all checklist templates for the authenticated user.
   * @param user The authenticated user
   * @returns Array of checklist templates
   */
  @Get()
  findAll(@User() user: UserType) {
    return this.checklistTemplateService.findAll(user.userId);
  }

  /**
   * Gets a checklist template by its ID.
   * @param id The template ID
   * @returns The checklist template
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistTemplateService.findOne(id);
  }

  /**
   * Updates a checklist template by its ID.
   * @param id The template ID
   * @param updateChecklistTemplateDto The update data
   * @returns The updated checklist template
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistTemplateDto: UpdateChecklistTemplateDto) {
    return this.checklistTemplateService.update(id, updateChecklistTemplateDto);
  }

  /**
   * Deletes a checklist template by its ID.
   * @param id The template ID
   * @returns The result of the deletion
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistTemplateService.remove(id);
  }
}
