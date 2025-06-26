import { Component, effect, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CheckListTemplateDto } from '../../types';
import { ChecklistTemplateService } from '../../services';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-create-run',
  imports: [],
  templateUrl: './create-run.html',
  styleUrl: './create-run.scss'
})
export class CreateRun implements OnInit {
  templates = signal<CheckListTemplateDto[]>([]);
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly templateService: ChecklistTemplateService, 
    private readonly runService: RunService
  ) {
    effect(() => {
      this.templateService.getTemplates()
      .subscribe({
        next: (templates: CheckListTemplateDto[]) => {
          this.templates.set(templates.map(t => {
            t.tasks = t.tasks.map(task => task.description)
            return t;
          }));
          },
          error: (error: any) => {
            console.error('Error loading templates:', error);
          },
        });
    });
  }

  ngOnInit(): void {
  }

  selectTemplate(template: CheckListTemplateDto): void {
    // Logic to handle template selection for creating a run
    console.log('Selected Template:', template);
    this.runService.addRunFromTemplate(template);
    this.close.emit();
  }

  onClose(): void{
    // Logic to close the create run modal or component
    console.log('Create Run Modal Closed');
    this.close.emit();
  }
}
