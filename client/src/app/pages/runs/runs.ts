import { Component, effect, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CreateRun } from '../../components/create-run/create-run';
import { RunBlock } from '../../components/run-block/run-block';
import { RunDto } from '../../types';
import { RunService } from '../../services/run.service';
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

  addCreatedRun(run: RunDto) {
    const newRuns = [...this.runs(), run];
    this.runs.set(newRuns); // Add the new run to the local state
    this.closeModals();
  }

  closeModals() {
    this.showCreateRun = false;
    this.showViewRun = false;
  }

  editRun(id: string) {
    // Logic to edit a run by its ID
    console.log(`Editing run with ID: ${id}`);
  }

  deleteRun(run: RunDto, index: number) {
    // Logic to delete a run by its ID
    this.runService.deleteRun(run).subscribe({
      next: () => {
        const currentRuns = this.runs();
        // Remove the run from the local state
        const newRuns = currentRuns.filter(r => r.id !== run.id);
        this.runs.set(newRuns);
      },
      error: (error: any) => {
        console.error(`Error deleting run with ID: ${index}`, error);
      }
    });
  }
}

