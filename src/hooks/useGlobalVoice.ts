import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../store';
import { getFilteredCandidates, getLocationForCandidates } from '../store/slices/Candiates.slice';

type RouteKey =
	| 'home'
	| 'taskBoard'
	| 'profile'
	| 'clients'
	| 'reports'
	| 'aiInterview'
	| 'settings'
	| 'candidates'
	| 'jobs'
	| 'jobCreate'
	| 'assistant'
	| 'candidateTest'
	| 'integrations'
	| 'manageTeam'
	| 'navBack'
	| 'navForward'
	| 'reload';

const normalize = (s: string) =>
	s
		.toLowerCase()
		.replace(/[\u2010-\u2015]/g, '-')
		.replace(/[^\p{L}\p{N}\s\-–+.,/@]/gu, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const uniq = <T>(xs: T[]) => Array.from(new Set(xs));

const PAGE_WORDS = [
	'page',
	'pages',
	'screen',
	'screens',
	'section',
	'sections',
	'view',
	'views',
	'panel',
	'panels',
	'tab',
	'tabs',
	'area',
	'areas',
];
const PRONOUNS = ['this', 'that', 'the', 'my'];
const FILLERS_PREFIX = [
	'please',
	'kindly',
	'can you',
	'could you',
	'will you',
	'would you',
	'hey',
	'ok',
	'okay',
	'alright',
];
const FILLERS_SUFFIX = [
	'please',
	'now',
	'thanks',
	'thank you',
	'right now',
	'for me',
	'for now',
	'if you can',
];

const VERBS = [
	'go',
	'go to',
	'navigate',
	'navigate to',
	'open',
	'show',
	'launch',
	'access',
	'display',
	'view',
	'visit',
	'enter',
	'load',
	'take me',
	'bring up',
	'head to',
	'jump to',
	'switch to',
	'move to',
	'get me to',
	'route to',
	'lead me to',
	'switch',
	'take me to',
	'bring me to',
	'open up',
	'pull up',
	'pop open',
];

const PREPS = ['based in', 'located in', 'in', 'from', 'at', 'near'];
const STOP =
	/\b(with|for|and|that|who|having|of|on|as|to|remote|hybrid|onsite|experience|exp|years?|months?|\d+)\b/i;

const tidy = (s: string) =>
	s
		.replace(/[.,;:!?]+$/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const EXPAND_SING_PLUR = (xs: string[]) => {
	const out: string[] = [];
	xs.forEach((x) => {
		const w = x.trim();
		out.push(w);
		const parts = w.split(' ');
		const last = parts.pop()!;
		const plural =
			last.endsWith('y') && !/[aeiou]y$/.test(last)
				? last.slice(0, -1) + 'ies'
				: last.endsWith('s')
					? last
					: last + 's';
		out.push([...parts, plural].join(' ').trim());
	});
	return uniq(out);
};

const withArticles = (xs: string[]) => {
	const base = EXPAND_SING_PLUR(xs);
	return uniq([
		...base,
		...base.flatMap((x) => [`the ${x}`, `my ${x}`]),
		...base.flatMap((x) => [`${x} page`, `the ${x} page`, `${x} pages`, `the ${x} pages`]),
	]);
};

const VERB_RE = new RegExp(
	`\\b(?:${VERBS.map((v) => v.replace(/\s+/g, '\\s+')).join('|')})\\b`,
	'i',
);
const SPECIAL_BACK_RE = /\b(back|previous|prev|go back|step back|navigate back)\b/i;
const SPECIAL_FORWARD_RE = /\b(forward|next|go forward|step forward|navigate forward)\b/i;
const SPECIAL_RELOAD_RE = /\b(reload|refresh|reload page|refresh page|hard\s+refresh)\b/i;

const alias: Record<RouteKey, string[]> = {
	home: withArticles(['home', 'dashboard', 'main', 'start', 'landing']),
	taskBoard: withArticles(['task board', 'kanban', 'tasks board']),
	profile: withArticles(['profile', 'account', 'my account']),
	clients: withArticles([
		'client',
		'client list',
		'client directory',
		'client management',
		'client overview',
	]),
	reports: withArticles([
		'report and analytics',
		'reports and analytics',
		'report',
		'analytics',
		'insight',
		'metric',
		'statistic',
	]),
	aiInterview: withArticles([
		'ai interview',
		'virtual interview',
		'interview with ai',
		'talk to ai',
	]),
	settings: withArticles([
		'setting',
		'configuration',
		'preference',
		'system setting',
		'account setting',
	]),
	candidates: withArticles(['candidate', 'candidate list', 'candidate directory']),
	jobs: withArticles(['job', 'job list', 'job board', 'job opening', 'available job']),
	jobCreate: withArticles(['create job', 'new job', 'job creation', 'post a job', 'job posting']),
	assistant: withArticles(['koalabyte assistant', 'assistant']),
	candidateTest: withArticles(['test for candidate', 'candidate test', 'the test']),
	integrations: withArticles(['integration', 'integration setting', 'connect integration']),
	manageTeam: withArticles(['manage team', 'team management', 'team setting', 'team']),
	navBack: [
		'previous page',
		'go back',
		'navigate back',
		'back',
		'step back',
		'one step back',
		'prior page',
	],
	navForward: [
		'next page',
		'go forward',
		'navigate forward',
		'forward',
		'step forward',
		'one step forward',
	],
	reload: ['reload', 'refresh', 'refresh page', 'reload page'],
};

const routes: Record<RouteKey, string> = {
	home: '/dashboard',
	taskBoard: '/dashboard/task-board',
	profile: '/dashboard/settings',
	clients: '/dashboard/clients',
	reports: '/dashboard/report-and-analytics',
	aiInterview: '/dashboard/ai-interview',
	settings: '/dashboard/setting',
	candidates: '/dashboard/candidates',
	jobs: '/dashboard/jobs',
	jobCreate: '/dashboard/jobs/create-job',
	assistant: '/dashboard/koalabyte-assistant',
	candidateTest: '/dashboard/test-for-cadidate',
	integrations: '/dashboard/integrations',
	manageTeam: '/dashboard/manage-team',
	navBack: '__back__',
	navForward: '__forward__',
	reload: '__reload__',
};

const buildVerbPart = () =>
	`(?:${[...VERBS, ...VERBS.map((v) => v + ' the'), ...VERBS.map((v) => v + ' my')]
		.map((v) => v.replace(/\s+/g, '\\s+'))
		.join('|')})`;
const buildPageWordPart = () => `(?:\\s+(?:${PAGE_WORDS.join('|')}))?`;
const buildPronounPart = () => `(?:\\s+(?:${PRONOUNS.join('|')}))?`;
const buildFillersPrefix = () =>
	`(?:${FILLERS_PREFIX.map((f) => f.replace(/\s+/g, '\\s+')).join('|')}\\s+)?`;
const buildFillersSuffix = () =>
	`(?:\\s+(?:${FILLERS_SUFFIX.map((f) => f.replace(/\s+/g, '\\s+'))}))?`;

const INTENT_RE = new RegExp(
	buildFillersPrefix() +
		buildVerbPart() +
		'(?:\\s+(?:to|into|onto|over\\s+to|back\\s+to))?' +
		buildPronounPart() +
		'\\s+(?<target>[\\p{L}\\p{N}\\-\\s]{1,64})' +
		buildPageWordPart() +
		buildFillersSuffix(),
	'iu',
);

const tokenScore = (a: string, b: string) => {
	const A = new Set(a.split(' ').filter(Boolean));
	const B = new Set(b.split(' ').filter(Boolean));
	let inter = 0;
	A.forEach((t) => {
		if (B.has(t)) inter++;
	});
	const denom = Math.max(A.size, B.size);
	return denom ? inter / denom : 0;
};
const extractLocation = (raw: string) => {
	const text = ` ${raw} `;
	const out: string[] = [];
	const preps = PREPS.map((p) => p.replace(/\s+/g, '\\s+')).join('|');
	const rxPrep = new RegExp(`\\b(?:${preps})\\b\\s+([A-Za-z][A-Za-z.&\\-\\s]{0,60})`, 'gi');
	let m: RegExpExecArray | null;

	while ((m = rxPrep.exec(text))) {
		const chunk = tidy(
			m[1]
				.split(/\s+/)
				.reduce<string[]>((acc, w) => {
					if (STOP.test(w)) return acc;
					acc.push(w);
					return acc;
				}, [])
				.join(' '),
		);
		if (chunk) out.push(chunk);
	}

	const rxAt = /@([A-Za-z][A-Za-z.&\-\s]{1,60})/g;
	while ((m = rxAt.exec(text))) {
		const c = tidy(m[1]);
		if (c) out.push(c);
	}

	const rxCaps = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})\b/g;
	while ((m = rxCaps.exec(text))) {
		const c = tidy(m[1]);
		if (c) out.push(c);
	}

	return Array.from(new Set(out)).filter((x) => x && !/^remote$/i.test(x));
};

