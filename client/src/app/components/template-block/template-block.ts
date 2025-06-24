import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-template-block',
  imports: [],
  templateUrl: './template-block.html',
  styleUrl: './template-block.scss'
})
export class TemplateBlock {
  @Input() template: { name: string; description: string, tasks: string[], order: boolean } = { name: '', description: '', tasks: [], order: false };
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
