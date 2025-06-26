import { CheckListTemplateDto, RunDto } from '../../types';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

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
  @Output() delete: EventEmitter<RunDto> = new EventEmitter<RunDto>();
  
  get completion(): number {
    if (!this.run.tasks?.length) {
      return 0; // No tasks, no completion
    }
    return this.run.tasks.map(s => s.completed).filter(x => x)
    .filter(c => c).length / this.run.tasks.length * 100;
  }

  get nextTask(): string {
    if (!this.run.tasks?.length) {
      return 'No tasks available';
    }
    const next = this.run.tasks.find(s => !s.completed);
    return next ? next.description! : 'All tasks completed';
  }

  viewRun(): void {
    this.view.emit(this.run);
  }

  deleteRun(): void {
    this.delete.emit(this.run);
  }

}