const HIRING_VERBS = [
	'find',
	'get',
	'search',
	'show',
	'lookup',
	'look up',
	'fetch',
	'source',
	'sourcing',
	'recruit',
	'hire',
	'hiring',
	'shortlist',
	'short-list',
	'screen',
	'screening',
	'need',
	'looking for',
	'seek',
	'seeking',
	'want',
	'require',
	'required',
	'fill',
	'filling',
	'filter',
	'filter by',
	'apply filter',
	'apply filters',
];
const HIRING_NOUNS = [
	'candidate',
	'candidates',
	'profile',
	'profiles',
	'talent',
	'role',
	'roles',
	'position',
	'positions',
	'opening',
	'openings',
	'vacancy',
	'vacancies',
	'job',
	'jobs',
	'pipeline',
	'bench',
];
const CANDIDATE_SIDE = [
	'i am',
	'i m',
	'i’m',
	'im',
	'my resume',
	'my cv',
	'cv attached',
	'resume attached',
	'i have',
	'i possess',
	'my experience',
	'my skills',
	'i worked',
	'i am available',
	'open to work',
	'opentowork',
	'actively looking',
	'looking for job',
	'need a job',
	'apply now',
	'apply here',
	'how to apply',
	'application form',
	'salary expectation',
	'stipend',
	'internship application',
	'learn',
	'course',
	'tutorial',
	'bootcamp',
	'syllabus',
];
const SENIORITY_WORDS = [
	'entry',
	'entry level',
	'junior',
	'jr',
	'mid',
	'middle',
	'senior',
	'sr',
	'lead',
	'principal',
	'head',
];
const CORE_TITLES = [
	'developer',
	'developers',
	'engineer',
	'engineers',
	'programmer',
	'specialist',
	'expert',
	'architect',
	'scientist',
	'consultant',
	'analyst',
	'administrator',
	'admin',
	'tester',
	'designer',
	'manager',
	'researcher',
	'support',
	'technician',
];
const ROLE_ALIASES = [
	'fe',
	'be',
	'fs',
	'frontend',
	'front end',
	'backend',
	'back end',
	'fullstack',
	'full stack',
	'mobile',
	'android',
	'ios',
	'flutter',
	'react native',
	'rn',
	'devops',
	'sre',
	'platform',
	'site reliability',
	'cloud',
	'infra',
	'infrastructure',
	'security',
	'secops',
	'data',
	'ml',
	'ai',
	'nlp',
	'cv',
	'data science',
	'data scientist',
	'data engineer',
	'analytics',
	'qa',
	'qe',
	'sdet',
	'automation',
	'manual',
	'product manager',
	'pm',
	'project manager',
	'scrum master',
	'ba',
	'business analyst',
	'ui',
	'ux',
	'ui ux',
	'ui/ux',
];
const TECH_TOKENS = [
	'javascript',
	'typescript',
	'node',
	'nodejs',
	'deno',
	'python',
	'java',
	'kotlin',
	'swift',
	'objective c',
	'objc',
	'c',
	'c\\+\\+',
	'cpp',
	'csharp',
	'c#',
	'dotnet',
	'\\.net',
	'go',
	'golang',
	'rust',
	'ruby',
	'php',
	'react',
	'reactjs',
	'next',
	'nextjs',
	'redux',
	'angular',
	'angularjs',
	'vue',
	'nuxt',
	'svelte',
	'sveltekit',
	'express',
	'nest',
	'nestjs',
	'spring',
	'spring boot',
	'django',
	'flask',
	'fastapi',
	'rails',
	'laravel',
	'symfony',
	'android',
	'jetpack',
	'compose',
	'ios',
	'uikit',
	'swiftui',
	'react native',
	'jest',
	'cypress',
	'playwright',
	'selenium',
	'appium',
	'docker',
	'kubernetes',
	'k8s',
	'terraform',
	'ansible',
	'helm',
	'aws',
	'azure',
	'gcp',
	'cloud formation',
	'cloudformation',
	'serverless',
	'sql',
	'nosql',
	'mysql',
	'postgres',
	'postgresql',
	'mariadb',
	'sqlite',
	'oracle',
	'mssql',
	'mongodb',
	'redis',
	'elasticsearch',
	'hadoop',
	'spark',
	'kafka',
	'dbt',
	'airflow',
	'git',
	'github',
	'gitlab',
	'bitbucket',
	'jira',
	'mern',
	'mean',
	'lamp',
];

