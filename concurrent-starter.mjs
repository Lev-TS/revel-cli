'use strict';

import concurrently from 'concurrently';
import _ from 'lodash';
import repoList from './repo-list.mjs';

const getConfig = (repos) => {
	const config = [];

	repoList.forEach(({ name, scripts, cwd, prefixColor }) => {
		if (repos.includes(name)) {
			config.push({
				command: scripts.start,
				name,
				cwd,
				prefixColor,
			});
		}
	});

	return config;
};

const startJsRepos = (config) =>
	config.length >= 1
		? concurrently(config, {
				killOthers: ['failure', 'success'],
				restartTries: 3,
		  })
		: { result: null, command: null };

export default _.flowRight(startJsRepos, getConfig);
