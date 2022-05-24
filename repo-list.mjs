import { JS_REPO_NAMES, PY_REPO_NAMES } from './const.mjs';
import { addJsRepos, addPyRepos } from './utils.mjs';

export default [
	...addJsRepos([
		{
			name: JS_REPO_NAMES.coord,
			cwd: '/Users/levan/Projects/revel/oo-xt-frontend-coordinator',
			port: 3000,
			prefixColor: '#949B93',
		},
		{
			name: JS_REPO_NAMES.xt,
			cwd: '/Users/levan/Projects/revel/frontend',
			port: 3001,
			prefixColor: '#967D69',
		},
		{
			name: JS_REPO_NAMES.sd,
			cwd: '/Users/levan/Projects/revel/oo-xt-smart-dining-module',
			port: 3003,
			prefixColor: '#A8D4AD',
		},
		{
			name: JS_REPO_NAMES.brand,
			cwd: '/Users/levan/Projects/revel/frontend-branding',
			port: 3004,
			prefixColor: '#F2F79E',
		},
		{
			name: JS_REPO_NAMES.common,
			cwd: '/Users/levan/Projects/revel/oo-xt-frontend-common',
			port: 3007,
			prefixColor: '#92B9BD',
		},
		{
			name: JS_REPO_NAMES.cs,
			cwd: '/Users/levan/Projects/revel/customers',
			port: 7000,
			prefixColor: '#E8EC67',
		},
	]),
	...addPyRepos([
		{
			name: PY_REPO_NAMES.mid,
			cwd: '/Users/levan/Projects/revel/middleware',
			port: 5000,
		},
		{
			name: PY_REPO_NAMES.pybe,
			cwd: '/Users/levan/Projects/revel/Python-backends/revelV2',
			port: 8000,
		},
		{
			name: PY_REPO_NAMES.s3,
			cwd: '/Users/levan/Projects/revel/atlas-s3-image-proxy',
			port: 8888,
		},
	]),
];
