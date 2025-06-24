import { Routes } from '@angular/router';
import { Templates } from './pages/templates/templates';
import { Runs } from './pages/runs/runs';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    { path: 'templates', component: Templates },
    { path: 'runs', component: Runs },
    { path: 'profile', component: Profile },
    { path: '**', redirectTo: 'runs' } // Redirect any unknown paths to the Runs page
];
