import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChecklistRunService {
  private baseUrl = '/api/checklist-run';
  constructor(private http: HttpClient) {}

  getChecklistRuns(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getChecklistRun(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createChecklistRun(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  deleteChecklistRun(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
