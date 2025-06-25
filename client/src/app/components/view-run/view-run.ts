import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Run } from '../../services/run.service';
import { Subscription } from 'rxjs';

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
      this.syncFormWithState();
      this.updateStepAndDisable();
    });
    this.syncFormWithState();
    this.updateStepAndDisable();
  }

  ngOnDestroy(): void {
    this.formChangesSub?.unsubscribe();
  }

  private updateRunStateFromForm(): void {
    // Always update run.state from the form, and ensure boolean values
    const values = this.taskList.value;
    values.forEach((completed: any, i: number) => {
      if (this.run.state[i]) {
        this.run.state[i].completed = !!completed;
      }
    });
  }

  /**
   * Ensure the form controls always reflect the current state array.
   * This prevents desync between the checkboxes and the state.
   */
  private syncFormWithState(): void {
    this.taskList.controls.forEach((ctrl, i) => {
      const shouldBe = !!this.run.state[i]?.completed;
      if (ctrl.value !== shouldBe) {
        ctrl.setValue(shouldBe, { emitEvent: false });
      }
    });
  }

  get taskList(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }

  private initialiseTasks(): void {
    if (!this.run?.state) return;
    this.taskList.clear();
    this.run.state.forEach((task) => {
      this.taskList.push(this.fb.control(!!task.completed));
    });
    // No need to updateStepAndDisable
  }

  private updateStepAndDisable(): void {
    // No-op: disabling/enabling toggles is removed
  }

  private processControlStates(): void {
    // No-op: disabling/enabling toggles is removed
  }

  get completion(): number {
    // Calculate completion based on the actual checkbox values for full sync
    const total = this.taskList.length;
    if (!total) return 0;
    const checked = this.taskList.controls.filter(ctrl => ctrl.value).length;
    return Math.round((checked / total) * 100);
  }

  onClose(): void {
    this.close.emit();
  }
}
