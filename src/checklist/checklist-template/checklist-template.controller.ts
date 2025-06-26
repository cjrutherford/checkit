import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChecklistTemplateService } from './checklist-template.service';
import { CreateChecklistTemplateDto } from '../dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from '../dto/update-checklist-template.dto';
import User, { UserType } from '../../authentication/user.decorator';
import { AuthGuard } from '../../authentication/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('checklist-template')
export class ChecklistTemplateController {
  constructor(private readonly checklistTemplateService: ChecklistTemplateService) {}

  @Post()
  create(@User() user: UserType, @Body() createChecklistTemplateDto: CreateChecklistTemplateDto) {
    return this.checklistTemplateService.create(createChecklistTemplateDto, user.userId);
  }

  @Get()
  findAll(@User() user: UserType) {
    return this.checklistTemplateService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistTemplateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistTemplateDto: UpdateChecklistTemplateDto) {
    return this.checklistTemplateService.update(id, updateChecklistTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistTemplateService.remove(id);
  }
}
