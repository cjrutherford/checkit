import { AuthGuard } from './services/auth.guard';
import { AuthPage } from './pages/auth/auth.page';
import { Profile } from './pages/profile/profile';
import { Routes } from '@angular/router';
import { Runs } from './pages/runs/runs';
import { Templates } from './pages/templates/templates';
import { authRoutes } from './pages/auth/auth.routes';

export const routes: Routes = [
    { path: 'templates', component: Templates, canActivate: [AuthGuard] },
    { path: 'runs', component: Runs, canActivate: [AuthGuard] },
    { path: 'profile', component: Profile },
    { path: 'auth', component: AuthPage, children: authRoutes },
    { path: '**', redirectTo: 'runs' } // Redirect any unknown paths to the Runs page
];
