import { REPO_NAMES } from './const.mjs';
import { addJsRepos, addPyRepos } from './utils.mjs';

export default [
	...addJsRepos([
		{
			name: REPO_NAMES.coordinator,
			cwd: '~/Projects/revel/oo-xt-frontend-coordinator',
			port: 3000,
		},
		{
			name: REPO_NAMES.ooxt,
			cwd: '~/Projects/revel/frontend',
			port: 3001,
		},
		{
			name: REPO_NAMES.smartDining,
			cwd: '~/Projects/revel/oo-xt-smart-dining-module',
			port: 3003,
		},
		{
			name: REPO_NAMES.branding,
			cwd: '~/Projects/revel/frontend-branding',
			port: 3004,
		},
		{
			name: REPO_NAMES.common,
			cwd: '~/Projects/revel/oo-xt-frontend-common',
			port: 3007,
		},
		{
			name: REPO_NAMES.customers,
			cwd: '~/Projects/revel/customers',
			port: 7000,
		},
	]),
	...addPyRepos([
		{
			name: REPO_NAMES.middleware,
			cwd: '~/Projects/revel/middleware',
			port: 5000,
		},
		{
			name: REPO_NAMES.pybe,
			cwd: '~/Projects/revel/Python-backends/revelV2',
			port: 8000,
		},
		{
			name: REPO_NAMES.s3Images,
			cwd: '~/Projects/revel/atlas-s3-image-proxy',
			port: 8888,
		},
	]),
];
