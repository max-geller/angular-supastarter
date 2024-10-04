import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
  {
    path: 'forgot-pass',
    loadComponent: () =>
      import('./pages/forgot-pass/forgot-pass.page').then(
        (m) => m.ForgotPassPage
      ),
  },
  {
    path: 'request',
    loadComponent: () =>
      import('./pages/request/request.page').then((m) => m.RequestPage),
  },
  {
    path: 'update-pass',
    loadComponent: () =>
      import('./pages/update-pass/update-pass.page').then(
        (m) => m.UpdatePassPage
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
];
