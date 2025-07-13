import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RunDto } from '../../types';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-create-adhoc-run',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-adhoc-run.html',
  styleUrls: ['./create-adhoc-run.scss']
})
export class CreateAdhocRun {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() runCreated: EventEmitter<RunDto> = new EventEmitter<RunDto>();

  adhocRunForm: FormGroup;

  constructor(private fb: FormBuilder, private runService: RunService) {
    this.adhocRunForm = this.fb.group({
      title: '',
      description: '',
      tasks: this.fb.array([this.fb.control('')])
    });
  }

  get tasks(): FormArray {
    return this.adhocRunForm.get('tasks') as FormArray;
  }

  addTask(): void {
    this.tasks.push(this.fb.control(''));
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  onSave(): void {
    if (this.adhocRunForm.valid) {
      this.runService.addAdhocRun(this.adhocRunForm.value).subscribe({
        next: (run) => {
          this.runCreated.emit(run);
          this.onClose();
        },
        error: (error) => {
          console.error('Error creating ad-hoc run:', error);
        }
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}