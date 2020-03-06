## Make sure you download Heroku CLI installer

- then run `heroku login`

## Heroku -> Settings -> env variables

- PORT (or do from the command line with heroku config:set PORT=8000)
- PORTSEC
- JAWSDB_URL (use command line to populate this automatically)

## server.js:

- process.env.PORT
- process.env.PORTSEQ

## index.js:

`sequelize = new Sequelize(process.env.JAWSDB_URL, {})`

## To get jawsbd_url:

- input credit card details
- `heroku login`
- `heroku addons:create jawsdb --app name-of-your-app`
- check in the GUI settings that the variable is there

## Useful:

`heroku config --app name-of-your-app`

`heroku addons --all --app name-of-your-app`

`heroku apps:info --app name-of-your-app`

`heroku logs --tail --app name-of-your-app // Run this all the time in a separate terminal`


## Typical contents of {process.env}:

- PORTSOCKET: '4000',
- NODE_ENV: 'production',
- PATH: '/app/.heroku/node/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/app/node_modules/.bin:/app/.heroku/node/bin:/app/.heroku/yarn/bin:/usr/local/bin:/usr/bin:/bin:/app/bin:/app/node_modules/.bin',
- NODE: '/app/.heroku/node/bin/node',
- NODE_HOME: '/app/.heroku/node',
- INIT_CWD: '/app'
- PWD: '/app',
- DYNO: 'web.1',
- npm_package_name: 'group_project_2',
- npm_package_repository_type: 'git',
- npm_config_audit_level: 'low',
- npm_config_prefer_offline: '',
- npm_package_main: 'server.js',
- npm_package_contributors_0_name: 'Jasper',
- npm_lifecycle_script: 'node server.js',
- npm_package_scripts_test: 'echo "Error: no test specified" && exit 1',
- npm_package_contributors_1_name: 'Rita',
- npm_package_version: '1.0.0',
- npm_package_repository_url: 'git+https://github.com/riezen/project2test.git',
- npm_package_contributors_2_name: 'Gerald',
- npm_lifecycle_event: 'start',
- npm_package_contributors_3_name: 'Stewart',
- npm_config_argv: '{"remain":[],"cooked":["start"],"original":["start"]}',
- npm_config_node_version: '12.12.0',
- npm_package_license: 'ISC',
- npm_config_globalconfig: '/app/.heroku/node/etc/npmrc',
- npm_config_init_module: '/app/.npm-init.js',
- npm_config_globalignorefile: '/app/.heroku/node/etc/npmignore',
- npm_execpath: '/app/.heroku/node/lib/node_modules/npm/bin/npm-cli.js',
- npm_package_author_name: 'Sydney Bootcamp Feb 2020',