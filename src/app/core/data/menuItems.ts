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
    menuItems: [
      {
        name: 'Home',
        route: '/features/docs/home',
      },
      {
        name: 'Getting Started',
        route: '/features/docs/getting-started',
      },
      {
        name: 'Architecture',
        route: '/features/docs/architecture',
      },
      {
        name: 'Multi-Tenancy Appraoch',
        route: '/features/docs/multi-tenancy',
      },
      {
        name: 'Supabase Integration',
        route: '/features/docs/supabase',
      },
      {
        name: 'Angular Components',
        route: '/features/docs/auth',
      },
      {
        name: 'Customization Guide',
        route: '/features/docs/authz',
      },
      {
        name: 'Deployment',
        route: '/features/docs/deployment',
      },
      {
        name: 'Conributing',
        route: '/features/docs/contributing',
      },
      {
        name: 'Troubleshooting',
        route: '/features/docs/troubleshooting',
      },
      {
        name: 'Changelog',
        route: '/features/docs/changelog',
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
