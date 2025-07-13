import { Component, effect, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CreateAdhocRun } from '../../components/create-adhoc-run/create-adhoc-run';
import { CreateRun } from '../../components/create-run/create-run';
import { MessageService } from './../../services/message';
import { RunBlock } from '../../components/run-block/run-block';
import { RunDto } from '../../types';
import { RunService } from '../../services/run.service';
import { ViewRun } from '../../components/view-run/view-run';

/**
 * Runs page component: displays and manages user checklist runs.
 * - Fetches runs from the backend
 * - Allows creating and viewing runs
 */



@Component({
  selector: 'app-runs',
  imports: [CommonModule, CreateRun, ViewRun, RunBlock, CreateAdhocRun],
  templateUrl: './runs.html',
  styleUrl: './runs.scss'
})
export class Runs {
  showCreateRun = false;
  showCreateAdhocRun = false;
  showViewRun = false;
  selectedRun?: any;
  runs = signal<RunDto[]>([])

  constructor(private readonly runService: RunService, private readonly messageService: MessageService) {
    effect(() => {
      this.runService.getRuns().subscribe({
        next: runs => this.runs.set(runs),
        error: (err) => {
          console.error('Error fetching runs:', err);
          this.messageService.addMessage({
            content: 'Failed to load runs. Please try again later.' + err,
            type: 'error'
          });
        }
      })
    })
  }

  createRun() {
    this.showCreateRun = true;
  }

  createAdhocRun() {
    this.showCreateAdhocRun = true;
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
    this.showCreateAdhocRun = false;
  }

  editRun(id: string) {
    // Logic to edit a run by its ID
    console.log(`Editing run with ID: ${id}`);
  }

  updateRun(run: RunDto) {
    // Logic to update a run by its ID
    const currentRuns = this.runs();
    const updatedRuns = currentRuns.map(r => r.id === run.id ? run : r);
    this.runs.set(updatedRuns);
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
        this.messageService.addMessage({
          content: 'Failed to delete run. Please try again later.' + error,
          type: 'error'
        });
      }
    });
  }
}

