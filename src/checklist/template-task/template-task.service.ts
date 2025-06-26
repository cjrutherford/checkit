import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistTemplate, TemplateTask } from '../../database/entities';
import { Repository } from 'typeorm';
import CreateTemplateTaskDto from '../dto/create-template-task.dto';
import UpdateTemplateTaskDto from '../dto/update-template-task.dto';

@Injectable()
export class TemplateTaskService {
    constructor(
        @Inject(getRepositoryToken(TemplateTask)) private readonly templateTaskRepository: Repository<TemplateTask>,
        @Inject(getRepositoryToken(ChecklistTemplate)) private readonly checklistTemplateRepository: Repository<ChecklistTemplate>
    ) {}

    async create(templateTask: CreateTemplateTaskDto): Promise<TemplateTask> {
        const checklistTemplate = await this.checklistTemplateRepository.findOne({ where: { id: templateTask.checklistTemplateId } });
        if (!checklistTemplate) {
            throw new Error(`ChecklistTemplate with id ${templateTask.checklistTemplateId} not found`);
        }
        return await this.templateTaskRepository.save({ ...templateTask, checklistTemplate });
    }

    async findAll(templateId: string): Promise<TemplateTask[]> {
        return await this.templateTaskRepository.find({ where: { checklistTemplate: { id: templateId } }, order: { order: 'ASC' } });
    }

    async findOne(id: string): Promise<TemplateTask> {
        const task = await this.templateTaskRepository.findOne({ where: { id } });
        if (!task) {
            throw new Error(`TemplateTask with id ${id} not found`);
        }
        return task;
    }

    async update(id: string, templateTask: UpdateTemplateTaskDto): Promise<TemplateTask> {
        await this.templateTaskRepository.update(id, templateTask);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.templateTaskRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`TemplateTask with id ${id} not found`);
        }
    }
}
