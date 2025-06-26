import { signal, computed, Injectable } from '@angular/core';
import { CheckListTemplateDto, RunDto } from '../types';
import { HttpClient } from '@angular/common/http';

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
  private baseUrl = '/api/checklist-run/'
  constructor(private readonly http: HttpClient) {}
  private runsSignal = signal<RunDto[]>([]);

  get runs() {
    return this.runsSignal();
  }

  getRuns(){
    return this.http.get<RunDto[]>(this.baseUrl)
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
    const currentRuns = this.runsSignal();
    this.runsSignal.set([...currentRuns, run]);
  }

  updateRun(index: number, run: RunDto): void {
    const currentRuns = [...this.runsSignal()];
    currentRuns[index] = run;
    this.runsSignal.set(currentRuns);
  }

  deleteRun(index: number): void {
    const currentRuns = [...this.runsSignal()];
    currentRuns.splice(index, 1);
    this.runsSignal.set(currentRuns);
  }
}
