export const mainMenu = [
  {
    name: 'Dashboard',
    route: '/features/dashboard',
    menuItems: [],
  },
  {
    name: 'Template',
    route: '/features/template',
    menuItems: [
      {
        name: 'Pages',
        route: '/features/template/pages',
      },
      {
        name: 'Components',
        route: '/features/template/components',
      },
      {
        name: 'Colors',
        route: '/features/template/colors',
      },
      {
        name: 'Typography',
        route: '/features/template/typography',
      },
    ],
  },

  {
    name: 'Account',
    route: '/features/account',
    menuItems: [
      {
        name: 'Profile',
        route: '/features/account/profile',
      },
      {
        name: 'Notifications',
        route: '/features/account/notifications',
      },
      {
        name: 'User Settings ',
        route: '/features/account/settings',
      },
    ],
  },
  {
    name: 'Admin',
    route: '/features/admin',
    menuItems: [
      {
        name: 'Dashboard',
        route: '/features/admin/dashboard',
      },
      {
        name: 'Tenants',
        route: '/features/admin/tenants',
      },
      {
        name: 'Roles',
        route: '/features/admin/roles',
      },
      {
        name: 'Users',
        route: '/features/admin/users',
      },
      {
        name: 'Activity',
        route: '/features/admin/activity',
      },
      {
        name: 'Permissions',
        route: '/features/admin/permissions',
      },
      {
        name: 'Settings',
        route: '/features/admin/settings',
      },
    ],
  },
];

export const userMenu = [
  {
    name: 'Profile',
    route: '/features/account/profile',
  },
  {
    name: 'Settings',
    route: '/features/account/settings',
  },
];
