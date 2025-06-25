import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Run } from '../../services/run.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-run',
  imports: [CommonModule, ProgressBarComponent, ReactiveFormsModule],
  templateUrl: './view-run.html',
  styleUrl: './view-run.scss'
})
export class ViewRun implements OnInit, OnDestroy {
  private _currentStep = 0;

  @Input() set run(value: Run) {
    this._run = value;
    this.initialiseTasks();
    this.updateStepAndDisable();
  }
  get run(): Run {
    return this._run;
  }
  private _run: Run = {
    name: '',
    description: '',
    tasks: [],
    order: false,
    state: []
  };

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  taskForm: FormGroup;

  private formChangesSub?: Subscription;

  constructor(private readonly fb: FormBuilder) {
    this.taskForm = this.fb.group({
      tasks: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.formChangesSub = this.taskForm.valueChanges.subscribe(() => {
      this.updateRunStateFromForm();
      this.updateStepAndDisable();
    });
    this.updateStepAndDisable();
  }

  ngOnDestroy(): void {
    this.formChangesSub?.unsubscribe();
  }

  get completion(): number {
    const total = this.run.state.length;
    if (!total) return 0;
    const completed = this.run.state.filter(s => !!s.completed).length;
    return Math.round((completed / total) * 100);
  }

  get taskList(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }

  private initialiseTasks(): void {
    if (!this.run || !this.run.state) return;
    this.taskList.clear();
    this.run.state.forEach((task) => {
      this.taskList.push(this.fb.control(!!task.completed));
    });
    this.updateStepAndDisable();
  }

  private updateRunStateFromForm(): void {
    const values = this.taskList.value;
    values.forEach((completed: boolean, i: number) => {
      if (this.run.state[i]) {
        this.run.state[i].completed = completed;
      }
    });

    if (this.run.order) {
      // Find the first unchecked step
      let firstUnchecked = values.findIndex((v: boolean) => !v);
      if (firstUnchecked === -1) firstUnchecked = values.length;

      // If a checked step before the first unchecked is unchecked, uncheck it and all after it
      this.taskList.controls.forEach((ctrl, i) => {
        if (i >= firstUnchecked && ctrl.value) {
          ctrl.setValue(false, { emitEvent: false });
          this.run.state[i].completed = false;
        }
      });
    }
  }

  /**
   * Determines the current step for ordered runs and disables/enables controls accordingly.
   * Only the current step can be checked, and only the previous step can be unchecked.
   */
  private updateStepAndDisable(): void {
    if (!this.run.order) {
      this.taskList.controls.forEach(ctrl => ctrl.enable({ emitEvent: false }));
      return;
    }

    // Find the first incomplete step (current step)
    let current = 0;
    for (; current < this.run.state.length; current++) {
      if (!this.run.state[current].completed) break;
    }
    this._currentStep = current;

    // Only enable the current step (for checking) and previous step (for unchecking)
    this.taskList.controls.forEach((ctrl, i) => {
      if (i === current) {
        ctrl.enable({ emitEvent: false });
      } else if (i === current - 1 && this.run.state[i].completed) {
        ctrl.enable({ emitEvent: false });
      } else {
        ctrl.disable({ emitEvent: false });
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
