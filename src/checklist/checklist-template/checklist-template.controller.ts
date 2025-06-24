import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChecklistTemplateService } from './checklist-template.service';
import { CreateChecklistTemplateDto } from '../dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from '../dto/update-checklist-template.dto';
import User from '../../authentication/user.decorator';
import { UserEntity } from '../../database/entities';
import { AuthGuard } from '../../authentication/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('checklist-template')
export class ChecklistTemplateController {
  constructor(private readonly checklistTemplateService: ChecklistTemplateService) {}

  @Post()
  create(@Body() createChecklistTemplateDto: CreateChecklistTemplateDto) {
    return this.checklistTemplateService.create(createChecklistTemplateDto);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.checklistTemplateService.findAll(user.id);
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
