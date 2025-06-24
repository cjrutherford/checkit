import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBlock } from './template-block';

describe('TemplateBlock', () => {
  let component: TemplateBlock;
  let fixture: ComponentFixture<TemplateBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
