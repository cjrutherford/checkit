import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

/**
 * ProgressBarComponent: displays a progress bar for completion percentage.
 * - Accepts a completion input (0-100)
 */
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-bar-outer">
      <div class="progress-bar-inner pulsing" [ngStyle]="{'width': completion + '%'}"></div>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() completion: number = 0;
}
