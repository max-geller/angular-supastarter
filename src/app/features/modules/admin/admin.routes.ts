import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.page').then((m) => m.UsersPage),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/users/pages/user-details/user-details.page').then(
        (m) => m.UserDetailsPage
      ),
  },
  {
    path: 'activity',
    loadComponent: () =>
      import('./pages/activity/activity.page').then((m) => m.ActivityPage),
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./pages/roles/roles.page').then((m) => m.RolesPage),
  },

  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'permissions',
    loadComponent: () =>
      import('./pages/permissions/permissions.page').then(
        (m) => m.PermissionsPage
      ),
  },
  {
    path: 'tenants',
    loadComponent: () =>
      import('./pages/tenants/tenants.page').then((m) => m.TenantsPage),
  },
  {
    path: 'user-details',
    loadComponent: () =>
      import('./pages/users/pages/user-details/user-details.page').then(
        (m) => m.UserDetailsPage
      ),
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('./pages/permissions/permissions.routes').then((m) => m.routes),
  },
    { path: 'billing', loadComponent: () => import('./pages/billing/billing.page').then((m) => m.BillingPage) },
];
