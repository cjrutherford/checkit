/**
 * Service for managing checklist runs, including creation, retrieval, update, and deletion.
 */
import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistRun, ChecklistTemplate, RunTask } from '../../database/entities';
import { Repository } from 'typeorm';
import CreateChecklistRunDto from '../dto/create-checklist-run.dto';
import { ChecklistRunStatus } from 'src/database/entities/checklist-run.entity';

@Injectable()
export class ChecklistRunService {
    /**
     * Constructs the ChecklistRunService with injected repositories.
     */
    constructor(
        @Inject(getRepositoryToken(ChecklistRun)) private readonly checklistRunRepo: Repository<ChecklistRun>,
        @Inject(getRepositoryToken(ChecklistTemplate)) private readonly checklistTemplateRepo: Repository<ChecklistTemplate>,
        @Inject(getRepositoryToken(RunTask)) private readonly runTaskRepo: Repository<RunTask>
    ) { }

    /**
     * Creates a new checklist run for a user from a template.
     * @param createChecklistRunDto The checklist run data
     * @param userId The user's ID
     * @returns The created checklist run
     * @throws Error if template not found or checklist run creation fails
     */
    async create(createChecklistRunDto: CreateChecklistRunDto, userId: string): Promise<ChecklistRun> {
        const template = await this.checklistTemplateRepo.findOne({
            where: { id: createChecklistRunDto.checklistTemplateId },
            relations: ['tasks']
        });
        if (!template) {
            throw new Error(`Checklist template with id ${createChecklistRunDto.checklistTemplateId} not found`);
        }
        const {title, description } = createChecklistRunDto; // Destructure to avoid unused variable warning
        const checklistRun = this.checklistRunRepo.create({ title, description, status: ChecklistRunStatus.PENDING, userId, checklistTemplate: template });
        const checklist = await this.checklistRunRepo.save(checklistRun);
        if (template.tasks && template.tasks.length > 0) {
            const tasks = template.tasks.map(task => {
                const runTask = this.runTaskRepo.create({
                    description: task.description,
                    checklistRun: checklist
                });
                return this.runTaskRepo.save(runTask);
            });
            const newTaskItems = await Promise.all(tasks);
            checklist.tasks = newTaskItems;
        }
        const finalChecklist = await this.checklistRunRepo.findOne({
            where: { id: checklist.id },
            relations: ['tasks', 'checklistTemplate']
        });
        if (!finalChecklist) {
            throw new Error(`Checklist run with id ${checklist.id} not found after creation`);
        }
        return finalChecklist;
    }

    async findAll(userId: string): Promise<ChecklistRun[]> {
        return await this.checklistRunRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            relations: ['tasks', 'checklistTemplate']
        });
    }

    async findOne(id: string): Promise<ChecklistRun> {
        const run = await this.checklistRunRepo.findOne({
            where: { id },
            relations: ['tasks']
        });
        if (!run) {
            throw new Error(`Checklist run with id ${id} not found`);
        }
        return run;
    }

    async update(id: string, updateChecklistRunDto: any): Promise<ChecklistRun> {
        const run = await this.findOne(id);
        Object.assign(run, updateChecklistRunDto);
        return await this.checklistRunRepo.save(run);
    }

    async remove(id: string): Promise<void> {
        const run = await this.findOne(id);
        await this.checklistRunRepo.remove(run);
    }
}
