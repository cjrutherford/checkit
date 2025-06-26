import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  error: string = '';

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  login() {
    this.auth.login(this.loginData).subscribe({
      next: ({token, user}) => {
        this.auth.setAuthToken(token);
        this.auth.setUser(user);
        this.router.navigate(['/'])
      },
      error: err => this.error = err.error?.error ?? 'Login failed.'
    });
  }
}
