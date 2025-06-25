import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
