import { CheckListTemplateDto, CreateChecklistTemplateDto } from '../../types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ChecklistTemplateService } from '../../services';
import { CommonModule } from '@angular/common';
import { TemplateBlock } from '../../components/template-block/template-block';
import { TemplateEdit } from '../../components/template-edit/template-edit';

@Component({
  selector: 'app-templates',
  imports: [CommonModule, TemplateBlock, TemplateEdit],
  templateUrl: './templates.html',
  styleUrl: './templates.scss'
})
export class Templates implements OnInit, OnDestroy {
  templates: CheckListTemplateDto[] = [];
  showModal = false;
  selectedTemplate: CheckListTemplateDto = {
    id: '',
    title: '',
    description: '',
    tasks: [],
    order: false,
    user: '',
    checklistRuns: []
  };
  editIndex: number | null = null;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private templateService: ChecklistTemplateService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTemplates(): void {
    this.templateService.getTemplates().pipe(takeUntil(this.destroy$)).subscribe({
      next: (templates: CheckListTemplateDto[]) => {
        this.templates = templates.map(t => {
          t.tasks = t.tasks.map(task => task.description)
          return t;
        });
      },
    });
  }

  openNewTemplateModal(): void {
    this.selectedTemplate = { id: '', title: '', description: '', tasks: [], order: false, user: '', checklistRuns: [] };
    this.editIndex = null;
    this.showModal = true;
  }

  openEditTemplateModal(index: number): void {
    this.selectedTemplate = { ...this.templates[index] };
    this.editIndex = index;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTemplate = { id: '', title: '', description: '', tasks: [], order: false, user: '', checklistRuns: [] };
    this.editIndex = null;
  }

  onSaveTemplate(template: CreateChecklistTemplateDto | CheckListTemplateDto): void {
    if ('id' in template && 'checklistRuns' in template) {
      this.templateService.updateTemplate(template.id, template).subscribe({
        next: (updatedTemplate: CheckListTemplateDto) => {
          if (this.editIndex !== null) {
            this.templates[this.editIndex] = updatedTemplate;
          } else {
            this.templates.push(updatedTemplate);
          }
        },
        error: (err) => {
          console.error('Error updating template:', err);
        }
      });
    } else {
      this.templateService.createTemplate(template).subscribe({
        next: (newTemplate: CheckListTemplateDto) => {
          this.templates.push(newTemplate);
          this.loadTemplates();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating template:', err);
          this.loadTemplates();
          this.closeModal();
        }
      });
    }
  }

  deleteTemplate(index: number): void {
    this.templateService.deleteTemplate(this.templates[index].id).subscribe({
      next: () => {
        this.templates.splice(index, 1)
        this.closeModal();
      },
    });
    this.loadTemplates();
  }
}
