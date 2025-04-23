import usersDb from '../mocks/db/users.db';
import rolesDb from '../mocks/db/roles.db';
import projectsDb from '../mocks/db/projects.db';

export const examplePages = {
	examplesPage: {
		id: 'examplesPage',
		to: '/examples-page',
		text: 'Examples Page',
		icon: 'HeroBookOpen',
	},
	duotoneIconsPage: {
		id: 'duotoneIconsPage',
		to: '/duotone-icons',
		text: 'Duotone Icons',
		icon: 'HeroCubeTransparent',
	},
};

export const appPages = {
	AgencyAdmin: {
		dashboardAppPages: {
			id: 'dashboardHomeApp',
			to: '/',
			text: 'Dashboard',
			icon: 'HeroSquares2X2',
		},

		customCVAppPages: {
			id: 'customCVApp',
			to: '/custom-cv',
			text: 'Custom CV',
			icon: 'HeroDocumentText',
		},

		testForCadidateAppPages: {
			id: 'testForCadidateApp',
			to: '/test-for-cadidate',
			text: 'Test For Cadidate',
			icon: 'HeroClipboardDocumentList',
		},

		integrationsAppPages: {
			id: 'integrationsApp',
			to: '/integrations',
			text: 'Integrations',
			icon: 'HeroPaperClip',
		},

		settingAppPages: {
			id: 'SettingApp',
			to: '/setting',
			text: 'Setting',
			icon: 'HeroCog6Tooth',
			subPages: {
				settingPage: {
					id: 'SettingApp',
					to: '/setting',
					text: 'Setting',
					icon: 'HeroCog6Tooth',
				},
				editProfileAppPages: {
					id: 'editProfileApp',
					to: '/setting',
					text: 'Edit Profile',
					icon: 'HeroUser',
				},
				connectCRMAppPages: {
					id: 'connectCRMApp',
					to: '/setting/connect-crm',
					text: 'Connect CRM',
					icon: 'HeroComputerDesktop',
				},
				subcriptionAppPages: {
					id: 'subcriptionApp',
					to: '/setting/subcription',
					text: 'Subscription',
					icon: 'HeroCreditCard',
				},
			},
		},

		pamentAppPages: {
			id: 'pamentApp',
			to: '/payment',
			text: 'Payment',
			icon: 'HeroCreditCard',
		},

		candidatesAppPages: {
			id: 'candidatesApp',
			to: '/candidates',
			text: 'Candidates',
			icon: 'HeroUsers',
			subPages: {
				candidatesPage: {
					id: 'candidatesPage',
					to: '/candidates',
					text: 'Candidates',
					icon: 'HeroUsers',
				},
				cadidateProfileAppPage: {
					id: 'cadidateProfileApp',
					to: 'candidates/profile',
					text: 'Candidate Profile',
					icon: 'HeroIdentification',
				},
				candidateCVEditAppPage: {
					id: 'cadidateProfileApp',
					to: 'candidates/cv-edit',
					text: 'Candidate Profile',
					icon: 'HeroPencilSquare',
				},
			},
		},
		jobsAppPages: {
			id: 'jobsApp',
			to: '/jobs',
			text: 'Jobs',
			icon: 'HeroDocumentText',
			subPages: {
				jobsPage: {
					id: 'jobsApp',
					to: '/jobs',
					text: 'Jobs',
					icon: 'HeroDocumentText',
				},
				viewCadidatesAppPages: {
					id: 'jobsViewCadidatesApp',
					to: '/jobs/view-job-details',
					text: 'View Cadidates',
					icon: 'HeroUser',
				},
				createJobsAppPages: {
					id: 'jobsCreateJobsApp',
					to: '/jobs/create-job',
					text: 'Create Job',
					icon: 'Heroplus',
				},
			},
		},

		clientsAppPages: {
			id: 'clientsApp',
			to: '/clients',
			text: 'Clients',
			icon: 'HeroBriefcase',
			subPages: {
				clientsPage: {
					id: 'clientsApp',
					to: '/clients',
					text: 'Clients',
					icon: 'HeroBriefcase',
				},
				clientProfileAppPages: {
					id: 'clientProfileApp',
					to: '/clients/profile',
					text: 'Client Profile',
					icon: 'HeroIdentification',
				},
			},
		},

		taskBoardAppPages: {
			id: 'taskBoardApp',
			to: '/task-board',
			text: 'Task Board',
			icon: 'HeroTableCells',
		},

		reportAndAnalyticsAppPages: {
			id: 'reportAndAnalyticsApp',
			to: '/report-and-analytics',
			text: 'Report & Analytics',
			icon: 'HeroPresentationChartBar',
		},

		aiInterviewAppPages: {
			id: 'aiInterviewApp',
			to: '/ai-interview',
			text: 'AI Interview',
			icon: 'HeroBot',
		},

		KoalaByteAssistantAppPages: {
			id: 'KoalaByteAssistantApp',
			to: '/koalabyte-assistant',
			text: 'KoalaByte Assistant',
			icon: 'HeroChatBubbleLeftRight',
		},

		manageTeamAppPages: {
			id: 'manageTeamApp',
			to: '/manage-team',
			text: 'Manage Team',
			icon: 'HeroUsers',
			rightIcon: 'HeroArrowUpRight',
			subPages: {
				manageTeamPage: {
					id: 'manageTeamApp',
					to: '/manage-team',
					text: 'Manage Team',
					icon: 'HeroUsers',
					rightIcon: 'HeroArrowUpRight',
				},
				teammateProfileAppPages: {
					id: 'teammateProfileApp',
					to: '/manage-team/profile',
					text: 'Teammate Profile',
					icon: 'HeroUserGroup',
				},
				chatAppPage: {
					id: 'chatApp',
					to: '/manage-team/chat',
					text: 'Chat Page',
					icon: 'HeroChatBubbleLeftEllipsis',
				},
			},
		},

		aiAppPages: {
			id: 'aiApp',
			to: '/ai',
			text: 'AI',
			icon: 'HeroRocketLaunch',
			subPages: {
				aiDashboardPage: {
					id: 'aiDashboardPage',
					to: '/ai/dashboard',
					text: 'AI Dashboard',
					icon: 'HeroRocketLaunch',
				},
				chatPages: {
					id: 'customerPage',
					to: '/ai/chat',
					text: 'Chat Pages',
					icon: 'HeroChatBubbleLeft',
					subPages: {
						photoPage: {
							id: 'photoPage',
							to: '/ai/chat/photo',
							text: 'Photo Editing',
							icon: 'HeroPhoto',
						},
						videoPage: {
							id: 'videoPage',
							to: '/ai/chat/video',
							text: 'Video Generation',
							icon: 'HeroFilm',
						},
						audioPage: {
							id: 'audioPage',
							to: '/ai/chat/audio',
							text: 'Audio Generation',
							icon: 'HeroMusicalNote',
						},
						codePage: {
							id: 'audioPage',
							to: '/ai/chat/code',
							text: 'Code Generation',
							icon: 'HeroCommandLine',
						},
					},
				},
			},
		},

		crmAppPages: {
			id: 'crmApp',
			to: '/crm',
			text: 'CRM',
			icon: 'HeroUserGroup',
			subPages: {
				crmDashboardPage: {
					id: 'crmDashboardPage',
					to: '/crm/dashboard',
					text: 'Candidates',
					icon: 'HeroUserGroup',
				},
				customerPage: {
					id: 'customerPage',
					to: '/crm/customer',
					text: 'Customers',
					icon: 'HeroUserGroup',
					subPages: {
						listPage: {
							id: 'crmListPage',
							to: '/crm/customer/list',
							text: 'Customers List',
							icon: 'HeroQueueList',
						},
						editPage: {
							id: 'customerPage',
							to: `/crm/customer/${usersDb[0].id}`,
							text: `Customer @${usersDb[0].id}`,
							icon: 'HeroUser',
						},
						editPageLink: {
							id: 'editPageLink',
							to: '/crm/customer',
						},
					},
				},
				rolePage: {
					id: 'rolePage',
					to: '/crm/role',
					text: 'Roles',
					icon: 'HeroShieldCheck',
					subPages: {
						listPage: {
							id: 'crmListPage',
							to: '/crm/role/list',
							text: 'Role List',
							icon: 'HeroQueueList',
						},
						editPage: {
							id: 'customerPage',
							to: `/crm/role/${rolesDb[0].id}`,
							text: `Role @${rolesDb[0].id}`,
							icon: 'HeroShieldExclamation',
						},
						editPageLink: {
							id: 'editPageLink',
							to: '/crm/role',
						},
					},
				},
			},
		},
		projectAppPages: {
			id: 'projectApp',
			to: '/project',
			text: 'Project',
			icon: 'HeroClipboardDocumentCheck',
			subPages: {
				projectDashboardPage: {
					id: 'projectDashboardPage',
					to: '/project/dashboard',
					text: 'Projects Dashboard',
					icon: 'HeroClipboardDocumentCheck',
				},
				projectBoardPage: {
					id: 'projectBoardPage',
					to: `/project/board/${projectsDb[0].id}`,
					text: `Board ${projectsDb[0].name}`,
					icon: 'HeroQrCode',
				},
				projectBoardPageLink: {
					id: 'projectBoardPageLink',
					to: '/project/board',
				},
			},
		},

		mailAppPages: {
			id: 'mailApp',
			to: '/mail',
			text: 'Mail',
			icon: 'HeroEnvelope',
			subPages: {
				inboxPages: {
					id: 'inboxPages',
					to: '/mail/inbox',
					text: 'Inbox',
					icon: 'HeroEnvelope',
				},
			},
		},
		chatAppPages: {
			id: 'chatApp',
			to: '/chat',
			text: 'Chat',
			icon: 'HeroChatBubbleLeftRight',
		},
	},
};

