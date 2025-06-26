/**
 * Service for managing checklist templates, including creation, retrieval, update, and deletion.
 */
import { Inject, Injectable } from '@nestjs/common';
import { CreateChecklistTemplateDto } from '../dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from '../dto/update-checklist-template.dto';
import { Repository } from 'typeorm';
import { ChecklistTemplate, UserEntity } from '../../database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

@Injectable()
export class ChecklistTemplateService {
  /**
   * Constructs the ChecklistTemplateService with injected repositories.
   */
  constructor(
    @Inject(getRepositoryToken(ChecklistTemplate)) private readonly checklistTemplateRepo: Repository<ChecklistTemplate>,
    @Inject(getRepositoryToken(UserEntity)) private readonly userRepo: Repository<UserEntity>
  ) { }

  /**
   * Creates a new checklist template for a user.
   * @param createChecklistTemplateDto The template data
   * @param userId The user's ID
   * @returns The created checklist template
   * @throws Error if user not found
   */
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

  /**
   * Gets all checklist templates for a user.
   * @param userId The user's ID
   * @returns Array of checklist templates
   */
  async findAll(userId: string) {
    return await this.checklistTemplateRepo.find({
      where: { user: { id: userId } },
      relations: ['tasks', 'checklistRuns'],
    });
  }

  /**
   * Gets a checklist template by its ID.
   * @param id The template ID
   * @returns The checklist template
   * @throws Error if template not found
   */
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

  /**
   * Updates an existing checklist template.
   * @param id The template ID
   * @param updateChecklistTemplateDto The new template data
   * @returns The updated checklist template
   * @throws Error if template not found
   */
  async update(id: string, updateChecklistTemplateDto: UpdateChecklistTemplateDto) {
    const checklistTemplate = await this.checklistTemplateRepo.findOne({ where: {id}});
    if (!checklistTemplate) {
      throw new Error(`Checklist template with id ${id} not found`);
    }
    Object.assign(checklistTemplate, updateChecklistTemplateDto);
    return await this.checklistTemplateRepo.save(checklistTemplate);
  }

  /**
   * Deletes a checklist template.
   * @param id The template ID
   * @returns The deleted checklist template
   * @throws Error if template not found
   */
  async remove(id: string) {
    const checklistTemplate = await this.checklistTemplateRepo.findOne({ where: { id } });
    if (!checklistTemplate) {
      throw new Error(`Checklist template with id ${id} not found`);
    }
    return await this.checklistTemplateRepo.remove(checklistTemplate);
  }
}
