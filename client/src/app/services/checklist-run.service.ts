import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RunDto, UpdateRunDto } from '../types';

@Injectable({ providedIn: 'root' })
export class ChecklistRunService {
  private readonly baseUrl = '/api/checklist-run';
  constructor(private readonly http: HttpClient) {}

  getChecklistRuns(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getChecklistRun(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateCheckListRun(run: UpdateRunDto): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${run.id}`, run);
  }

  createChecklistRun(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  createAdhocChecklistRun(data: Partial<RunDto>): Observable<any> {
    return this.http.post(`${this.baseUrl}/ad-hoc`, data);
  }

  deleteChecklistRun(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
