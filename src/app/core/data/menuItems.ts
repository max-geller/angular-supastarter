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
        name: 'Teams',
        route: '/features/account/teams',
      },
      {
        name: 'Notifications',
        route: '/features/account/notifications',
      },
      {
        name: 'Billing',
        route: '/features/account/billing',
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
        name: 'Users',
        route: '/features/admin/users',
      },
      {
        name: 'Roles',
        route: '/features/admin/roles',
      },
      {
        name: 'Activity',
        route: '/features/admin/activity',
      },
      {
        name: 'Billing',
        route: '/features/admin/billing',
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
  {
    name: 'Documentation',
    route: '/features/docs',
    menuItems: [],
  },
];

export const userMenu = [
  {
    name: 'Profile',
    route: '/features/account/profile',
  },
  {
    name: 'Teams',
    route: '/features/account/teams',
  },
  {
    name: 'Settings',
    route: '/features/account/settings',
  },
];
