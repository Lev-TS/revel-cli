#! /usr/bin/env node

'use strict';

import startJsRepos from './concurrent-starter.mjs';
import prompt from './prompt.mjs';
import { ACTION_TYPES } from './const.mjs';
import { execShellCommand } from './utils.mjs';
import repoList from './repo-list.mjs';

const { action, repos } = await prompt(Object.values(ACTION_TYPES));

if (action === ACTION_TYPES.start) {
	const { result } = startJsRepos(repos);

	result?.then(
		function onSuccess() {
			process.exit();
		},
		function onFailure() {
			process.exit();
		}
	);
}

if (action === ACTION_TYPES.kill) {
	repoList.forEach(({ name, scripts }) => {
		if (repos.includes(name)) {
			execShellCommand(scripts.kill, name);
		}
	});
}