export const componentsPages = {
	uiPages: {
		id: 'uiPages',
		to: '/ui',
		text: 'UI',
		icon: 'HeroPuzzlePiece',
		subPages: {
			alertPage: {
				id: 'alertPage',
				to: '/ui/alert',
				text: 'Alert',
				icon: 'HeroBell',
			},
			badgePage: {
				id: 'badgePage',
				to: '/ui/badge',
				text: 'Badge',
				icon: 'HeroSparkles',
			},
			buttonPage: {
				id: 'buttonPage',
				to: '/ui/button',
				text: 'Button',
				icon: 'HeroRectangleStack',
			},
			buttonGroupPage: {
				id: 'buttonGroupPage',
				to: '/ui/button-group',
				text: 'Button Group',
				icon: 'HeroRectangleStack',
			},
			cardPage: {
				id: 'cardPage',
				to: '/ui/card',
				text: 'Card',
				icon: 'HeroSquare2Stack',
			},
			collapsePage: {
				id: 'collapsePage',
				to: '/ui/collapse',
				text: 'Collapse',
				icon: 'HeroBarsArrowDown',
			},
			dropdownPage: {
				id: 'dropdownPage',
				to: '/ui/dropdown',
				text: 'Dropdown',
				icon: 'HeroQueueList',
			},
			modalPage: {
				id: 'modalPage',
				to: '/ui/modal',
				text: 'Modal',
				icon: 'HeroChatBubbleBottomCenter',
			},
			offcanvasPage: {
				id: 'offcanvasPage',
				to: '/ui/offcanvas',
				text: 'Offcanvas',
				icon: 'HeroBars3BottomRight',
			},
			progressPage: {
				id: 'progressPage',
				to: '/ui/progress',
				text: 'Progress',
				icon: 'HeroChartBar',
			},
			tablePage: {
				id: 'tablePage',
				to: '/ui/table',
				text: 'Table',
				icon: 'HeroTableCells',
			},
			tooltipPage: {
				id: 'tooltipPage',
				to: '/ui/tooltip',
				text: 'Tooltip',
				icon: 'HeroChatBubbleLeftEllipsis',
			},
		},
	},
	formPages: {
		id: 'formPages',
		to: '/form',
		text: 'Form',
		icon: 'HeroPencilSquare',
		subPages: {
			fieldWrapPage: {
				id: 'fieldWrapPage',
				to: '/form/field-wrap',
				text: 'Field Wrap',
				icon: 'HeroInbox',
			},
			checkboxPage: {
				id: 'checkboxPage',
				to: '/form/checkbox',
				text: 'Checkbox',
				icon: 'HeroStop',
			},
			checkboxGroupPage: {
				id: 'checkboxGroupPage',
				to: '/form/checkbox-group',
				text: 'Checkbox Group',
				icon: 'HeroListBullet',
			},
			inputPage: {
				id: 'inputPage',
				to: '/form/input',
				text: 'Input',
				icon: 'HeroRectangleStack',
			},
			labelPage: {
				id: 'labelPage',
				to: '/form/label',
				text: 'Label',
				icon: 'HeroPencil',
			},
			radioPage: {
				id: 'radioPage',
				to: '/form/radio',
				text: 'Radio',
				icon: 'HeroStopCircle',
			},
			richTextPage: {
				id: 'richTextPage',
				to: '/form/rich-text',
				text: 'Rich Text',
				icon: 'HeroBars3CenterLeft',
			},
			selectPage: {
				id: 'selectPage',
				to: '/form/select',
				text: 'Select',
				icon: 'HeroQueueList',
			},
			selectReactPage: {
				id: 'selectReactPage',
				to: '/form/select-react',
				text: 'Select React',
				icon: 'HeroQueueList',
			},
			textareaPage: {
				id: 'textareaPage',
				to: '/form/textarea',
				text: 'Textarea',
				icon: 'HeroBars3BottomLeft',
			},
			validationPage: {
				id: 'validationPage',
				to: '/form/validation',
				text: 'Validation',
				icon: 'HeroShieldCheck',
			},
		},
	},
	integratedPages: {
		id: 'integratedPages',
		to: '/integrated',
		text: 'Integrated',
		icon: 'HeroBuildingLibrary',
		subPages: {
			reactDateRangePage: {
				id: 'reactDateRangePage',
				to: '/integrated/react-date-range',
				text: 'React Date Range',
				icon: 'HeroCalendarDays',
			},
			fullCalendarPage: {
				id: 'fullCalendarPage',
				to: '/integrated/full-calendar',
				text: 'Full Calendar',
				icon: 'HeroCalendar',
			},
			apexChartsPage: {
				id: 'apexChartsPage',
				to: '/integrated/apex-charts',
				text: 'ApexCharts',
				icon: 'HeroChartBar',
			},
			reactSimpleMapsPage: {
				id: 'reactSimpleMapsPage',
				to: '/integrated/react-simple-maps',
				text: 'React Simple Maps',
				icon: 'HeroMap',
			},
			waveSurferPage: {
				id: 'waveSurferPage',
				to: '/integrated/wave-surfer',
				text: 'WaveSurfer',
				icon: 'HeroMusicalNote',
			},
			richTextPage: {
				id: 'richTextPage',
				to: '/integrated/slate-react',
				text: 'Rich Text',
				icon: 'HeroBars3BottomLeft',
			},
			reactSelectPage: {
				id: 'reactSelectPage',
				to: '/integrated/react-select',
				text: 'React Select',
				icon: 'HeroQueueList',
			},
		},
	},
	iconsPage: {
		id: 'iconsPage',
		to: '/icons',
		text: 'Icons',
		icon: 'HeroBuildingLibrary',
		subPages: {
			heroiconsPage: {
				id: 'heroiconsPage',
				to: '/icons/heroicons',
				text: 'Heroicons',
				icon: 'HeroShieldCheck',
			},
			duotoneIconsPage: {
				id: 'duotoneIconsPage',
				to: '/icons/duotone-icons',
				text: 'Duotone Icons',
				icon: 'DuoPicker',
			},
		},
	},
};

export const authPages = {
	loginPage: {
		id: 'loginPage',
		to: '/signin',
		text: 'Sign In',
		icon: 'HeroArrowRightOnRectangle',
	},
	signupPage: {
		id: 'signupPage',
		to: '/signup',
		text: 'Signup',
		icon: 'HeroArrowRightOnRectangle',
	},
	ssoWaitingPage: {
		id: 'ssoWaitingPage',
		to: '/login',
		text: 'SSO Waiting',
		icon: 'HeroArrowRightOnRectangle',
	},
	profilePage: {
		id: 'profilePage',
		to: '/profile',
		text: 'Profile',
		icon: 'HeroUser',
	},
};

const pagesConfig = {
	...examplePages,
	...authPages,
};

export default pagesConfig;
