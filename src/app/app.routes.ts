import { Routes } from '@angular/router';

// Import Layouts
import { AppLayout } from './features/layout/app.layout';
import { SessionsLayout } from './sessions/layout/sessions.layout';


// Import Guards
import { IsRegisteredGuard } from './core/guards/is-registered.guard';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'features',
    pathMatch: 'full',
  },
  {
    path: 'features',
    component: AppLayout,
    canActivate: [IsRegisteredGuard, AuthGuard],
    loadChildren: () =>
      import('./features/features.routes').then((m) => m.routes),
  },
  {
    path: 'sessions',
    component: SessionsLayout,
    loadChildren: () =>
      import('./sessions/sessions.routes').then((m) => m.routes),
  },
];
