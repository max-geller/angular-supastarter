import type { Routes } from '@angular/router';
import { DocsPage } from './docs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
        import('./docs.page').then((m) => m.DocsPage),
    },
];
