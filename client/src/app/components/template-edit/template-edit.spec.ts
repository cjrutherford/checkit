import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEdit } from './template-edit';

describe('TemplateEdit', () => {
  let component: TemplateEdit;
  let fixture: ComponentFixture<TemplateEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
