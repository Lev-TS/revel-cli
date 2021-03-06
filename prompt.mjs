'use strict';

import inquirer from 'inquirer';
import yargs from 'yargs';
import _ from 'lodash';

import { ACTION_TYPES, REPO_TYPES } from './const.mjs';
import repoList from './repo-list.mjs';
import { getDefaultAction, getDefaultRepos } from './utils.mjs';

const { argv } = yargs(process.argv);

const getActionPromptChoices = (actionTypes) => [
	new inquirer.Separator(''),
	...actionTypes.map((action) => ({ name: action })),
];

const showActionPrompt = (defaultAction) => (actionPromptChoices) => {
	if (defaultAction) {
		return { action: defaultAction };
	}

	return inquirer.prompt({
		type: 'list',
		name: 'action',
		message: 'What do you want to do?',
		loop: false,
		choices: actionPromptChoices,
		validate: (answer) => {
			if (answer.length < 1) {
				return 'You must choose one action.';
			}

			return true;
		},
	});
};

const getRepoTypes = async (args) => {
	const { action } = await args;
	const repoTypes = {};

	if (action === ACTION_TYPES.start) {
		repoTypes[REPO_TYPES.js] = [];
		repoList.forEach((repo) => {
			if (repo.type === REPO_TYPES.js) {
				repoTypes[REPO_TYPES.js].push(repo.name);
			}
		});
	} else {
		Object.values(REPO_TYPES).forEach((type) => {
			repoTypes[type] = [];
		});
		repoList.forEach((repo) => {
			repoTypes[repo.type].push(repo.name);
		});
	}

	return { action, repoTypes };
};

const getRepoPromptChoices = async (args) => {
	const { action, repoTypes } = await args;
	const repoPromptChoices = [];

	Object.entries(repoTypes).map(([repoType, repos]) => {
		repoPromptChoices.push(
			new inquirer.Separator(` ---- ${repoType} Repos ---- `)
		);
		repos.map((repo) => repoPromptChoices.push({ name: repo }));
	});

	return { action, repoPromptChoices };
};

const getRepoPrompt = async (args) => {
	const { action, repoPromptChoices } = await args;

	const prompt = () =>
		inquirer.prompt({
			type: 'checkbox',
			name: 'repos',
			message: `Which repo(s) would you like to ${action.toLowerCase()}?`,
			loop: false,
			choices: repoPromptChoices,
			validate: (answer) => {
				if (answer.length < 1) {
					return 'You must choose at least one repo';
				}

				return true;
			},
		});

	return { action, prompt };
};

const showRepoPrompt = (defaultRepos) => async (args) => {
	const { action, prompt } = await args;

	if (defaultRepos) {
		return { repos: defaultRepos, action };
	}

	const { repos } = await prompt();

	return { repos, action };
};

const validateAction = async (args) => {
	const { action } = await args;
	let isConfirmed = true;

	if (action === ACTION_TYPES.pull) {
		const { isPull } = await inquirer.prompt({
			type: 'confirm',
			name: 'isPull',
			message:
				'Branch will be set to master and all unstashed changes will be deleted, continue?',
			default: true,
		});

		isConfirmed = isPull;
	}

	return isConfirmed ? args : null;
};

const log = async (args) => {
	if ((await args) === null) {
		const red = '\x1b[31m';
		console.log(red, '\n Aborted! \n');
	} else {
		const { action, repos } = await args;
		const green = '\x1b[32m';
		console.log(
			green,
			`\n ${action}ing the following repo${
				repos.length > 1 ? 's' : ''
			}: ${repos.join(', ')} \n`
		);
	}

	return args;
};

export default _.flowRight(
	log,
	validateAction,
	showRepoPrompt(getDefaultRepos(argv)),
	getRepoPrompt,
	getRepoPromptChoices,
	getRepoTypes,
	showActionPrompt(getDefaultAction(argv)),
	getActionPromptChoices
);
