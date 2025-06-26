import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateBlock } from './template-block';

describe('TemplateBlock', () => {
  let component: TemplateBlock;
  let fixture: ComponentFixture<TemplateBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateBlock]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display template title and description', () => {
    component.template = {
      id: '1',
      title: 'Test Template',
      description: 'A test template',
      tasks: [],
      order: false,
      user: undefined,
      checklistRuns: []
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title h2')?.textContent).toContain('Test Template');
    expect(compiled.querySelector('.description p')?.textContent).toContain('A test template');
  });

  it('should emit onEdit when edit button is clicked', () => {
    const spy = jest.spyOn(component.onEdit, 'emit');
    const button = fixture.nativeElement.querySelector('.edit-button');
    button?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onDelete when delete button is clicked', () => {
    const spy = jest.spyOn(component.onDelete, 'emit');
    const button = fixture.nativeElement.querySelector('.delete-button');
    button?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onEdit when editTemplate is called', () => {
    const spy = jest.spyOn(component.onEdit, 'emit');
    component.editTemplate(component.template);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit onDelete when deleteTemplate is called', () => {
    const spy = jest.spyOn(component.onDelete, 'emit');
    component.deleteTemplate(component.template);
    expect(spy).toHaveBeenCalled();
  });

  it('should call useTemplate and log to console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    component.useTemplate(component.template);
    expect(logSpy).toHaveBeenCalledWith('Selecting template:', component.template);
    logSpy.mockRestore();
  });

  it('should have default template input values', () => {
    expect(component.template).toEqual({
      id: '',
      title: '',
      description: '',
      tasks: [],
      order: false,
      user: undefined,
      checklistRuns: []
    });
  });
});
    expect(component.onDelete.emit).toHaveBeenCalled();
  });
});
