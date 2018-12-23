# Personal Budget Tracker web app

## Introduction
Web application to manage personal finances tracking money movements and banking accounts.

## Start server locally
There are 2 apps, a client Vue.js app and Firebase Functions server side app.

 - To run client app: `npm run serve`
 - To run Firebase Functions (from `functions` folder): `npm run serve`
 - To run Firebase Functions Shell: (from `functions` folder): `npm run start`

To see more detailed command list see `package.json` and `functions/package.json`

## Bump versions
Execute `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`. This will change `packgage.json` file version attribute, create new commit with this change and create a git tag pointing to this commit.

## Deploy
Just execute `git push` from master branch and this will trigger a Circle hook to deploy.