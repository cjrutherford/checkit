import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistRun } from '../../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ChecklistRunService {
    constructor(
        @Inject(getRepositoryToken(ChecklistRun)) private readonly checklistRunRepo: Repository<ChecklistRun>
    ) { }

    async create(createChecklistRunDto: any): Promise<ChecklistRun> {
        const checklistRun = this.checklistRunRepo.create(createChecklistRunDto);
        return (await this.checklistRunRepo.save(checklistRun))[0];
    }

    async findAll(userId: string): Promise<ChecklistRun[]> {
        return await this.checklistRunRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' }
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
