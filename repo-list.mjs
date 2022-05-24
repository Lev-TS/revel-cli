import { REPO_NAMES } from './const.mjs';
import { addJsRepos, addPyRepos } from './utils.mjs';

export default [
	...addJsRepos([
		{
			name: REPO_NAMES.coordinator,
			cwd: '/Users/levan/Projects/revel/oo-xt-frontend-coordinator',
			port: 3000,
			prefixColor: '#949B93',
		},
		{
			name: REPO_NAMES.ooxt,
			cwd: '/Users/levan/Projects/revel/frontend',
			port: 3001,
			prefixColor: '#967D69',
		},
		{
			name: REPO_NAMES.smartDining,
			cwd: '/Users/levan/Projects/revel/oo-xt-smart-dining-module',
			port: 3003,
			prefixColor: '#A8D4AD',
		},
		{
			name: REPO_NAMES.branding,
			cwd: '/Users/levan/Projects/revel/frontend-branding',
			port: 3004,
			prefixColor: '#F2F79E',
		},
		{
			name: REPO_NAMES.common,
			cwd: '/Users/levan/Projects/revel/oo-xt-frontend-common',
			port: 3007,
			prefixColor: '#92B9BD',
		},
		{
			name: REPO_NAMES.customers,
			cwd: '/Users/levan/Projects/revel/customers',
			port: 7000,
			prefixColor: '#E8EC67',
		},
	]),
	...addPyRepos([
		{
			name: REPO_NAMES.middleware,
			cwd: '/Users/levan/Projects/revel/middleware',
			port: 5000,
		},
		{
			name: REPO_NAMES.pybe,
			cwd: '/Users/levan/Projects/revel/Python-backends/revelV2',
			port: 8000,
		},
		{
			name: REPO_NAMES.s3Images,
			cwd: '/Users/levan/Projects/revel/atlas-s3-image-proxy',
			port: 8888,
		},
	]),
];
