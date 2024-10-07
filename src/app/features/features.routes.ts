import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/account/account.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'template',
    loadChildren: () =>
      import('./modules/_template/_template.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    canActivate: [],
    loadChildren: () =>
      import('./modules/admin/admin.routes').then((m) => m.routes),
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./modules/docs/docs.routes').then((m) => m.routes),
  },
];
