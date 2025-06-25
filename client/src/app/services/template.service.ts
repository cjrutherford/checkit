import { Injectable } from '@angular/core';

export interface Template {
  name: string;
  description: string;
  tasks: string[];
  order: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [
    { name: 'Checklist 1', description: 'Item 1', tasks: ['Task 1', 'Task 2'], order: true },
    { name: 'Checklist 2', description: 'Item 2', tasks: ['Task 3', 'Task 4'], order: false },
    { name: "Gnome Profit", description: "A simple guide to economics", tasks: ["Get Underwear", "???", "Profit"], order: true },
  ];

  getTemplates(): Template[] {
    return [...this.templates];
  }

  addTemplate(template: Template): void {
    this.templates.push(template);
  }

  updateTemplate(index: number, template: Template): void {
    this.templates[index] = template;
  }

  deleteTemplate(index: number): void {
    this.templates.splice(index, 1);
  }
}
