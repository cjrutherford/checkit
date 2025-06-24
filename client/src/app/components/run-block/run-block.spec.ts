import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunBlock } from './run-block';

describe('RunBlock', () => {
  let component: RunBlock;
  let fixture: ComponentFixture<RunBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
