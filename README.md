<h1 align="center">
  Angular 18 SupaStarter :rocket:
</h1>

<p align="center">
![GitHub stars](https://img.shields.io/github/stars/max-geller/angular-supastarter?style=social)
![GitHub issues](https://img.shields.io/github/issues/max-geller/angular-supastarter)
![GitHub license](https://img.shields.io/github/license/max-geller/angular-supastarter)
</p>
<p align="center">
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-%233ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Angular Material](https://img.shields.io/badge/Angular_Material-%23000000.svg?style=for-the-badge&logo=angular&logoColor=white)
</p>

<p align="center">
A production-ready starter template for building multi-tenant applications with Angular 18 and Supabase.
</p>

<p align="center">
![Demo GIF](path/to/demo.gif)
</p>

Staging Site Status:
[![Netlify Status](https://api.netlify.com/api/v1/badges/733bf693-71a2-4080-99e6-a4742f883749/deploy-status)](https://app.netlify.com/sites/angular-supastarter-staging/deploys)

Production Site Status:
[![Netlify Status](https://api.netlify.com/api/v1/badges/a1317dfb-d375-47ab-8a9c-ab3120fc8b3d/deploy-status)](https://app.netlify.com/sites/angular-supastarter/deploys)

## Description

This project is a multi-tenant starter SaaS application using Angular 18, Material Design. This project is configured to be hosted on Netlify and uses Supabase as the database and authentication provider.

## Purpose

Angular provides a robust framework for building web applications, and Material Design provides a modern and responsive UI component library. This project aims to provide a starting point for building a multi-tenant application with Angular and Supabase by implementing a number of features that are commonly needed in such applications.This project is designed to be a starting point for building a multi-tenant Angular application with Angular and Supabase using the latest technologies and best practices.

## Features

- 🚀 Angular 18
- 🎨 Angular Material 18
- 🗄️ Supabase Integration
- 👥 Multi-tenancy support
- 🔐 Authentication and Authorization
- 🎨 Customizable theming
- 📱 Responsive design

## Quick Start

1. Clone the repository
2. Set up your Supabase project
3. Configure environment variables
4. Run database migrations
5. Start the development server
6. For detailed instructions, see our [Project Wiki](https://github.com/max-geller/angular-supastarter/wiki).

## Stack

| Name             | Description          | Version |
| :--------------- | :------------------- | :-----: |
| Angular CLI      | Framework            | 18.2.5  |
| Angular Material | UI Component Library | 18.2.4  |
| Supabase-js      | Database Management  | 1.192.5 |

## Hosting

This application is configured for hosting on Netlify.
The production build is deployed to the following URL: [https://.netlify.app/](https://.netlify.app/).
A staging build is deployed to the following URL: [Staging](https://angular-18-staging.netlify.app/).

Be sure to set the correct environment variables for production and staging environments in Netlify.

Use the following commands to deploy the application to Netlify:

```bash
   'build command': npm run build
    'publish directory': 'dist/angular-supastarter/browser
```

## Database

This project uses a Postgres SQL database hosted on Supabase.

## Environment Variables

This project uses [ngx-env/builder](https://www.npmjs.com/package/@ngx-env/builder) to manage environment variables.

Be sure to create a '.env' file at the project root, which should be formatted in the following way:

```bash

    NG_APP_SUPABASE_URL=YOUR_URL_STRING
    NG_APP_SUPABASE_KEY=YOUR_API_KEY

```

## Source Control

This project uses [Git](https://git-scm.com/) for source control. The following branching strategy is used:

- `main` - This is the main branch and is the default branch. This branch is deployed to the production environment.
- `development` - This is the development branch. This is where all new features and changes are merged.
- `features` - This is a feature branch. This is where new features are developed.
- `staging` - This is a staging branch. This is where the application is deployed to test new features and changes.
- `hotfix` - This is a hotfix branch. This is where hotfixes are developed.

## Multi-Tenancy

This project uses a shared database and schema for all tenants.

### Tenant Configuration

### User Management

### Roles and Permissions

## Contributing

We welcome contributions! Please see our [Project Wiki](https://github.com/max-geller/angular-supastarter/wiki) for more details.

We use GitHub Projects to organize our work. Here's how you can get involved:

1. Check our [Project Board](<(https://github.com/users/max-geller/projects/40/views/1)>).
2. Look for issues labeled "good first issue" or "help wanted".
3. Comment on an issue you'd like to work on.
4. Fork the repository and create a branch for your work.
5. Submit a pull request when you're ready for review.

Our project board columns:

- **To Do**: Approved tasks that are ready to be worked on.
- **In Progress**: Tasks currently being worked on. Please assign yourself.
- **Review**: Pull requests and tasks ready for review.
- **Done**: Completed and merged tasks.

## Support

If you like this project, please give it a ⭐️ on GitHub!

## Contact

If you have any questions, please contact the project owner at [angular.supastarter@gmail.com](mailto:angular.supastarter@gmail.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