const anyWord = (arr: string[]) => new RegExp(`\\b(${arr.join('|')})\\b`, 'i');
const hasHiringIntent = (text: string) => {
	const verb = anyWord(HIRING_VERBS);
	const noun = anyWord(HIRING_NOUNS);
	const structure =
		/\b(for|to)\s+(a|an)?\s*(.+?\b(developer|engineer|qa|sdet|designer|manager|analyst|architect)\b)/i;
	const expCue =
		/\b(\d+\+?\s*(y|yr|yrs|yoe|year|years|m|mo|mos|month|months)|at least \d+|minimum \d+|min \d+|up to \d+)\b/i;
	return verb.test(text) || noun.test(text) || structure.test(text) || expCue.test(text);
};
const hasCandidateAntiIntent = (text: string) => {
	const anti = anyWord(CANDIDATE_SIDE);
	if (/^(i|i'm|im|i am|my)\b/i.test(text)) return true;
	return anti.test(text);
};

const wordsToNumber: Record<string, number> = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	ten: 10,
	eleven: 11,
	twelve: 12,
	thirteen: 13,
	fourteen: 14,
	fifteen: 15,
	sixteen: 16,
	seventeen: 17,
	eighteen: 18,
	nineteen: 19,
	twenty: 20,
};
const toNum = (t: string) => (/^\d+$/.test(t) ? parseInt(t, 10) : wordsToNumber[t] ?? NaN);

type Tenure = { min: number; max: number; unit: 'years' | 'months' };

const extractSkills = (text: string): string[] | undefined => {
	const rx = new RegExp(`\\b(${TECH_TOKENS.join('|')})\\b`, 'gi');
	const set = new Set<string>();
	let m: RegExpExecArray | null;
	while ((m = rx.exec(text))) set.add(m[1].toLowerCase());
	if (set.has('mern')) {
		set.add('mongodb');
		set.add('express');
		set.add('react');
		set.add('node');
	}
	if (set.has('mean')) {
		set.add('mongodb');
		set.add('express');
		set.add('angular');
		set.add('node');
	}
	if (set.has('lamp')) {
		set.add('linux');
		set.add('apache');
		set.add('mysql');
		set.add('php');
	}
	const out = Array.from(set);
	return out.length ? out : undefined;
};

const extractTenure = (raw: string): Tenure | undefined => {
	let text = raw
		.replace(/\byoe\b/gi, ' years ')
		.replace(/\byr(s)?\b/gi, ' years ')
		.replace(/\by\b/gi, ' years ')
		.replace(/\bmo(s)?\b/gi, ' months ')
		.replace(/\bm\b/gi, ' months ')
		.replace(/\+\s*years?/gi, '+ years');

	let m = text.match(
		/(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+)\s*(?:to|-|–)\s*(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+)\s*(years?|months?)/i,
	);
	if (m) {
		const a = toNum(m[1]),
			b = toNum(m[2]);
		const unit = m[3].toLowerCase().startsWith('year') ? 'years' : 'months';
		if (!isNaN(a) && !isNaN(b)) return { min: Math.min(a, b), max: Math.max(a, b), unit };
	}

	m = text.match(
		/(?:>=|=>|at least|min(?:imum)?|min\.?)\s*(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+)\s*(years?|months?)/i,
	);
	if (m) {
		const n = toNum(m[1]);
		const unit = m[2].toLowerCase().startsWith('year') ? 'years' : 'months';
		if (!isNaN(n)) return { min: n, max: n, unit };
	}

	m = text.match(
		/(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+)\+\s*(years?|months?)/i,
	);
	if (m) {
		const n = toNum(m[1]);
		const unit = m[2].toLowerCase().startsWith('year') ? 'years' : 'months';
		if (!isNaN(n)) return { min: n, max: n, unit };
	}

	m = text.match(
		/(?:up to|<=|=<|under|less than)\s*(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+)\s*(years?|months?)/i,
	);
	if (m) {
		const n = toNum(m[1]);
		const unit = m[2].toLowerCase().startsWith('year') ? 'years' : 'months';
		if (!isNaN(n)) return { min: 0, max: n, unit };
	}

	m = text.match(/(\d+)\s*(years?|year|months?|month)/i);
	if (m) {
		const n = parseInt(m[1], 10);
		const unit = m[2].toLowerCase().startsWith('year') ? 'years' : 'months';
		if (!isNaN(n)) return { min: n, max: n, unit };
	}

	m = text.match(/(\d+)\s*(y|yr|yrs)/i);
	if (m) {
		const n = parseInt(m[1], 10);
		if (!isNaN(n)) return { min: n, max: n, unit: 'years' };
	}

	m = text.match(/(\d+)\s*(mo|mos|m)/i);
	if (m) {
		const n = parseInt(m[1], 10);
		if (!isNaN(n)) return { min: n, max: n, unit: 'months' };
	}

	if (/\b(fresh|fresher|entry[-\s]?level|graduate)\b/i.test(text))
		return { min: 0, max: 0, unit: 'years' };
};

const extractTitle = (raw: string): string | undefined => {
	const senior = `(?:${SENIORITY_WORDS.join('|')})`;
	const roles = `(?:${ROLE_ALIASES.join('|')})`;
	const core = `(?:${CORE_TITLES.join('|')})`;
	const tech = `(?:${TECH_TOKENS.join('|')})`;
	const part = `(?:${senior}|${roles}|${core}|${tech})`;
	const rx = new RegExp(`\\b(${part}(?:\\s+${part}){0,5})\\b`, 'i');
	const m = raw.match(rx);
	if (!m) return;
	let title = m[1]
		.replace(
			/\b(of|with|get|find|search|show|lookup|look up|fetch|source|sourcing|recruit|hire|hiring|candidates?|profiles?|jobs?|role|roles|position|positions|opening|openings|vacancy|vacancies|for|to|and|or)\b/gi,
			' ',
		)
		.replace(/\s+/g, ' ')
		.trim();
	title = title
		.replace(/\bfront\s*end\b/gi, 'frontend')
		.replace(/\bback\s*end\b/gi, 'backend')
		.replace(/\bfull\s*stack\b/gi, 'full stack');
	if (!new RegExp(`\\b(${CORE_TITLES.join('|')}|${ROLE_ALIASES.join('|')})\\b`, 'i').test(title))
		return;
	return title.toLowerCase();
};

type Extracted = {
	intent: boolean;
	title?: string;
	tenure?: Tenure;
	locations?: string[];
	skills?: string[];
};

const extractHiringFilters = (raw: string): Extracted | null => {
	// Keep original guards
	const text = normalize(raw);
	if (!hasHiringIntent(text)) return null;
	if (hasCandidateAntiIntent(text)) return null;

	// Reuse existing extractors
	const tenure = extractTenure(raw);
	const baseSkills = new Set<string>(extractSkills(raw) ?? []);
	let title = extractTitle(raw);

	// --- EXTRA COVERAGE: broader roles & skills beyond software ---

	// 1) Non-tech function words (common business disciplines)
	const NON_TECH_FUNCTIONS = [
		'marketing',
		'growth',
		'digital',
		'performance',
		'brand',
		'content',
		'copy',
		'seo',
		'sem',
		'ppc',
		'advertising',
		'ads',
		'social media',
		'influencer',
		'community',
		'sales',
		'business development',
		'bd',
		'account',
		'account executive',
		'ae',
		'account manager',
		'customer',
		'customer success',
		'cs',
		'support',
		'call center',
		'finance',
		'financial',
		'accounting',
		'accounts',
		'bookkeeper',
		'bookkeeping',
		'accounts payable',
		'ap',
		'accounts receivable',
		'ar',
		'payroll',
		'treasury',
		'audit',
		'auditor',
		'operations',
		'ops',
		'procurement',
		'purchasing',
		'supply chain',
		'logistics',
		'warehouse',
		'inventory',
		'human resources',
		'hr',
		'recruiter',
		'recruitment',
		'talent acquisition',
		'ta',
		'people',
		'people ops',
		'legal',
		'counsel',
		'paralegal',
		'compliance',
		'policy',
		'design',
		'graphic',
		'visual',
		'motion',
		'illustration',
		'videographer',
		'video editor',
		'copywriter',
		'writer',
		'editor',
		'product owner',
		'po',
		'product',
		'product operations',
		'prod ops',
		'project',
		'program',
		'delivery',
		'scrum',
		'agile',
		'data entry',
		'admin',
		'office',
		'executive assistant',
		'ea',
		'assistant',
		'coordinator',
		'specialist',
		'trainer',
		'training',
		'l&d',
		'learning',
		'education',
		'quality',
		'qa',
		'qc',
		'assurance',
		'control',
	];

	// 2) Certifications / tools / platforms (non-tech heavy)
	const NON_TECH_TOKENS = [
		// Marketing/Growth
		'google ads',
		'facebook ads',
		'meta ads',
		'tiktok ads',
		'linkedin ads',
		'mailchimp',
		'klaviyo',
		'marketo',
		'hubspot',
		'salesforce marketing cloud',
		'ahrefs',
		'semrush',
		'moz',
		'ga4',
		'google analytics',
		// Sales/CRM
		'salesforce',
		'hubspot crm',
		'pipedrive',
		'zoho crm',
		'outreach',
		'salesloft',
		'gong',
		// Finance/ERP
		'quickbooks',
		'xero',
		'sap',
		'oracle erp',
		'netsuite',
		'sage',
		'tally',
		// HR/ATS
		'workday',
		'bamboohr',
		'greythr',
		'greeenhouse',
		'lever',
		'smartrecruiters',
		'ashby',
		'successfactors',
		// Design/Creative
		'figma',
		'adobe xd',
		'illustrator',
		'photoshop',
		'indesign',
		'premiere pro',
		'after effects',
		'canva',
		// Ops/Supply Chain
		'sap mm',
		'sap sd',
		'sap fi',
		'sap co',
		'wms',
		'tms',
		// Certifications
		'pmp',
		'prince2',
		'scrum master',
		'csm',
		'psm',
		'six sigma',
		'lean six sigma',
		'itil',
		'cfa',
		'acca',
		'cpa',
		'ca',
		'cia',
		'cma',
		'cambridge',
		'celta',
		'tesol',
	];

	// 3) Broadened core titles (kept compact to avoid conflicts)
	const BROAD_TITLES = [
		'manager',
		'lead',
		'head',
		'director',
		'vp',
		'chief',
		'officer',
		'coordinator',
		'specialist',
		'analyst',
		'associate',
		'executive',
		'consultant',
		'assistant',
		'representative',
		'agent',
		'owner',
		'partner',
	];

	// 4) Seniority words (reuse + a few extras)
	const SENIORITY = Array.from(
		new Set([
			...SENIORITY_WORDS,
			'staff',
			'executive',
			'associate',
			'intern',
			'trainee',
			'graduate',
			'apprentice',
		]),
	);

	// --- Helpers ---

	const rxAny = (arr: string[]) =>
		new RegExp(`\\b(${arr.map((x) => x.replace(/\s+/g, '\\s+')).join('|')})\\b`, 'i');

	// Collect extra "skills" (really: tools/certs/platforms) beyond TECH_TOKENS
	const collectNonTechTokens = () => {
		const r = new RegExp(
			`\\b(${NON_TECH_TOKENS.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
			'ig',
		);
		let m: RegExpExecArray | null;
		while ((m = r.exec(raw))) {
			baseSkills.add(m[1].toLowerCase());
		}
	};

	// Try to infer a title when extractTitle() fails—cover non-software
	const inferTitleFallback = (): string | undefined => {
		// Normalize spacing
		const cleaned = raw.replace(/\s+/g, ' ');

		// seniority + function + (core/broad title)
		const sen = SENIORITY.find((s) =>
			new RegExp(`\\b${s.replace(/\s+/g, '\\s+')}\\b`, 'i').test(cleaned),
		);
		const func = NON_TECH_FUNCTIONS.find((f) =>
			new RegExp(`\\b${f.replace(/\s+/g, '\\s+')}\\b`, 'i').test(cleaned),
		);
		const coreOrBroad =
			BROAD_TITLES.find((t) =>
				new RegExp(`\\b${t.replace(/\s+/g, '\\s+')}\\b`, 'i').test(cleaned),
			) ||
			CORE_TITLES.find((t) =>
				new RegExp(`\\b${t.replace(/\s+/g, '\\s+')}\\b`, 'i').test(cleaned),
			);

		// Common forms:
		//  - "senior finance manager", "marketing manager", "lead recruiter", "customer success manager"
		//  - "finance analyst", "sales executive", "operations coordinator"
		//  - just "recruiter", "copywriter", "accountant" (function + core implied)
		//  - "talent acquisition lead" (function + broad)
		let candidate: string | undefined;

		// prefer function + (core/broad)
		if (func && coreOrBroad) candidate = `${sen ? sen + ' ' : ''}${func} ${coreOrBroad}`;
		// function alone that is inherently a role (e.g., recruiter, copywriter, accountant)
		if (!candidate && func) {
			const inherentlyRoles = [
				'recruiter',
				'talent acquisition',
				'copywriter',
				'writer',
				'editor',
				'bookkeeper',
				'accounting',
				'customer success',
				'support',
				'paralegal',
				'counsel',
				'auditor',
				'trainer',
				'videographer',
			];
			if (
				inherentlyRoles.some((r) =>
					new RegExp(`\\b${r.replace(/\s+/g, '\\s+')}\\b`, 'i').test(func),
				)
			) {
				candidate = `${sen ? sen + ' ' : ''}${func}`;
			}
		}
		// core/broad alone with seniority (e.g., "senior manager", "lead analyst")
		if (!candidate && coreOrBroad && sen) candidate = `${sen} ${coreOrBroad}`;
		// function + generic core default (e.g., "finance analyst", "marketing manager")
		if (!candidate && func) {
			const defaultCore =
				/marketing|growth|digital|content|seo|sem|ppc|ads|brand|social/i.test(func)
					? 'manager'
					: /finance|accounting|audit|treasury|payroll/i.test(func)
						? 'analyst'
						: /sales|account|customer|support/i.test(func)
							? 'manager'
							: /operations|procurement|supply|logistics|warehouse|inventory/i.test(
										func,
								  )
								? 'manager'
								: /hr|recruit|talent acquisition|people/i.test(func)
									? 'manager'
									: /legal|compliance|policy|counsel|paralegal/i.test(func)
										? 'specialist'
										: /design|graphic|visual|motion|video|writer|editor/i.test(
													func,
											  )
											? 'specialist'
											: 'specialist';
			candidate = `${sen ? sen + ' ' : ''}${func} ${defaultCore}`;
		}

		if (candidate) {
			return candidate
				.replace(/\s+/g, ' ')
				.replace(/\bfront\s*end\b/gi, 'frontend')
				.replace(/\bback\s*end\b/gi, 'backend')
				.replace(/\bui\s*\/?\s*ux\b/gi, 'ui ux')
				.trim()
				.toLowerCase();
		}
		return undefined;
	};

	// Try to enrich "skills" for non-tech tools/certs
	collectNonTechTokens();

	// If no title from tech-biased extractor, infer a broader one
	if (!title) {
		title = inferTitleFallback();
	}

	// As a last-ditch tiny n-gram fallback like: "need a copywriter", "hiring accountant"
	if (!title) {
		const VERB_HEADS = [
			'need',
			'hiring',
			'hire',
			'recruit',
			'looking for',
			'searching for',
			'find',
			'get',
			'shortlist',
			'filter',
		];
		const GENERIC_ROLES = [
			'copywriter',
			'accountant',
			'bookkeeper',
			'auditor',
			'payroll specialist',
			'treasury analyst',
			'customer success manager',
			'customer support',
			'support agent',
			'call center agent',
			'recruiter',
			'talent acquisition',
			'hr generalist',
			'people operations',
			'operations manager',
			'procurement manager',
			'supply chain manager',
			'logistics manager',
			'legal counsel',
			'paralegal',
			'compliance officer',
			'graphic designer',
			'visual designer',
			'motion designer',
			'video editor',
			'videographer',
			'content writer',
			'editor',
			'sales executive',
			'account executive',
			'account manager',
			'bd executive',
			'business development',
			'marketing manager',
			'growth marketer',
			'seo specialist',
			'sem specialist',
			'ppc specialist',
			'social media manager',
			'community manager',
			'project manager',
			'program manager',
			'product owner',
			'scrum master',
			'trainer',
			'training specialist',
			'quality assurance',
		];
		const rxHeads = rxAny(VERB_HEADS);
		const rxRoles = rxAny(GENERIC_ROLES);
		if (rxHeads.test(text) && rxRoles.test(text)) {
			const m = text.match(rxRoles);
			if (m) title = m[1].toLowerCase();
		}
	}

	// Normalize some common aliases
	if (title) {
		title = title
			.replace(/\bta\b/g, 'talent acquisition')
			.replace(/\bcs\b/g, 'customer success')
			.replace(/\bae\b/g, 'account executive')
			.replace(/\bpo\b/g, 'product owner')
			.replace(/\bbd\b/g, 'business development')
			.replace(/\bhr\b/g, 'human resources')
			.replace(/\bops\b/g, 'operations')
			.replace(/\bppc\b/g, 'sem');
	}

	// Build output
	const skills = Array.from(baseSkills);
	const out: Extracted = { intent: true };
	if (title) out.title = title;
	if (tenure) out.tenure = tenure;
	if (skills.length) out.skills = skills;

	// Preserve your original safety gate: require enough signal
	if (!out.title && !out.tenure && !(out.skills && out.skills.length >= 2)) return null;

	return out;
};

export function useGlobalVoice() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();

	const [transcriptText, setTranscriptText] = useState('');
	const lastNavAt = useRef(0);
	const lastFilterAt = useRef(0);
	const lastFilterSig = useRef<string>('');
	const lastRawRef = useRef<string>('');
	const debounceRef = useRef<number | null>(null);

	const phraseIndex = useMemo(() => {
		const list: Array<{ key: RouteKey; phrase: string }> = [];
		(Object.keys(alias) as RouteKey[]).forEach((k) =>
			alias[k].forEach((p) => list.push({ key: k, phrase: normalize(p) })),
		);
		return list;
	}, []);

	const coolDownMs = 1000;
	const DEBOUNCE_MS = 800;

	const resolveNavKey = (raw: string): RouteKey | null => {
		const text = normalize(raw);
		if (SPECIAL_BACK_RE.test(text)) return 'navBack';
		if (SPECIAL_FORWARD_RE.test(text)) return 'navForward';
		if (SPECIAL_RELOAD_RE.test(text)) return 'reload';
		const hasVerb = VERB_RE.test(text);
		if (!hasVerb) return null;
		let captured = '';
		const m = INTENT_RE.exec(text);
		if (m?.groups?.target) captured = m.groups.target as string;
		captured = normalize(
			captured
				.replace(new RegExp(`\\b(?:${PRONOUNS.join('|')})\\b`, 'gi'), '')
				.replace(new RegExp(`\\b(?:${PAGE_WORDS.join('|')})\\b`, 'gi'), ''),
		);
		if (!captured) return null;
		let best: { key: RouteKey; score: number } | null = null;
		for (const c of phraseIndex) {
			const s = tokenScore(captured, c.phrase);
			if (!best || s > best.score) best = { key: c.key, score: s };
		}
		return best && best.score >= 0.5 ? best.key : null;
	};

	const hasNavIntent = (raw: string) => {
		const t = normalize(raw);
		if (SPECIAL_BACK_RE.test(t) || SPECIAL_FORWARD_RE.test(t) || SPECIAL_RELOAD_RE.test(t))
			return true;
		return VERB_RE.test(t) && !!resolveNavKey(raw);
	};

	const goTo = (key: RouteKey | null) => {
		if (!key) return false;
		const dest = routes[key];
		if (!dest) return false;
		if (dest === '__back__') {
			if (window.history.length > 1) window.history.back();
			return true;
		}
		if (dest === '__forward__') {
			window.history.forward();
			return true;
		}
		if (dest === '__reload__') {
			window.location.reload();
			return true;
		}
		navigate(dest);
		return true;
	};

	const fetchFirstLocation = async (q: string) => {
		try {
			const location = extractLocation(q);
			if (location.length === 0) return null;
			const res = await dispatch(
				getLocationForCandidates({ page: 1, limit: 10, keywords: location[0] }),
			).unwrap();
			const rows: any[] = Array.isArray(res)
				? res
				: Array.isArray(res?.rows)
					? res.rows
					: Array.isArray(res?.data)
						? res.data
						: Array.isArray(res?.data?.rows)
							? res.data.rows
							: Array.isArray(res?.data?.data)
								? res.data.data
								: [];
			if (!rows.length) return null;
			return rows[0];
		} catch {
			return null;
		}
	};

	useEffect(() => {
		const finalize = async () => {
			const raw = (window as any).__kbVoiceBuffer__ as string;
			if (!raw) return;

			// hard guard against duplicate identical speech events
			if (normalize(raw) === normalize(lastRawRef.current)) return;
			lastRawRef.current = raw;

			const now = Date.now();
			const navIntent = hasNavIntent(raw);
			const onCreateJob = location.pathname === '/dashboard/jobs/create-job';
			const t = normalize(raw);
			const filterIntent = onCreateJob && hasHiringIntent(t) && !hasCandidateAntiIntent(t);

			const navKey = resolveNavKey(raw);
			let didNavigate = false;
			let didFilter = false;

			if (navKey && now - lastNavAt.current >= coolDownMs) {
				lastNavAt.current = now;
				didNavigate = goTo(navKey);
			}
			if (didNavigate) return;

			if (filterIntent) {
				const parsed = extractHiringFilters(raw);
				if (!parsed) {
					if (!navIntent) toast.error('Unable to get the candidates with filters');
				} else {
					const tenure = parsed.tenure
						? { min: parsed.tenure.min, max: parsed.tenure.max }
						: { min: 0, max: 0 };
					const loc = await fetchFirstLocation(raw);
					const payload = {
						keywords: parsed.title ?? '',
						tenure,
						// canonicalize for stable signature
						skills: (parsed.skills ?? []).slice().sort(),
						location: loc
							? [
									{
										id: (loc as any).id || (loc as any).locationId,
										title: (loc as any).title,
									},
								]
							: [],
					};

					const empty =
						!payload.keywords &&
						payload.skills.length === 0 &&
						payload.location.length === 0 &&
						payload.tenure.min === 0 &&
						payload.tenure.max === 0;

					if (!empty) {
						const sig = JSON.stringify(payload);
						const filterCooldownOk = now - lastFilterAt.current >= coolDownMs;
						if (sig !== lastFilterSig.current && filterCooldownOk) {
							lastFilterSig.current = sig;
							lastFilterAt.current = now;
							didFilter = true;
							dispatch(
								getFilteredCandidates({ page: 1, limit: 10, ...payload } as any),
							);
						}
					} else {
						if (!navIntent) toast.error('Unable to get the candidates with filters');
					}
				}
			}

			if (!didNavigate && !didFilter && !navIntent && !filterIntent) {
				toast.error('Unable to get');
			}
		};

		const handler = (e: any) => {
			const raw = String(e?.detail ?? '');
			if (!raw) return;
			(window as any).__kbVoiceBuffer__ = raw;
			setTranscriptText(raw);
			if (debounceRef.current) window.clearTimeout(debounceRef.current);
			debounceRef.current = window.setTimeout(() => {
				finalize();
			}, DEBOUNCE_MS);
			setTimeout(() => setTranscriptText(''), 2200);
		};

		const KEY = '__kbGlobalVoiceListener__';
		if (!(window as any)[KEY]) {
			(window as any)[KEY] = true;
			window.addEventListener('FROM_IFRAME_SPEECH', handler as EventListener, {
				passive: true,
			});
		}

		return () => {
			window.removeEventListener('FROM_IFRAME_SPEECH', handler as EventListener);
			if (debounceRef.current) window.clearTimeout(debounceRef.current);
			(window as any)[KEY] = false;
		};
	}, [location.pathname, navigate, dispatch, phraseIndex]);

	return { transcriptText };
}
