'use strict';

import { exec } from 'child_process';
import { REPO_TYPES } from './const.mjs';

const _addRepos = (type, start) => (repos) =>
	repos.map(({ scripts, ...rest }) => ({
		type,
		scripts: {
			kill: `lsof -t -i :${rest.port} | xargs kill -9`,
			start,
			...scripts,
		},
		...rest,
	}));

export const execShellCommand = (command, repoName) => {
	exec(command, { shell: '/bin/zsh' }, (error, _, stderr) => {
		if (error) {
			console.log(error.message);
			return;
		}

		if (stderr) {
			console.log(stderr);
			return;
		}

		console.log(`${repoName} killed!`);
	});
};

export const addJsRepos = _addRepos(REPO_TYPES.js, 'npm start');
export const addPyRepos = _addRepos(REPO_TYPES.py);
