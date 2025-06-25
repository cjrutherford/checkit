import { BehaviorSubject, Observable } from 'rxjs';
import { CheckListTemplateDto, RunDto } from '../types';

import { Injectable } from '@angular/core';
import { Template } from './template.service';

export interface Run {
  name: string;
  description: string;
  tasks: string[];
  order: boolean;
  state: RunState[];
}

export interface RunState {
  task: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private runsSubject = new BehaviorSubject<RunDto[]>([]);

  getRuns(): Observable<RunDto[]> {
    return this.runsSubject.asObservable();
  }

  addRunFromTemplate(template: CheckListTemplateDto): void {
    const run: RunDto = {
      ...template,
      title: template.title + ` - Run ${new Date().toLocaleDateString()}`,
      status: 'pending',
      checklistTemplate: new CheckListTemplateDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const currentRuns = this.runsSubject.value;
    this.runsSubject.next([...currentRuns, run]);
  }

  updateRun(index: number, run: RunDto): void {
    const currentRuns = [...this.runsSubject.value];
    currentRuns[index] = run;
    this.runsSubject.next(currentRuns);
  }

  deleteRun(index: number): void {
    const currentRuns = [...this.runsSubject.value];
    currentRuns.splice(index, 1);
    this.runsSubject.next(currentRuns);
  }
}
