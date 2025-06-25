import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckListTemplateDto } from '../../types';

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
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  editTemplate(template: any): void {  
    this.onEdit.emit();
  }

  deleteTemplate(template: any): void {
    this.onDelete.emit();
  }

  useTemplate(template: any): void {
    // Logic to duplicate the template
    console.log('Selecting template:', this.template);
  }
}
