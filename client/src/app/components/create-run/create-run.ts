import { CheckListTemplateDto, RunDto } from '../../types';
import { Component, EventEmitter, Output, effect, signal } from '@angular/core';

import { ChecklistTemplateService } from '../../services';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-create-run',
  imports: [],
  templateUrl: './create-run.html',
  styleUrl: './create-run.scss'
})
export class CreateRun {
  templates = signal<CheckListTemplateDto[]>([]);
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() runCreated: EventEmitter<RunDto> = new EventEmitter<RunDto>();

  constructor(
    private readonly templateService: ChecklistTemplateService, 
    private readonly runService: RunService
  ) {
    effect(() => {
      this.templateService.getTemplates()
      .subscribe({
        next: (templates: CheckListTemplateDto[]) => {
          const newTemplates = templates.map(template => this.loadTemplateMapper(template));
          this.templates.set(newTemplates);
          },
          error: (error: any) => {
            console.error('Error loading templates:', error);
          },
        });
    });
  }

  private loadTemplateMapper(template: CheckListTemplateDto): CheckListTemplateDto {
    // This function can be used to map templates if needed
    const dto: CheckListTemplateDto = {
      title: template.title,
      description: template.description,
      tasks: template.tasks.map(task => ({...this.loadTaskMapper(task)})),
      id: template.id || '',
      user: undefined,
      order: false,
      checklistRuns: [] as RunDto[]
    };
    return {...dto};
  }

  private loadTaskMapper(task: any) {
    // This function can be used to map tasks if needed
    return {
      description: task.description,
      completed: task.completed ?? false,
      id: task.id ?? '',
    };
  }


  selectTemplate(template: CheckListTemplateDto): void {
    // Logic to handle template selection for creating a run
    this.runService.addRunFromTemplate(template).subscribe({
      next: (run) => {
        this.runCreated.emit(run);
        this.close.emit();
      },
      error: (error) => {
        this.close.emit();
      }
    });
  }

  onClose(): void{
    // Logic to close the create run modal or component
    this.close.emit();
  }
}
