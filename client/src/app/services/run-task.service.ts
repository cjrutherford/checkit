import { CreateRunTaskDto, UpdateRunTaskDto } from '../types';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RunTaskService {
  private readonly baseUrl = '/api/run-task';
  constructor(private readonly http: HttpClient) {}

  createRunTask(data: CreateRunTaskDto): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  
  getRunTasksByChecklistRun(checklistRunId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${checklistRunId}`);
  }
  getRunTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateRunTask(id: string, data: UpdateRunTaskDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deleteRunTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
