# SUMMARY

This is a CLI to `start` or `kill` Revel projects.

- `start` switch works only for JS projects. It will start all the selected repos concurrently and print all the logs in a single tab.
- `kill` switch works with both JS and PY repos.

You can do these operation on a single or multiple projects at once.

## Configuration

In the `repo-list.mjs` add JavaScript and Python repos.

- Make sure to assign a full path to your local repo under `cwd`.
- Check that the correct ports are assigned.
- The default start script for each JS repo is `npm start`, but you can override it like so:

  ```js

  ...addJsRepos([
  	{
  		name: JS_REPO_NAMES.coord,
  		cwd: '/Users/levan/Projects/revel/oo-xt-frontend-coordinator',
  		port: 3000,
  		prefixColor: '#949B93',
          script: {
              start: "nvm start"
          }
  	}])

  ```

- If you are adding/removing a repo, make sure to keep `JS_REPO_NAMES` and `PY_REPO_NAMES` constants in `const.js` up to date.

## Install

- cd to the root dir and run `npm ci && npm install -g`

## Uninstall

- run `npm uninstall -g revel`

# Usage

There are several ways to use the cli:

### Select the action and repos

Run `revel` in your terminal and select the action and repos following the provided instructions.

### Pass the action and select repos

- Run `revel --start` or `revel -s` and select repos you'd like to start
- Run `revel --kill` or `revel -k` and select repos you'd like to kill

### Pass the action and repos

By default, you can pass any of the following `args` to the start/kill commands

- Run `revel -s --brand --common --coord --cs --xt --sd`
- Run `revel -k --brand --common --coord --cs --xt --sd --mid --pybe --s3`

Args correspond to the keys in the constants (`JS_REPO_NAMES` and `PY_REPO_NAMES`) inside the `const.mjs` file. Start command takes only keys of the `JS_REPO_NAMES` constant.

### Start/Kill All

- Run `revel --start --all` or `revel -sa`
- Run `revel --kill --all` or `revel -ka`
