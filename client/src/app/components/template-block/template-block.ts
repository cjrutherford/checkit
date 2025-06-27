import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckListTemplateDto } from '../../types';
import { Router } from '@angular/router';
import { RunService } from '../../services/run.service';

/**
 * TemplateBlock component: displays a checklist template block with edit/delete actions.
 * - Emits events for editing and deleting templates
 * - Handles template selection for duplication
 */
@Component({
  selector: 'app-template-block',
  imports: [],
  templateUrl: './template-block.html',
  styleUrl: './template-block.scss'
})
export class TemplateBlock {
  @Input() template: CheckListTemplateDto = {
    id: '', title: '', description: '', tasks: [], order: false,
    user: undefined,
    checklistRuns: []
  };
  @Output() onEdit = new EventEmitter<CheckListTemplateDto>();
  @Output() onDelete = new EventEmitter<CheckListTemplateDto>();

  constructor(private readonly runService: RunService, private readonly router: Router) {}

  editTemplate(template: CheckListTemplateDto): void {
    this.onEdit.emit(template);
  }

  deleteTemplate(template: CheckListTemplateDto): void {
    this.onDelete.emit(template);
  }

  useTemplate(template: any): void {
    // Deep clone the template to avoid mutation issues
    const templateCopy = JSON.parse(JSON.stringify(template));
    this.runService.addRunFromTemplate(templateCopy).subscribe({
      next: (run) => {
        console.log('Template used for new run:', run);
        this.router.navigate(['/runs']);
      },
      error: (err) => {
        console.error('Error using template:', err);
      }
    });
  }
}
