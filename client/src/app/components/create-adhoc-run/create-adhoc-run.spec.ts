import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdhocRun } from './create-adhoc-run';

describe('CreateAdhocRun', () => {
  let component: CreateAdhocRun;
  let fixture: ComponentFixture<CreateAdhocRun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdhocRun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdhocRun);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
