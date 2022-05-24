'use strict';
import { exec } from 'child_process';

import startJsRepos from './concurrent-starter.mjs';
import prompt from './prompt.mjs';
import { ACTION_TYPES, REPO_LIST } from './const.mjs';

const { action, repos } = await prompt(Object.values(ACTION_TYPES));

if (action === ACTION_TYPES.start) {
	// const { result: jsRepoStartResult } = startJsRepos(repos);
	// const pyRepoStartResult = startPyRepos(repos);

	// jsRepoStartResult === null
	// 	? null
	// : result.then(
	// 		function onSuccess() {
	// 			process.exit();
	// 		},
	// 		function onFailure() {
	// 			process.exit();
	// 		}
	//   );
	const { result } = startJsRepos(repos);

	result === null
		? null
		: result.then(
				function onSuccess() {
					process.exit();
				},
				function onFailure() {
					process.exit();
				}
		  );
}

// function startPyRepos(repos) {
// 	let result = 'ok';

// 	REPO_LIST.forEach((repo) => {
// 		if (repos.includes(repo.name)) {
// 			execShallCommand(repo.scripts.start);
// 		} else {
// 			result = null;
// 		}
// 	});

// 	return result;
// }

// function execShallCommand(command) {
// 	exec(command, { shell: '/bin/zsh' }, (error, stdout, stderr) => {
// 		if (error) {
// 			console.log(`error: ${error.message}`);
// 			return;
// 		}
// 		if (stderr) {
// 			console.log(`stderr: ${stderr}`);
// 			return;
// 		}
// 		console.log(`stdout: ${stdout}`);
// 	});
// }
