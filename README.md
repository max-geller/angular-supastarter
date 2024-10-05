# Angular 18 Starter

## Description

This project is a multi-tenant starter SaaS application using Angular 18, Material Design. This project is configured to be hosted on Netlify and uses Supabase as the database and authentication provider.

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
    'publish directory': 'dist/angular-starter/browser
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


## Contact

If you have any questions, please contact the project owner at [angular.supastarter@gmail.com](mailto:angular.supastarter@gmail.com).
