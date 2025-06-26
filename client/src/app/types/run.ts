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
    completedAt?: Date | null; // Timestamp of when the run was completed, if applicable
}

export interface UpdateRunDto{
    id: string;
    title?: string; // Optional field to update the title of the run
    description?: string; // Optional field to update the description of the run
    status?: RunStatus; // Optional field to update the status of the run
    completedAt?: Date | null; // Optional field to update the completion timestamp of the run
}

export interface CreateRunDto {
    checkLisTemplateId: string; // Reference id of CheckListTemplateDto
    title: string; // Title of the run
    description?: string; // Optional field for run description
    status: RunStatus; // Status of the run (e.g., 'pending', 'in_progress', 'completed', 'cancelled')
}

export interface RunTaskDto {
    id: string;
    checklistRun: string; // Reference id of RunDto
    description?: string; // Optional field for task description
    completed: boolean; // Status of the task (e.g., 'pending', 'completed')
    order: number; // Order of the task in the run
    completedAt?: Date; // Timestamp of when the task was completed, if applicable
}

export interface CreateRunTaskDto {
    checklistRunId: string;
    description: string; // Description of the task
}

export interface UpdateRunTaskDto {
    completed?: boolean; // Optional field to update the completion status of the task
}
