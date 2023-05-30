# GitHub Pages Deploy

## Note
GitHub deployment is for staging purposes only

## Setup
The repository slug is used in 2 files:
- deploy/ghPagesDeploy.mjs: `NUXT_APP_BASE_URL`
- nuxt.config.ts: `app.baseURL`

## Deploy commands
`yarn run generate`
`yarn run gh-pages-deploy`