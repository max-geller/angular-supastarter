import type { Routes } from '@angular/router';
import { PermissionsPage } from './permissions.page';

export const routes: Routes = [
  {
    path: '',
    component: PermissionsPage,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./role-permissions.page/role-permissions.page').then(
            (m) => m.RolePermissionsPage
          ),
      },
    ],
  },
];
