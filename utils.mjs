'use strict';

import { exec } from 'child_process';

import {
	REPO_TYPES,
	ACTION_TYPES,
	JS_REPO_NAMES,
	PY_REPO_NAMES,
} from './const.mjs';

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

export const getDefaultAction = (argv) => {
	if (argv.s || argv.start) {
		return ACTION_TYPES.start;
	}

	if (argv.k || argv.kill) {
		return ACTION_TYPES.kill;
	}
};

export const getDefaultRepos = (argv) => {
	if ((argv.a || argv.all) && (argv.k || argv.kill)) {
		return [...Object.values(JS_REPO_NAMES), ...Object.values(PY_REPO_NAMES)];
	}

	if ((argv.a || argv.all) && (argv.s || argv.start)) {
		return [...Object.values(JS_REPO_NAMES)];
	}

	const repos = [];

	Object.entries(JS_REPO_NAMES).forEach(([key, value]) => {
		if (argv[key]) {
			repos.push(value);
		}
	});

	Object.entries(PY_REPO_NAMES).forEach(([key, value]) => {
		if (argv[key] && (argv.k || argv.kill)) {
			repos.push(value);
		}
	});

	return repos.length > 0 ? repos : null;
};
