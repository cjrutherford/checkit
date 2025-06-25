import { CreateTemplateTaskDto, TemplateTaskDto } from '../types';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemplateTaskService {
  private baseUrl = '/api/template-task';
  constructor(private http: HttpClient) {}

  getTemplateTasksByTemplate(templateId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/template/${templateId}`);
  }
  getTemplateTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createTemplateTask(data: CreateTemplateTaskDto): Observable<TemplateTaskDto> {
    return this.http.post<TemplateTaskDto>(this.baseUrl, data);
  }
  updateTemplateTask(id: string, data: TemplateTaskDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deleteTemplateTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
