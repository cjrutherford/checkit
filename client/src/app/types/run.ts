import { CheckListTemplateDto } from "./template";

export declare type RunStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export class RunDto {
    id: string;
    user: any; // UserEntity
    checklistTemplate: CheckListTemplateDto; // CheckListTemplateDto
    title: string;
    description?: string; // Optional field for run description
    tasks: RunTaskDto[]; // Array of TaskRunDto
    status: RunStatus; // Status of the run (e.g., 'in-progress', 'completed')
    createdAt: Date; // Timestamp of when the run was created
    updatedAt: Date; // Timestamp of when the run was last updated
}

export class CreateRunDto {
    user: string; // Reference id of UserEntity
    tempalte: string; // Reference id of CheckListTemplateDto
    title: string; // Title of the run
    description?: string; // Optional field for run description
    status: RunStatus; // Status of the run (e.g., 'pending', 'in_progress', 'completed', 'cancelled')
}

export class RunTaskDto {
    id: string;
    checklistRun: string; // Reference id of RunDto
    description?: string; // Optional field for task description
    status: boolean; // Status of the task (e.g., 'pending', 'completed')
    order: number; // Order of the task in the run
    completedAt?: Date; // Timestamp of when the task was completed, if applicable
}

export class CreateRunTaskDto {
    checklistRunId: string;
    description: string; // Description of the task
}
