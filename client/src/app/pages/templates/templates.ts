/**
 * Templates page component: manages checklist templates.
 * - Fetches and displays templates
 * - Allows editing, creating, and selecting templates
 */

import { CheckListTemplateDto, CreateChecklistTemplateDto } from '../../types';
import { Component, effect, signal } from '@angular/core';

import { ChecklistTemplateService } from '../../services';
import { CommonModule } from '@angular/common';
import { TemplateBlock } from '../../components/template-block/template-block';
import { TemplateEdit } from '../../components/template-edit/template-edit';

@Component({
  selector: 'app-templates',
  imports: [CommonModule, TemplateBlock, TemplateEdit],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates {
  templates = signal<CheckListTemplateDto[]>([]);
  showModal = false;
  selectedTemplate: CheckListTemplateDto = {
    id: '',
    title: '',
    description: '',
    tasks: [],
    order: false,
    user: '',
    checklistRuns: [],
  };
  editIndex: number | null = null;

  constructor(private readonly templateService: ChecklistTemplateService) {
    effect(() => {
      this.templateService.getTemplates().subscribe({
        next: (templates: CheckListTemplateDto[]) => {
          const mappedTemplates = templates.map(this.loadTemplateMappter);
          this.templates.set(mappedTemplates);
        },
      });
    });
  }

  private loadTemplateMappter(t: CheckListTemplateDto): CheckListTemplateDto {
    t.tasks = t.tasks.map((task) => task.description);
    return t;
  }

  openNewTemplateModal(): void {
    this.selectedTemplate = {
      id: '',
      title: '',
      description: '',
      tasks: [],
      order: false,
      user: '',
      checklistRuns: [],
    };
    this.editIndex = null;
    this.showModal = true;
  }

  openEditTemplateModal(index: number): void {
    this.selectedTemplate = this.templates()[index];
    this.editIndex = index;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTemplate = {
      id: '',
      title: '',
      description: '',
      tasks: [],
      order: false,
      user: '',
      checklistRuns: [],
    };
    this.editIndex = null;
  }

  onSaveTemplate(
    template: CreateChecklistTemplateDto | CheckListTemplateDto,
  ): void {
    if ('id' in template && 'checklistRuns' in template) {
      this.templateService.updateTemplate(template.id, template).subscribe({
        next: (updatedTemplate: CheckListTemplateDto) => {
          if (this.editIndex !== null) {
            const currentTemplates = this.templates();
            currentTemplates[this.editIndex] = updatedTemplate;
            this.templates.set(currentTemplates);
          } else {
            this.templates.set([...this.templates(), updatedTemplate]);
          }
        },
        error: (err) => {
          console.error('Error updating template:', err);
        },
      });
    } else {
      this.templateService.createTemplate(template).subscribe({
        next: (newTemplate: CheckListTemplateDto) => {
          this.templates.set([...this.templates(), newTemplate]);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating template:', err);
          this.closeModal();
        },
      });
    }
  }

  deleteTemplate(index: number): void {
    effect(() => {
      this.templateService
        .deleteTemplate(this.templates()[index].id)
        .subscribe({
          next: () => {
            const originalTemplates = this.templates();
            this.templates.set(originalTemplates.filter((_, i) => i !== index));
            this.closeModal();
          },
        });
    });
  }
}
