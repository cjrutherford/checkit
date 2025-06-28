import { Component, signal } from '@angular/core';
import { from, of } from 'rxjs';

import { AuthService } from '../../services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * TitleBar component: displays the application title and navigation links.
 */
@Component({
  selector: 'app-title-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBar {
  constructor(private readonly authService: AuthService) {
    of(this.authService.isLoggedIn()).subscribe(isLoggedIn => {
      this.isLoggedIn.set(isLoggedIn);
    });
  }
  showSideBar = signal(false);
  isLoggedIn = signal(false);

  toggleSidebar() {
    this.showSideBar.update(value => !value);
  }
}
