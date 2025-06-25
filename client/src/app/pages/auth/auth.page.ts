import { Component, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { authRoutes } from './auth.routes';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss'
})
export class AuthPage {
  isLoggedIn = signal(!!localStorage.getItem('authToken'));
  mode: 'login' | 'register' | 'reset' = 'login';
  loginData = { username: '', password: '' };
  registerData = { username: '', password: '', confirmPassword: '' };
  resetData = { oldPassword: '', newPassword: '', confirmNewPassword: '', email: '' };
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  switchMode(mode: 'login' | 'register' | 'reset') {
    this.mode = mode;
    this.error = '';
  }

  login() {
    this.auth.login(this.loginData).subscribe({
      next: () => {
        this.isLoggedIn.set(true);
        this.router.navigate(['/']);
      },
      error: err => this.error = err.error?.message || 'Login failed.'
    });
  }

  register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.auth.register(this.registerData).subscribe({
      next: () => this.switchMode('login'),
      error: err => this.error = err.error?.message || 'Registration failed.'
    });
  }

  reset() {
    this.auth.resetPassword(this.resetData).subscribe({
      next: () => this.switchMode('login'),
      error: err => this.error = err.error?.message || 'Reset failed.'
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }
}
