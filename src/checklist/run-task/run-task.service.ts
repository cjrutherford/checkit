import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RunTask } from '../../database/entities';
import { Repository } from 'typeorm';
import CreateRunTaskDto from '../dto/create-run-task.dto';
import UpdateRunTaskDto from '../dto/update-run-task.dto';

@Injectable()
export class RunTaskService {

    constructor(
        @Inject(getRepositoryToken(RunTask)) private readonly runTaskRepository: Repository<RunTask>
    ) {}

    async create(runTask: CreateRunTaskDto): Promise<RunTask> {
        return await this.runTaskRepository.save(runTask);
    }

    async findAll(checklistRunId: string): Promise<RunTask[]> {
        return await this.runTaskRepository.find({
            where: { checklistRun: { id: checklistRunId } },
        });
    }

    async findOne(id: string): Promise<RunTask> {
        const task = await this.runTaskRepository.findOne({ where: { id } });
        if (!task) {
            throw new Error(`RunTask with id ${id} not found`);
        }
        return task;
    }

    async update(id: string, runTask: UpdateRunTaskDto): Promise<RunTask> {
        await this.runTaskRepository.update(id, runTask);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.runTaskRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`RunTask with id ${id} not found`);
        }
    }
}
