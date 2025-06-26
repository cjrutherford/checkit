import { Run, RunService } from '../../services/run.service';
import { Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { CreateRun } from '../../components/create-run/create-run';
import { RunBlock } from '../../components/run-block/run-block';
import { RunDto } from '../../types';
import { ViewRun } from '../../components/view-run/view-run';

@Component({
  selector: 'app-runs',
  imports: [CommonModule, CreateRun, ViewRun, RunBlock],
  templateUrl: './runs.html',
  styleUrl: './runs.scss'
})
export class Runs {
  showCreateRun = false;
  showViewRun = false;
  selectedRun?: any;
  runs = signal<RunDto[]>([])

  constructor(private readonly runService: RunService) {
    effect(() => {
      this.runService.getRuns().subscribe(runs => this.runs.set(runs))
    })
  }

  createRun() {
    this.showCreateRun = true;
  }

  viewrun() {
    this.showViewRun = true;
  }

  selectViewRun(run: any) {
    this.selectedRun = run;
    this.viewrun();
  }

  closeModals() {
    console.log('Closing modals');
    this.showCreateRun = false;
    this.showViewRun = false;
  }

  editRun(id: string) {
    // Logic to edit a run by its ID
    console.log(`Editing run with ID: ${id}`);
  }

  deleteRun(id: string) {
    // Logic to delete a run by its ID
    console.log(`Deleting run with ID: ${id}`);
  }
}

