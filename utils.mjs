'use strict';

import { exec } from 'child_process';
import { REPO_TYPES } from './const.mjs';

const _addRepos = (type, start) => (repos) =>
	repos.map(({ name, cwd, port, scripts }) => ({
		name,
		cwd,
		port,
		type,
		scripts: {
			kill: `lsof -t -i :${port} | xargs kill -9`,
			start,
			...scripts,
		},
	}));

export const execShellCommand = (command, repoName) => {
	exec(command, { shell: '/bin/zsh' }, (error, stdout, stderr) => {
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
