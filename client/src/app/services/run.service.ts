import { BehaviorSubject, Observable } from 'rxjs';

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
  private runsSubject = new BehaviorSubject<Run[]>([]);

  getRuns(): Observable<Run[]> {
    return this.runsSubject.asObservable();
  }

  addRunFromTemplate(template: Template): void {
    const run: Run = {
      ...template,
      name: template.name + ` - Run ${new Date().toLocaleDateString()}`,
      state: template.tasks.map(task => ({ task, completed: false }))
    };
    const currentRuns = this.runsSubject.value;
    this.runsSubject.next([...currentRuns, run]);
  }

  updateRun(index: number, run: Run): void {
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
