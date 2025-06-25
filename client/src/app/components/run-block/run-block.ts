import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Run } from '../../services/run.service'; // Adjust the import path as necessary
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-run-block',
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './run-block.html',
  styleUrl: './run-block.scss'
})
export class RunBlock {
  @Input() run: Run = {
    name: '',
    description: '',
    tasks: [],
    order: false,
    state: []
  }; // Replace 'any' with the appropriate type for your run object

  @Output() view: EventEmitter<Run> = new EventEmitter<Run>();
  
  get completion(): number {
    return this.run.state.map(s => s.completed)
    .filter(c => c).length / this.run.state.length * 100;
  }

  get nextTask(): string {
    const next = this.run.state.find(s => !s.completed);
    return next ? next.task : 'All tasks completed';
  }

  viewRun(): void {
    this.view.emit(this.run);
  }

}
