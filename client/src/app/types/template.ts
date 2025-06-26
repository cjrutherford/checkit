import { RunDto } from './run';

export class CheckListTemplateDto {
    id: string;
    user: any; // UserEntity
    title: string;
    description?: string; // Optional field
    order: boolean;
    tasks: any[]; // Array of TemplateTaskDto
    checklistRuns: RunDto[]; // Array of ChecklistRunDto
}

export class CreateChecklistTemplateDto {
    title: string;
    description?: string; 
    order: boolean;
    tasks: string[];
}

export class TemplateTaskDto {
    id: string;
    checklistTemplate: CheckListTemplateDto; // Reference to CheckListTemplateDto
    description: string;
    order: number; // Order of the task in the template
}

export class CreateTemplateTaskDto {
    checklistTemplateId: string; // Reference id of CheckListTemplateDto
    description?: string; // Optional field for task description
    order: number; // Order of the task in the template
}