import { CheckListTemplateDto, CreateChecklistTemplateDto } from '../types';
import { Observable, concat, forkJoin, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateTaskService } from './template-task.service';

@Injectable({ providedIn: 'root' })
export class ChecklistTemplateService {
  private baseUrl = '/api/checklist-template';
  constructor(private http: HttpClient, private readonly templateTasks: TemplateTaskService) {}

  getTemplates(): Observable<CheckListTemplateDto[]> {
    return this.http.get<CheckListTemplateDto[]>(this.baseUrl);
  }
  getTemplate(id: string): Observable<CheckListTemplateDto> {
    return this.http.get<CheckListTemplateDto>(`${this.baseUrl}/${id}`);
  }
  createTemplate(data: CreateChecklistTemplateDto): Observable<any> {
    console.log("🚀 ~ ChecklistTemplateService ~ createTemplate ~ data:", data)
    const tasks: string[] = data.tasks;
    return this.http.post<CheckListTemplateDto>(this.baseUrl, data).pipe(
      switchMap((response) => this.createTemplateSwitchMap(response, tasks)),
    );
  }

  updateTemplate(id: string, data: CheckListTemplateDto): Observable<any> {
    return this.templateTasks.getTemplateTasksByTemplate(id).pipe(
      switchMap((existingTasks: any[]) => {
        const updatedTaskTitles = data.tasks as string[];

        const tasksToDelete = this.findTasksToDelete(existingTasks, updatedTaskTitles);
        const tasksToAdd = this.findTasksToAdd(existingTasks, updatedTaskTitles);
        const tasksToUpdate = this.findTasksToUpdate(existingTasks, updatedTaskTitles);

        const deleteRequests = this.createDeleteRequests(tasksToDelete);
        const addRequests = this.createAddRequests(tasksToAdd, id, updatedTaskTitles);
        const updateRequests = this.createUpdateRequests(tasksToUpdate, updatedTaskTitles);

        return forkJoin([
          ...deleteRequests,
          ...addRequests,
          ...updateRequests,
        ]).pipe(
          switchMap(() => this.http.put(`${this.baseUrl}/${id}`, data))
        );
      })
    );
  }

  private findTasksToDelete(existingTasks: any[], updatedTaskTitles: string[]): any[] {
    return existingTasks.filter(
      task => !updatedTaskTitles.includes(task.title)
    );
  }

  private findTasksToAdd(existingTasks: any[], updatedTaskTitles: string[]): string[] {
    return updatedTaskTitles.filter(
      title => !existingTasks.some(task => task.title === title)
    );
  }

  private findTasksToUpdate(existingTasks: any[], updatedTaskTitles: string[]): any[] {
    return existingTasks.filter(
      task => updatedTaskTitles.includes(task.title) && task.order !== updatedTaskTitles.indexOf(task.title)
    );
  }

  private createDeleteRequests(tasksToDelete: any[]): Observable<any>[] {
    return tasksToDelete.map(task =>
      this.templateTasks.deleteTemplateTask(task.id)
    );
  }

  private createAddRequests(tasksToAdd: string[], checklistTemplateId: string, updatedTaskTitles: string[]): Observable<any>[] {
    return tasksToAdd.map(description =>
      this.templateTasks.createTemplateTask({
        description,
        checklistTemplateId,
        order: updatedTaskTitles.indexOf(description),
      })
    );
  }

  private createUpdateRequests(tasksToUpdate: any[], updatedTaskTitles: string[]): Observable<any>[] {
    return tasksToUpdate.map(task =>
      this.templateTasks.updateTemplateTask(task.id, {
        ...task,
        order: updatedTaskTitles.indexOf(task.title),
      })
    );
  }
  
  deleteTemplate(id: string): Observable<any> {
    // get the tasks associated with the template and delete them
    return this.templateTasks.getTemplateTasksByTemplate(id).pipe(
      switchMap((tasks: any[]) => this.deleteTemplateSwitchMap(id, tasks))
    );
  }

  private deleteTemplateSwitchMap(id: string, tasks: any[]) {
    const deleteRequests = tasks.map(task => this.templateTasks.deleteTemplateTask(task.id));
    return concat(...deleteRequests).pipe(
      switchMap(() => this.http.delete(`${this.baseUrl}/${id}`)) // Return null or any other value as needed
    );
  }

  private createTemplateSwitchMap(response: CheckListTemplateDto, tasks: string[]) {
        const taskRequests = tasks.map((task, i) => {
          return this.templateTasks.createTemplateTask({
            description: task,
            checklistTemplateId: response.id,
            order: i,
          });
        });
        return (taskRequests.length ? forkJoin(taskRequests) : of([])).pipe(
          map((batchedResponses: any[]) => ({
            ...response,
            tasks: batchedResponses.map((res: any) => res.task),
          }))
        );
      }
}
