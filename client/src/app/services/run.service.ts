import { CheckListTemplateDto, CreateRunDto, RunDto } from '../types';
import { Observable, forkJoin, switchMap } from 'rxjs';

import { ChecklistRunService } from './checklist-run.service';
import { Injectable } from '@angular/core';
import { RunTaskService } from './run-task.service';

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
  constructor(
    private readonly checklistRunService: ChecklistRunService,
    private readonly runTaskService: RunTaskService
  ) {}


  getRuns(){
    return this.checklistRunService.getChecklistRuns()
  }

  addAdhocRun(run: Partial<RunDto>): Observable<any> {
    return this.checklistRunService.createAdhocChecklistRun(run);
  }

  addRunFromTemplate(template: CheckListTemplateDto): Observable<any> {
    const run: CreateRunDto = {
      ...template,
      title: template.title + ` - Run ${new Date().toLocaleDateString()}`,
      description: template.description,
      status: 'pending',
      checklistTemplateId: template.id,
    };
    return this.checklistRunService.createChecklistRun(run)
  }

  updateRun(index: number, run: RunDto) {
    // return this.checklistRunService.
  }

  deleteRun(run: RunDto): Observable<any> {
    console.log("Deleting run:", run);
    if (!run) return forkJoin([]); // Return an empty observable if run not found

    const runTaskIds = (run.tasks || []).map(task => task.id);

    console.log("Run task IDs to delete:", runTaskIds);
    const deleteTasks$ = runTaskIds.length > 0
      ? forkJoin(runTaskIds.map(id => this.runTaskService.deleteRunTask(id)))
      : forkJoin([]);

    if (runTaskIds.length === 0) {
      console.log("No tasks to delete for run:", run.id);
      return this.checklistRunService.deleteChecklistRun(run.id);
    }
    return deleteTasks$.pipe(
      switchMap(() => {
        console.log("Deleting checklist run:", run.id);
        return this.checklistRunService.deleteChecklistRun(run.id)
      })
    );
  }
}
