import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  templates: CheckListTemplateDto[] = [];
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly templateService: ChecklistTemplateService, 
    private readonly runService: RunService
  ) {}

  ngOnInit(): void {
    this.templateService.getTemplates().pipe(takeUntil(this.destroy$)).subscribe({
      next: (templates: CheckListTemplateDto[]) => {
        this.templates = templates;
        },
        error: (error: any) => {
          console.error('Error loading templates:', error);
        },
      });
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
