'use strict';

import concurrently from 'concurrently';
import path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import { REPO_NAMES } from './const.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathTo = (project) => path.resolve(__dirname, '..', project);

const configureRepo = (repo) => {
	if (repo === REPO_NAMES.ooxt) {
		return {
			command: 'npm start',
			name: repo,
			prefixColor: '#967D69',
			cwd: getPathTo('frontend'),
		};
	}
	if (repo === REPO_NAMES.coordinator) {
		return {
			command: 'npm start',
			name: repo,
			prefixColor: '#949B93',
			cwd: getPathTo('oo-xt-frontend-coordinator'),
		};
	}
	if (repo === REPO_NAMES.common) {
		return {
			command: 'npm start',
			name: repo,
			prefixColor: '#92B9BD',
			cwd: getPathTo('oo-xt-frontend-common'),
		};
	}
	if (repo === REPO_NAMES.smartDining) {
		return {
			command: 'npm start',
			name: repo,
			prefixColor: '#A8D4AD',
			cwd: getPathTo('oo-xt-smart-dining-module'),
		};
	}
	if (repo === REPO_NAMES.branding) {
		return {
			command: 'npm start',
			name: repo,
			prefixColor: '#F2F79E',
			cwd: getPathTo('frontend-branding'),
		};
	}
	if (repo === REPO_NAMES.customers) {
		return {
			command: 'npm start',
			name: repo,
			prefixColor: '#E8EC67',
			cwd: getPathTo('customers'),
		};
	}
};

const getConfig = (repos) =>
	repos.map((repo) => configureRepo(repo)).filter((repo) => repo !== undefined);

const startJsRepos = (config) =>
	config.length >= 1
		? concurrently(config, {
				killOthers: ['failure', 'success'],
				restartTries: 3,
		  })
		: { result: null, command: null };

export default _.flowRight(startJsRepos, getConfig);
