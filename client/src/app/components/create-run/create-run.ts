import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Template, TemplateService } from '../../services/template.service';

import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-create-run',
  imports: [],
  templateUrl: './create-run.html',
  styleUrl: './create-run.scss'
})
export class CreateRun implements OnInit {
  templates: Template[] = [];
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly templateService: TemplateService, 
    private readonly runService: RunService
  ) {}

  ngOnInit(): void {
    this.templates = this.templateService.getTemplates();
  }

  selectTemplate(template: Template): void {
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
