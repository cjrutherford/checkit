import { CheckListTemplateDto, RunDto } from '../../types';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Run } from '../../services/run.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-run-block',
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './run-block.html',
  styleUrl: './run-block.scss'
})
export class RunBlock {
  @Input() run: RunDto = {
    title: '',
    description: '',
    tasks: [],
    id: '',
    user: undefined,
    checklistTemplate: {} as CheckListTemplateDto,
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date(),
  }; // Replace 'any' with the appropriate type for your run object

  @Output() view: EventEmitter<RunDto> = new EventEmitter<RunDto>();
  
  get completion(): number {
    return this.run.tasks.map(s => s.completedAt)
    .filter(c => c).length / this.run.tasks.length * 100;
  }

  get nextTask(): string {
    const next = this.run.tasks.find(s => !s.completedAt);
    return next ? next.description! : 'All tasks completed';
  }

  viewRun(): void {
    this.view.emit(this.run);
  }

}
