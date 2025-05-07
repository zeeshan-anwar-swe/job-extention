import { Roles } from "../constants/role.enums";

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
	[Roles.AGENCY_ADMIN]: {
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
	},
	[Roles.CLIENT]: {
		dashboardAppPages: {
			id: 'dashboardHomeApp',
			to: '/',
			text: 'Dashboard',
			icon: 'HeroSquares2X2',
		},

		settingAppPages: {
			id: 'SettingApp',
			to: '/setting',
			text: 'Setting',
			icon: 'HeroCog6Tooth',
			subPages: {
				editProfileAppPages: {
					id: 'editProfileApp',
					to: '/setting',
					text: 'Edit Profile',
					icon: 'HeroUser',
				},
				deleteAppPages: {
					id: 'connectCRMApp',
					to: '/setting/delete-account',
					text: 'Delete Account',
					icon: 'HeroTrash',
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
				viewCadidatesAppPages: {
					id: 'jobsViewCadidatesApp',
					to: '/jobs/view-cadidates',
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

		recruiterAppPages: {
			id: 'recruiterApp',
			to: '/recruiter',
			text: 'Recruiter',
			icon: 'HeroBriefcase',
			subPages: {
				recruiterPage: {
					id: 'recruiterPage',
					to: '/recruiter',
					text: 'Recruiter',
					icon: 'HeroBriefcase',
				},
				recruiterProfilePage: {
					id: 'recruitmentProfileApp',
					to: '/recruiter/profile',
					text: 'Recruitment Profile',
					icon: 'HeroIdentification',
				},
			},
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
			icon: 'HeroChatBubbleLeftRight',
		},

		KoalaByteAssistantAppPages: {
			id: 'KoalaByteAssistantApp',
			to: '/koalabyte-assistant',
			text: 'KoalaByte Assistant',
			icon: 'HeroChatBubbleLeftRight',
		},

		chatAppPages: {
			id: 'chatApp',
			to: '/chat',
			text: 'Chat',
			icon: 'HeroChatBubbleLeftRight',
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
	},
	[Roles.TEAM]: {
		dashboardAppPages: {
			id: 'dashboardHomeApp',
			to: '/',
			text: 'Dashboard',
			icon: 'HeroSquares2X2',
		},

		chatPage: {
			id: 'chatWithRecruiter',
			to: '/chat-with-recruiter',
			text: 'Chat With Recruiter',
			icon: 'HeroChatBubbleLeftRight',
		},

		recruiterAppPages: {
			id: 'recruiterApp',
			to: '/recruiters',
			text: 'Recruiters',
			icon: 'HeroBriefcase',
			subPages: {
				recruiterPage: {
					id: 'recruiterPage',
					to: '/recruiters',
					text: 'Recruiters',
					icon: 'HeroBriefcase',
				},
				recruiterProfilePage: {
					id: 'recruitmentProfileApp',
					to: '/recruiter/profile',
					text: 'Recruitment Profile',
					icon: 'HeroIdentification',
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
	[Roles.ADMIN]: {
		dashboardAppPages: {
			id: 'dashboardHomeApp',
			to: '/',
			text: 'Dashboard',
			icon: 'HeroSquares2X2',
		},


		recruiterAppPages: {
			id: 'recruiterApp',
			to: '/recruiter',
			text: 'Recruiter',
			icon: 'HeroBriefcase',
			subPages: {
				recruiterPage: {
					id: 'recruiterPage',
					to: '/recruiter',
					text: 'Recruiter',
					icon: 'HeroBriefcase',
				},
				recruiterProfilePage: {
					id: 'recruitmentProfileApp',
					to: '/recruiter/profile',
					text: 'Recruitment Profile',
					icon: 'HeroIdentification',
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

	[Roles.SUPER_ADMIN]: {
		dashboardAppPages: {
			id: 'dashboardHomeApp',
			to: '/',
			text: 'Dashboard',
			icon: 'HeroSquares2X2',
		},


		recruiterAppPages: {
			id: 'recruiterApp',
			to: '/recruiter',
			text: 'Recruiter',
			icon: 'HeroBriefcase',
			subPages: {
				recruiterPage: {
					id: 'recruiterPage',
					to: '/recruiter',
					text: 'Recruiter',
					icon: 'HeroBriefcase',
				},
				recruiterProfilePage: {
					id: 'recruitmentProfileApp',
					to: '/recruiter/profile',
					text: 'Recruitment Profile',
					icon: 'HeroIdentification',
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
