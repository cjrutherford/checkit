import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './template-edit.html',
  styleUrl: './template-edit.scss'
})
export class TemplateEdit implements OnChanges {
  @Input() template: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  templateForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.templateForm = this.fb.group({
      name: '',
      description: '',
      tasks: this.fb.array([this.fb.control('')]),
      order: false
    });
  }

  get tasks(): FormArray {
    const tasksArray = this.templateForm.get('tasks') as FormArray<FormControl<string>>;
    return tasksArray || this.fb.array([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['template'] && this.template) {
      this.templateForm.patchValue({
        name: this.template.name || '',
        description: this.template.description || '',
        order: this.template.order || false
      });
      // Set tasks
      const tasksArray = this.fb.array([]);
      (this.template.tasks || []).forEach((task: string) => tasksArray.push(this.fb.control(task)));
      this.templateForm.setControl('tasks', tasksArray);
    }
  }

  addTask(): void {
    const tasks = this.templateForm.get('tasks');
    if (tasks && tasks instanceof this.fb.array([]).constructor) {
      (tasks as ReturnType<FormBuilder['array']>).push(this.fb.control(''));
    }
  }

  removeTask(index: number): void {
    const tasks = this.templateForm.get('tasks');
    if (tasks && tasks instanceof this.fb.array([]).constructor) {
      (tasks as ReturnType<FormBuilder['array']>).removeAt(index);
    }
  }

  onSave(): void {
    if (this.templateForm.valid) {
      this.save.emit(this.templateForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
