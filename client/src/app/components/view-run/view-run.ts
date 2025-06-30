import { CheckListTemplateDto, RunDto, UpdateRunDto } from '../../types';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ChecklistRunService } from '../../services/checklist-run.service';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { RunTaskService } from '../../services/run-task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-run',
  imports: [CommonModule, ProgressBarComponent, ReactiveFormsModule],
  templateUrl: './view-run.html',
  styleUrl: './view-run.scss',
})
export class ViewRun {
  private readonly _currentStep = 0;

  @Input() set run(value: RunDto) {
    console.log('🚀 ~ ViewRun ~ @Input ~ value:', value);
    this._run = value;
    this.initialiseTasks();
    this.updateStepAndDisable();
  }
  get run(): RunDto {
    return this._run;
  }
  private _run: RunDto = {
    id: '',
    title: '',
    description: '',
    tasks: [],
    user: '',
    status: 'pending',
    checklistTemplate: {} as CheckListTemplateDto,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() runUpdated: EventEmitter<RunDto> = new EventEmitter<RunDto>();

  taskForm: FormGroup;

  private readonly formChangesSub?: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly runTaskService: RunTaskService,
    private readonly checklistRunService: ChecklistRunService,
  ) {
    this.taskForm = this.fb.group({
      tasks: this.fb.array([]),
    });
  }


  ngOnDestroy(): void {
    this.formChangesSub?.unsubscribe();
  }

  private updateRunStateFromForm(): void {
    // Update each task's status based on the checkbox value
    const values = this.taskList.value;
    values.forEach((completed: any, i: number) => {
      if (this.run.tasks[i]) {
        this.run.tasks[i].completed = !!completed;
      }
    });
  }

  /**
   * Ensure the form controls always reflect the current tasks' status.
   * This prevents desync between the checkboxes and the status.
   */
  private syncFormWithState(): void {
    this.taskList.controls.forEach((ctrl, i) => {
      const shouldBe = this.run.tasks[i]?.completed;
      if (ctrl.value !== shouldBe) {
        ctrl.setValue(shouldBe, { emitEvent: false });
      }
    });
  }

  get taskList(): FormArray {
    return this.taskForm.get('tasks') as FormArray;
  }


  private updateStepAndDisable(): void {
    if (this.run?.checklistTemplate?.order) {
      // Find the first incomplete task
      const firstIncompleteIdx = this.run.tasks.findIndex((t) => !t.completed);
      this.taskList.controls.forEach((ctrl, i) => {
        if (i === firstIncompleteIdx || this.run.tasks[i].completed) {
          ctrl.enable({ emitEvent: false });
        } else {
          ctrl.disable({ emitEvent: false });
        }
      });
    } else {
      // If order doesn't matter, enable all controls
      this.taskList.controls.forEach((ctrl) =>
        ctrl.enable({ emitEvent: false }),
      );
    }
  }

  private initialiseTasks(): void {
    if (!this.run?.tasks) return;
    this.taskList.clear();
    this.run.tasks.forEach((task, i) => {
      const control = this.fb.control(task.completed);
      control.valueChanges.subscribe(() => this.onTaskToggle(i));
      this.taskList.push(control);
    });
    this.updateStepAndDisable(); // <-- Call after initializing tasks
  }

  onTaskToggle(index: number): void {
    const task = this.run.tasks[index];
    const checked = this.taskList.at(index).value;
    // Update the task status in backend
    this.runTaskService
      .updateRunTask(task.id, { completed: checked })
      .subscribe(() => {
        this.run.tasks[index].completed = checked;
        // Check if all tasks are completed
        const allCompleted = this.run.tasks.every((t) => t.completed);
        const wasCompleted = !!this.run.completedAt;
        if (allCompleted && !wasCompleted) {
          // Mark run as completed
          const updatedRun: UpdateRunDto = {
            id: this.run.id,
            completedAt: new Date(),
          };
          this.checklistRunService
            .updateCheckListRun(updatedRun)
            .subscribe(() => {
              this.run.completedAt = updatedRun.completedAt;
            });
        } else if (!allCompleted && wasCompleted) {
          // Unmark run as completed
          const updatedRun: UpdateRunDto = {
            id: this.run.id,
            completedAt: null,
          };
          this.checklistRunService
            .updateCheckListRun(updatedRun)
            .subscribe(() => {
              this.run.completedAt = null;
            });
        }
        this.runUpdated.emit(this.run);
        this.updateStepAndDisable(); // <-- Update enabled/disabled state after toggle
      });
  }

  get completion(): number {
    // Calculate completion based on the actual checkbox values for full sync
    const total = this.taskList.length;
    if (!total) return 0;
    const checked = this.taskList.controls.filter((ctrl) => ctrl.value).length;
    return Math.round((checked / total) * 100);
  }

  onClose(): void {
    this.close.emit();
  }
}
