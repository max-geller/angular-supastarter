# Version Control & Release Automation

This project uses [Semantic Versioning](https://semver.org/) to manage versioning.

## Versioning

Semantic Versioning is a three-number versioning scheme. The version number is broken into three parts: major, minor, and patch. The major version number is incremented when incompatible API changes are made, the minor version number is incremented when new functionality is added in a backwards-compatible manner, and the patch version number is incremented when backwards-compatible bug fixes are made.

## Release Automation

This project has added a script to the `package.json` file to automate the release process. The script is `npm run release`. This script will bump the version number, create a new changelog, and push the changes to the repository. Additionally, the script will create a new GitHub release with the new version number.

Be sure to modify the build command in Netlify to match the build command in the `package.json` file. For example:

```bash
npm run release && ng build --configuration=staging
```

Add the following environment variable to the Netlify project:

```bash
GH_TOKEN: A GitHub personal access token with repo scope
NPM_TOKEN: Your npm token (if you're publishing to npm)

```

## Sequence of Events

1. Make changes in a feature branch
2. Create a pull request with a conventional commit message
3. Merge the pull request to main
4. Netlify will automatically trigger a build, which will:
5. Run semantic-release to determine the new version
6. Update package.json and create/update CHANGELOG.md
7. Create a new GitHub release and tag
8. Build your Angular application
9. Deploy to Netlify

## Branching Strategy
