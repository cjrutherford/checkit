import { Component, Input } from '@angular/core';

import { Run } from '../../services/run.service';

@Component({
  selector: 'app-view-run',
  imports: [],
  templateUrl: './view-run.html',
  styleUrl: './view-run.scss'
})
export class ViewRun {
  @Input() run: Run = {
    name: '',
    description: '',
    tasks: [],
    order: false,
    state: []
  };
}
