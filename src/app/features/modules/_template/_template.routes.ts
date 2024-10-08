import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full',
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./pages/components/components.page').then(
        (m) => m.ComponentsPage
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'colors',
    loadComponent: () =>
      import('./pages/colors/colors.page').then((m) => m.ColorsPage),
  },
  {
    path: 'typography',
    loadComponent: () =>
      import('./pages/typography/typography.page').then(
        (m) => m.TypographyPage
      ),
  },
];
