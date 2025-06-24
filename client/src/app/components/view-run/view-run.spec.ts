import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRun } from './view-run';

describe('ViewRun', () => {
  let component: ViewRun;
  let fixture: ComponentFixture<ViewRun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRun);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
