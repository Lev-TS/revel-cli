const addJsRepos = (repos) =>
	repos.map(({ name, cwd, port, type, scripts }) => ({
		name,
		cwd,
		port,
		type,
		starter: 'js',
		scripts: {
			pull: `cd ${cwd}; gco .; gcm; git pull`,
			install: `cd ${cwd}; npm ci`,
			start: `cd ${cwd}; npm start`,
			concurrentStart: 'npm start',
			kill: `lsof -t -i :${port} | xargs kill -9`,
			...scripts,
		},
	}));

const addPyRepos = (repos) =>
	repos.map(({ name, cwd, port, type, scripts }) => ({
		name,
		cwd,
		port,
		type,
		starter: 'py',
		scripts: {
			pull: `cd ${cwd} gco .; gcm; git pull`,
			kill: `lsof -t -i :${port} | xargs kill -9`,
			...scripts,
		},
	}));

const REPO_TYPES = {
	module: 'Module',
	frontend: 'Frontend',
	backend: 'Backend',
};

export const REPO_NAMES = {
	coordinator: 'Coordinator',
	ooxt: 'OO-XT',
	common: 'Common',
	smartDining: 'SmartDining',
	branding: 'Branding',
	customers: 'Customers',
	pybe: 'PyBe',
	middleware: 'Middleware',
	s3Images: 's3-images',
};

export const ACTION_TYPES = {
	pull: 'Pull',
	install: 'Install',
	start: 'Start',
	kill: 'Kill',
};

export const REPO_LIST = [
	...addJsRepos([
		{
			name: REPO_NAMES.coordinator,
			cwd: '~/Projects/revel/oo-xt-frontend-coordinator',
			port: 3000,
			type: REPO_TYPES.frontend,
		},
		{
			name: REPO_NAMES.ooxt,
			cwd: '~/Projects/revel/frontend',
			port: 3001,
			type: REPO_TYPES.frontend,
		},
		{
			name: REPO_NAMES.smartDining,
			cwd: '~/Projects/revel/oo-xt-smart-dining-module',
			port: 3003,
			type: REPO_TYPES.module,
		},
		{
			name: REPO_NAMES.branding,
			cwd: '~/Projects/revel/frontend-branding',
			port: 3004,
			type: REPO_TYPES.module,
		},
		{
			name: REPO_NAMES.common,
			cwd: '~/Projects/revel/oo-xt-frontend-common',
			port: 3007,
			type: REPO_TYPES.frontend,
		},
		{
			name: REPO_NAMES.customers,
			cwd: '~/Projects/revel/customers',
			port: 7000,
			type: REPO_TYPES.backend,
		},
	]),
	...addPyRepos([
		{
			name: REPO_NAMES.pybe,
			cwd: '~/Projects/revel/Python-backends/revelV2',
			port: 8000,
			type: REPO_TYPES.backend,
			scripts: {
				install: '',
				start:
					'cd ~/Projects/revel/Python-backends/revelV2; conda activate pybe; ./manage.py runserver',
			},
		},
		{
			name: REPO_NAMES.middleware,
			cwd: '~/Projects/revel/middleware',
			port: 8000,
			type: REPO_TYPES.backend,
			scripts: {
				install: 'install:mid',
				start:
					'cd ~/Projects/revel/middleware; source env/bin/activate; ./manage.py runserver',
			},
		},
		{
			name: REPO_NAMES.s3Images,
			cwd: '~/Projects/revel/atlas-s3-image-proxy',
			port: 8000,
			type: REPO_TYPES.backend,
			scripts: {
				install: 'install:s3',
				start: 'start:s3',
			},
		},
	]),
];
