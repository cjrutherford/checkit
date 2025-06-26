import { Inject, Injectable } from '@nestjs/common';
import { CreateChecklistTemplateDto } from '../dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from '../dto/update-checklist-template.dto';
import { Repository } from 'typeorm';
import { ChecklistTemplate, UserEntity } from '../../database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

@Injectable()
export class ChecklistTemplateService {
  constructor(
    @Inject(getRepositoryToken(ChecklistTemplate)) private readonly checklistTemplateRepo: Repository<ChecklistTemplate>,
    @Inject(getRepositoryToken(UserEntity)) private readonly userRepo: Repository<UserEntity>
  ) { }

  async create(createChecklistTemplateDto: CreateChecklistTemplateDto, userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    const checklistTemplate = this.checklistTemplateRepo.create({
      ...createChecklistTemplateDto, 
      user,
    });
    return await this.checklistTemplateRepo.save(checklistTemplate);
  }

  async findAll(userId: string) {
    return await this.checklistTemplateRepo.find({
      where: { user: { id: userId } },
      relations: ['tasks', 'checklistRuns'],
    });
  }

  async findOne(id: string) {
    const checklistTemplate = await this.checklistTemplateRepo.findOne({
      where: { id },
      relations: ['tasks', 'checklistRuns'],
    });

    if (!checklistTemplate) {
      throw new Error(`Checklist template with id ${id} not found`);
    }

    return checklistTemplate;
  }

  async update(id: string, updateChecklistTemplateDto: UpdateChecklistTemplateDto) {
    const checklistTemplate = await this.checklistTemplateRepo.findOne({ where: {id}});
    if (!checklistTemplate) {
      throw new Error(`Checklist template with id ${id} not found`);
    }
    Object.assign(checklistTemplate, updateChecklistTemplateDto);
    return await this.checklistTemplateRepo.save(checklistTemplate);
  }

  async remove(id: string) {
    const checklistTemplate = await this.checklistTemplateRepo.findOne({ where: { id } });
    if (!checklistTemplate) {
      throw new Error(`Checklist template with id ${id} not found`);
    }
    return await this.checklistTemplateRepo.remove(checklistTemplate);
  }
}
