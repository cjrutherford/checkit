import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RunTaskService {
  private baseUrl = '/api/run-task';
  constructor(private http: HttpClient) {}

  getRunTasksByChecklistRun(checklistRunId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${checklistRunId}`);
  }
  getRunTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateRunTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deleteRunTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
