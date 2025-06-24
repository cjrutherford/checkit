import { Component, OnInit } from '@angular/core';
import { TemplateBlock } from '../../components/template-block/template-block';
import { CommonModule } from '@angular/common';
import { TemplateEdit } from '../../components/template-edit/template-edit';
import { TemplateService, Template } from '../../services/template.service';

@Component({
  selector: 'app-templates',
  imports: [CommonModule, TemplateBlock, TemplateEdit],
  templateUrl: './templates.html',
  styleUrl: './templates.scss'
})
export class Templates implements OnInit {
  templates: Template[] = [];
  showModal = false;
  selectedTemplate: Template | null = null;
  editIndex: number | null = null;

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.templates = this.templateService.getTemplates();
  }

  openNewTemplateModal(): void {
    this.selectedTemplate = { name: '', description: '', tasks: [], order: false };
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
    this.selectedTemplate = null;
    this.editIndex = null;
  }

  onSaveTemplate(template: Template): void {
    if (this.editIndex !== null) {
      this.templateService.updateTemplate(this.editIndex, template);
    } else {
      this.templateService.addTemplate(template);
    }
    this.loadTemplates();
    this.closeModal();
  }

  deleteTemplate(index: number): void {
    this.templateService.deleteTemplate(index);
    this.loadTemplates();
  }
}
