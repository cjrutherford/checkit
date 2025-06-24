import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-title-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBar {

}
