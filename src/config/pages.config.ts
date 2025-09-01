import { Roles } from '../constants/role.enums';

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
            to: '/dashboard/',
            text: 'Dashboard',
            icon: 'HeroSquares2X2',
        },
        customCVAppPages: {
            id: 'customCVApp',
            to: '/dashboard/custom-cv',
            text: 'Custom CV',
            icon: 'HeroDocument',
            subsPages: {
                rootPage: {
                    text: 'List',
                    to: '/dashboard/custom-cv',
                    id: 'customCVApp',
                    icon: 'HeroTableCells',
                },
                createCVPages: {
                    to: '/dashboard/custom-cv/create',
                    icon: 'HeroDocumentPlus',
                    id: 'createCustomCVApp',
                    text: 'Create',
                },
                editCVPages: {
                    text: 'Edit',
                    id: 'viewCustomCVApp',
                    to: '/dashboard/custom-cv/edit',
                    icon: 'HeroDocumentCheck',
                },
                viewCVPages: {
                    text: 'View',
                    id: 'viewCustomCVApp',
                    to: '/dashboard/custom-cv/view',
                    icon: 'HeroDocumentMagnifyingGlass',
                },
            },
        },
        chatAppPages: {
            id: 'chatApp',
            to: '/dashboard/chat',
            text: 'Chat',
            icon: 'HeroChatBubbleLeftRight',
        },
        testForCadidateAppPages: {
            id: 'testForCadidateApp',
            to: '/dashboard/test-for-cadidate',
            text: 'Test For Cadidate',
            icon: 'HeroClipboardDocumentList',
        },
        integrationsAppPages: {
            id: 'integrationsApp',
            to: '/dashboard/integrations',
            text: 'Integrations',
            icon: 'HeroPaperClip',
        },
        settingAppPages: {
            id: 'SettingApp',
            to: '/dashboard/setting',
            text: 'Setting',
            icon: 'HeroCog6Tooth',
            subPages: {
                settingPage: {
                    id: 'SettingApp',
                    to: '/dashboard/setting',
                    text: 'Setting',
                    icon: 'HeroCog6Tooth',
                },
                editProfileAppPages: {
                    id: 'editProfileApp',
                    to: '/dashboard/setting',
                    text: 'Edit Profile',
                    icon: 'HeroUser',
                },
                connectCRMAppPages: {
                    id: 'connectCRMApp',
                    to: '/dashboard/setting/connect-crm',
                    text: 'Connect CRM',
                    icon: 'HeroComputerDesktop',
                },
                subcriptionAppPages: {
                    id: 'subcriptionApp',
                    to: '/dashboard/setting/subscription',
                    text: 'Subscription',
                    icon: 'HeroCreditCard',
                },
            },
        },
        pamentAppPages: {
            id: 'pamentApp',
            to: '/dashboard/payment',
            text: 'Payment',
            icon: 'HeroCreditCard',
        },
        candidatesAppPages: {
            id: 'candidatesApp',
            to: '/dashboard/candidates',
            text: 'Candidates',
            icon: 'HeroUsers',
            subPages: {
                candidatesPage: {
                    id: 'candidatesPage',
                    to: '/dashboard/candidates',
                    text: 'Candidates',
                    icon: 'HeroUsers',
                },
                cadidateProfileAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/profile',
                    text: 'Candidate Profile',
                    icon: 'HeroIdentification',
                },
                candidateCVEditAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/cv-edit',
                    text: 'Candidate Profile',
                    icon: 'HeroPencilSquare',
                },
            },
        },
        jobsAppPages: {
            id: 'jobsApp',
            to: '/dashboard/jobs',
            text: 'Jobs',
            icon: 'HeroDocumentText',
            subPages: {
                jobsPage: {
                    id: 'jobsApp',
                    to: '/dashboard/jobs',
                    text: 'Jobs',
                    icon: 'HeroDocumentText',
                },
                viewCadidatesAppPages: {
                    id: 'jobsViewCadidatesApp',
                    to: '/dashboard/jobs/view-job-details',
                    text: 'View Cadidates',
                    icon: 'HeroUser',
                },
                createJobsAppPages: {
                    id: 'jobsCreateJobsApp',
                    to: '/dashboard/jobs/create-job',
                    text: 'Create Job',
                    icon: 'Heroplus',
                },
                editJobAppPages: {
                    id: 'editJobAppPages',
                    to: '/dashboard/jobs/edit-job',
                    text: 'Edit Job',
                    icon: 'HeroPencilSquare',
                },
            },
        },
        clientsAppPages: {
            id: 'clientsApp',
            to: '/dashboard/clients',
            text: 'Clients',
            icon: 'HeroBriefcase',
            subPages: {
                clientsPage: {
                    id: 'clientsApp',
                    to: '/dashboard/clients',
                    text: 'Clients',
                    icon: 'HeroBriefcase',
                },
                clientProfileAppPages: {
                    id: 'clientProfileApp',
                    to: '/dashboard/clients/profile',
                    text: 'Client Profile',
                    icon: 'HeroIdentification',
                },
                clientJobsAppPages: {
                    id: 'clientJobsApp',
                    to: '/dashboard/clients/jobs',
                    text: 'Client Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        taskBoardAppPages: {
            id: 'taskBoardApp',
            to: '/dashboard/task-board',
            text: 'Task Board',
            icon: 'HeroTableCells',
        },
        reportAndAnalyticsAppPages: {
            id: 'reportAndAnalyticsApp',
            to: '/dashboard/report-and-analytics',
            text: 'Report & Analytics',
            icon: 'HeroPresentationChartBar',
        },
        aiInterviewAppPages: {
            id: 'aiInterviewApp',
            text: 'AI Interview',
            to: '/dashboard/ai-interview',
            icon: 'HeroBot',
        },
        KoalaByteAssistantAppPages: {
            id: 'KoalaByteAssistantApp',
            to: '/dashboard/koalabyte-assistant',
            text: 'KoalaByte Assistant',
            icon: 'HeroChatBubbleLeftRight',
        },
        manageTeamAppPages: {
            id: 'manageTeamApp',
            to: '/dashboard/manage-team',
            text: 'Manage Team',
            icon: 'HeroUsers',
            rightIcon: 'HeroArrowUpRight',
            subPages: {
                manageTeamPage: {
                    id: 'manageTeamApp',
                    to: '/dashboard/manage-team',
                    text: 'Manage Team',
                    icon: 'HeroUsers',
                    rightIcon: 'HeroArrowUpRight',
                },
                teammateProfileAppPages: {
                    id: 'teammateProfileApp',
                    to: '/dashboard/manage-team/profile',
                    text: 'Teammate Profile',
                    icon: 'HeroUserGroup',
                },
                chatAppPage: {
                    id: 'chatApp',
                    to: '/dashboard/manage-team/chat',
                    text: 'Chat Page',
                    icon: 'HeroChatBubbleLeftEllipsis',
                },
            },
        },
        aiAppPages: {
            id: 'aiApp',
            to: '/dashboard/ai',
            text: 'AI',
            icon: 'HeroRocketLaunch',
            subPages: {
                aiDashboardPage: {
                    id: 'aiDashboardPage',
                    to: '/dashboard/ai/dashboard',
                    text: 'AI Dashboard',
                    icon: 'HeroRocketLaunch',
                },
                chatPages: {
                    id: 'customerPage',
                    to: '/dashboard/ai/chat',
                    text: 'Chat Pages',
                    icon: 'HeroChatBubbleLeft',
                    subPages: {
                        photoPage: {
                            id: 'photoPage',
                            to: '/dashboard/ai/chat/photo',
                            text: 'Photo Editing',
                            icon: 'HeroPhoto',
                        },
                        videoPage: {
                            id: 'videoPage',
                            to: '/dashboard/ai/chat/video',
                            text: 'Video Generation',
                            icon: 'HeroFilm',
                        },
                        audioPage: {
                            id: 'audioPage',
                            to: '/dashboard/ai/chat/audio',
                            text: 'Audio Generation',
                            icon: 'HeroMusicalNote',
                        },
                        codePage: {
                            id: 'audioPage',
                            to: '/dashboard/ai/chat/code',
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
            to: '/dashboard/',
            text: 'Dashboard',
            icon: 'HeroSquares2X2',
        },
        settingAppPages: {
            id: 'SettingApp',
            to: '/dashboard/setting',
            text: 'Setting',
            icon: 'HeroCog6Tooth',
            subPages: {
                editProfileAppPages: {
                    id: 'editProfileApp',
                    to: '/dashboard/setting',
                    text: 'Edit Profile',
                    icon: 'HeroUser',
                },
                deleteAppPages: {
                    id: 'connectCRMApp',
                    to: '/dashboard/setting/delete-account',
                    text: 'Delete Account',
                    icon: 'HeroTrash',
                },
                subcriptionAppPages: {
                    id: 'subcriptionApp',
                    to: '/dashboard/setting/subcription',
                    text: 'Subscription',
                    icon: 'HeroCreditCard',
                },
            },
        },
        pamentAppPages: {
            id: 'pamentApp',
            to: '/dashboard/payment',
            text: 'Payment',
            icon: 'HeroCreditCard',
        },
        candidatesAppPages: {
            id: 'candidatesApp',
            to: '/dashboard/candidates',
            text: 'Candidates',
            icon: 'HeroUsers',
            subPages: {
                cadidateProfileAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/profile',
                    text: 'Candidate Profile',
                    icon: 'HeroIdentification',
                },
                candidateCVEditAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/cv-edit',
                    text: 'Candidate Profile',
                    icon: 'HeroPencilSquare',
                },
            },
        },
        jobsAppPages: {
            id: 'jobsApp',
            to: '/dashboard/jobs',
            text: 'Jobs',
            icon: 'HeroDocumentText',
            subPages: {
                viewCadidatesAppPages: {
                    id: 'jobsViewCadidatesApp',
                    to: '/dashboard/jobs/view-cadidates',
                    text: 'View Cadidates',
                    icon: 'HeroUser',
                },
                createJobsAppPages: {
                    id: 'jobsCreateJobsApp',
                    to: '/dashboard/jobs/create-job',
                    text: 'Create Job',
                    icon: 'Heroplus',
                },
            },
        },
        recruiterAppPages: {
            id: 'recruiterApp',
            to: '/dashboard/recruiter',
            text: 'Recruiter',
            icon: 'HeroBriefcase',
            subPages: {
                recruiterPage: {
                    id: 'recruiterPage',
                    to: '/dashboard/recruiter',
                    text: 'Recruiter',
                    icon: 'HeroBriefcase',
                },
                recruiterProfilePage: {
                    id: 'recruitmentProfileApp',
                    to: '/dashboard/recruiter/profile',
                    text: 'Recruitment Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        reportAndAnalyticsAppPages: {
            id: 'reportAndAnalyticsApp',
            to: '/dashboard/report-and-analytics',
            text: 'Report & Analytics',
            icon: 'HeroPresentationChartBar',
        },
        aiInterviewAppPages: {
            id: 'aiInterviewApp',
            to: '/dashboard/ai-interview',
            text: 'AI Interview',
            icon: 'HeroChatBubbleLeftRight',
        },
        KoalaByteAssistantAppPages: {
            id: 'KoalaByteAssistantApp',
            to: '/dashboard/koalabyte-assistant',
            text: 'KoalaByte Assistant',
            icon: 'HeroChatBubbleLeftRight',
        },
        chatAppPages: {
            id: 'chatApp',
            to: '/dashboard/chat',
            text: 'Chat',
            icon: 'HeroChatBubbleLeftRight',
        },
        mailAppPages: {
            id: 'mailApp',
            to: '/dashboard/mail',
            text: 'Mail',
            icon: 'HeroEnvelope',
            subPages: {
                inboxPages: {
                    id: 'inboxPages',
                    to: '/dashboard/mail/inbox',
                    text: 'Inbox',
                    icon: 'HeroEnvelope',
                },
            },
        },
    },
    [Roles.TEAM]: {
        dashboardAppPages: {
            id: 'dashboardHomeApp',
            to: '/dashboard/',
            text: 'Dashboard',
            icon: 'HeroSquares2X2',
        },
        jobsPages: {
            id: 'jobsApp',
            to: '/dashboard/jobs',
            text: 'Jobs',
            icon: 'HeroDocumentText',
            subPages: {
                jobsPage: {
                    id: 'jobsApp',
                    to: '/dashboard/jobs',
                    text: 'Jobs',
                    icon: 'HeroDocumentText',
                },
                viewCadidatesAppPages: {
                    id: 'jobsViewCadidatesApp',
                    to: '/dashboard/jobs/view-job-details',
                    text: 'View Cadidates',
                    icon: 'HeroUser',
                },
                createJobsAppPages: {
                    id: 'jobsCreateJobsApp',
                    to: '/dashboard/jobs/create-job',
                    text: 'Create Job',
                    icon: 'Heroplus',
                },
            },
        },
        chatAppPages: {
            id: 'chatApp',
            to: '/dashboard/chat',
            text: 'Chat',
            icon: 'HeroChatBubbleLeftRight',
        },
        chatPage: {
            id: 'chatWithRecruiter',
            to: '/dashboard/chat-with-recruiter',
            text: 'Chat With Recruiter',
            icon: 'HeroChatBubbleLeftRight',
        },
        candidatesPage: {
            id: 'candidatesApp',
            to: '/dashboard/candidates',
            text: 'Candidates',
            icon: 'HeroUsers',
            subPages: {
                candidatesPage: {
                    id: 'candidatesPage',
                    to: '/dashboard/candidates',
                    text: 'Candidates',
                    icon: 'HeroUsers',
                },
                cadidateProfileAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/profile',
                    text: 'Candidate Profile',
                    icon: 'HeroIdentification',
                },
                candidateCVEditAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/cv-edit',
                    text: 'Candidate Profile',
                    icon: 'HeroPencilSquare',
                },
            },
        },
        recruiterAppPages: {
            id: 'TeamMembersApp',
            to: '/dashboard/team-members',
            text: 'Team Members',
            icon: 'HeroUserGroup',
            subPages: {
                recruiterPage: {
                    id: 'TeamMembersPage',
                    to: '/dashboard/team-members',
                    text: 'Team Members',
                    icon: 'HeroUserGroup',
                },
                recruiterProfilePage: {
                    id: 'recruitmentProfileApp',
                    to: '/dashboard/recruiter/profile',
                    text: 'Recruitment Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        settingAppPages: {
            id: 'TeamSettingsApp',
            to: '/dashboard/setting',
            text: 'Setting',
            icon: 'HeroUserGroup',
            subPages: {
                settingPage: {
                    id: 'setingMainPage',
                    to: '/dashboard/setting',
                    text: 'Setting',
                    icon: 'HeroUserGroup',
                },
            },
        },
    },
    [Roles.ADMIN]: {
        dashboardAppPages: {
            id: 'dashboardHomeApp',
            to: '/dashboard/',
            text: 'Dashboard',
            icon: 'HeroSquares2X2',
        },
        settingAppPages: {
            id: 'SettingApp',
            to: '/dashboard/setting',
            text: 'Setting',
            icon: 'HeroCog6Tooth',
            subPages: {
                editProfileAppPages: {
                    id: 'editProfileApp',
                    to: '/dashboard/setting',
                    text: 'Edit Profile',
                    icon: 'HeroUser',
                },
                deleteAppPages: {
                    id: 'connectCRMApp',
                    to: '/dashboard/setting/delete-account',
                    text: 'Delete Account',
                    icon: 'HeroTrash',
                },
                subcriptionAppPages: {
                    id: 'subcriptionApp',
                    to: '/dashboard/setting/subcription',
                    text: 'Subscription',
                    icon: 'HeroCreditCard',
                },
            },
        },
        pamentAppPages: {
            id: 'pamentApp',
            to: '/dashboard/payment',
            text: 'Payment',
            icon: 'HeroCreditCard',
        },
        candidatesAppPages: {
            id: 'candidatesApp',
            to: '/dashboard/candidates',
            text: 'Candidates',
            icon: 'HeroUsers',
            subPages: {
                cadidateProfileAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/profile',
                    text: 'Candidate Profile',
                    icon: 'HeroIdentification',
                },
                candidateCVEditAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/cv-edit',
                    text: 'Candidate Profile',
                    icon: 'HeroPencilSquare',
                },
            },
        },
        jobsAppPages: {
            id: 'jobsApp',
            to: '/dashboard/jobs',
            text: 'Jobs',
            icon: 'HeroDocumentText',
            subPages: {
                rootPage: {
                    id: 'jobsApp',
                    to: '/dashboard/jobs',
                    text: 'Jobs',
                    icon: 'HeroDocumentText',
                },
                viewJobAppPages: {
                    id: 'viewJobApp',
                    to: '/dashboard/jobs/view-job',
                    text: 'View Job',
                    icon: 'HeroUser',
                },
            },
        },
        clientsAppPages: {
            id: 'clientsApp',
            to: '/dashboard/clients',
            text: 'Clients',
            icon: 'HeroBriefcase',
            subPages: {
                clientProfileAppPages: {
                    id: 'clientProfileApp',
                    to: '/dashboard/clients/profile',
                    text: 'Client Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        adminAppPages: {
            id: 'clientsApp',
            to: '/dashboard/admin',
            text: 'Admin',
            icon: 'HeroBriefcase',
            subPages: {
                rootPage: {
                    id: 'clientsApp',
                    to: '/dashboard/admin',
                    text: 'Admin',
                    icon: 'HeroUserCircle',
                },
            },
        },
        recruiterAppPages: {
            id: 'recruiterApp',
            to: '/dashboard/recruiter',
            text: 'Recruiter',
            icon: 'HeroScan',
            subPages: {
                recruiterPage: {
                    id: 'recruiterPage',
                    to: '/dashboard/recruiter',
                    text: 'Recruiter',
                    icon: 'HeroScan',
                },
                recruiterProfilePage: {
                    id: 'recruitmentProfileApp',
                    to: '/dashboard/recruiter/profile',
                    text: 'Recruitment Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        taskBoardAppPages: {
            id: 'taskBoardApp',
            to: '/dashboard/task-board',
            text: 'Task Board',
            icon: 'HeroTableCells',
        },
        reportAndAnalyticsAppPages: {
            id: 'reportAndAnalyticsApp',
            to: '/dashboard/report-and-analytics',
            text: 'Report & Analytics',
            icon: 'HeroPresentationChartBar',
        },
        aiInterviewAppPages: {
            id: 'aiInterviewApp',
            to: '/dashboard/ai-interview',
            text: 'AI Interview',
            icon: 'HeroChatBubbleLeftRight',
        },
        KoalaByteAssistantAppPages: {
            id: 'KoalaByteAssistantApp',
            to: '/dashboard/koalabyte-assistant',
            text: 'KoalaByte Assistant',
            icon: 'HeroChatBubbleLeftRight',
        },
        manageTeamAppPages: {
            id: 'manageTeamApp',
            to: '/dashboard/manage-team',
            text: 'Manage Team',
            icon: 'HeroUsers',
            rightIcon: 'HeroArrowUpRight',
            subPages: {
                teammateProfileAppPages: {
                    id: 'teammateProfileApp',
                    to: '/dashboard/manage-team/profile',
                    text: 'Teammate Profile',
                    icon: 'HeroUserGroup',
                },
                chatAppPage: {
                    id: 'chatApp',
                    to: '/dashboard/manage-team/chat',
                    text: 'Chat Page',
                    icon: 'HeroChatBubbleLeftEllipsis',
                },
            },
        },
    },
    [Roles.SUPER_ADMIN]: {
        dashboardAppPages: {
            id: 'dashboardHomeApp',
            to: '/dashboard/',
            text: 'Dashboard',
            icon: 'HeroSquares2X2',
        },
        settingAppPages: {
            id: 'SettingApp',
            to: '/dashboard/setting',
            text: 'Setting',
            icon: 'HeroCog6Tooth',
            subPages: {
                editProfileAppPages: {
                    id: 'editProfileApp',
                    to: '/dashboard/setting',
                    text: 'Edit Profile',
                    icon: 'HeroUser',
                },
                deleteAppPages: {
                    id: 'connectCRMApp',
                    to: '/dashboard/setting/delete-account',
                    text: 'Delete Account',
                    icon: 'HeroTrash',
                },
                subcriptionAppPages: {
                    id: 'subcriptionApp',
                    to: '/dashboard/setting/subcription',
                    text: 'Subscription',
                    icon: 'HeroCreditCard',
                },
            },
        },
        pamentAppPages: {
            id: 'pamentApp',
            to: '/dashboard/payment',
            text: 'Payment',
            icon: 'HeroCreditCard',
        },
        candidatesAppPages: {
            id: 'candidatesApp',
            to: '/dashboard/candidates',
            text: 'Candidates',
            icon: 'HeroUsers',
            subPages: {
                cadidateProfileAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/profile',
                    text: 'Candidate Profile',
                    icon: 'HeroIdentification',
                },
                candidateCVEditAppPage: {
                    id: 'cadidateProfileApp',
                    to: '/dashboard/candidates/cv-edit',
                    text: 'Candidate Profile',
                    icon: 'HeroPencilSquare',
                },
            },
        },
        jobsAppPages: {
            id: 'jobsApp',
            to: '/dashboard/jobs',
            text: 'Jobs',
            icon: 'HeroDocumentText',
            subPages: {
                rootPage: {
                    id: 'jobsApp',
                    to: '/dashboard/jobs',
                    text: 'Jobs',
                    icon: 'HeroDocumentText',
                },
                viewJobAppPages: {
                    id: 'viewJobApp',
                    to: '/dashboard/jobs/view-job-details',
                    text: 'View Job',
                    icon: 'HeroUser',
                },
            },
        },
        clientsAppPages: {
            id: 'clientsApp',
            to: '/dashboard/clients',
            text: 'Clients',
            icon: 'HeroBriefcase',
            subPages: {
                clientProfileAppPages: {
                    id: 'clientProfileApp',
                    to: '/dashboard/clients/profile',
                    text: 'Client Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        adminAppPages: {
            id: 'clientsApp',
            to: '/dashboard/admin',
            text: 'Admin',
            icon: 'HeroBriefcase',
            subPages: {
                rootPage: {
                    id: 'clientsApp',
                    to: '/dashboard/admin',
                    text: 'Admin',
                    icon: 'HeroUserCircle',
                },
            },
        },
        recruiterAppPages: {
            id: 'recruiterApp',
            to: '/dashboard/recruiter',
            text: 'Recruiter',
            icon: 'HeroScan',
            subPages: {
                recruiterPage: {
                    id: 'recruiterPage',
                    to: '/dashboard/recruiter',
                    text: 'Recruiter',
                    icon: 'HeroScan',
                },
                recruiterProfilePage: {
                    id: 'recruitmentProfileApp',
                    to: '/dashboard/recruiter/profile',
                    text: 'Recruitment Profile',
                    icon: 'HeroIdentification',
                },
            },
        },
        taskBoardAppPages: {
            id: 'taskBoardApp',
            to: '/dashboard/task-board',
            text: 'Task Board',
            icon: 'HeroTableCells',
        },
        reportAndAnalyticsAppPages: {
            id: 'reportAndAnalyticsApp',
            to: '/dashboard/report-and-analytics',
            text: 'Report & Analytics',
            icon: 'HeroPresentationChartBar',
        },
        aiInterviewAppPages: {
            id: 'aiInterviewApp',
            to: '/dashboard/ai-interview',
            text: 'AI Interview',
            icon: 'HeroChatBubbleLeftRight',
        },
        KoalaByteAssistantAppPages: {
            id: 'KoalaByteAssistantApp',
            to: '/dashboard/koalabyte-assistant',
            text: 'KoalaByte Assistant',
            icon: 'HeroChatBubbleLeftRight',
        },
        manageTeamAppPages: {
            id: 'manageTeamApp',
            to: '/dashboard/manage-team',
            text: 'Manage Team',
            icon: 'HeroUsers',
            rightIcon: 'HeroArrowUpRight',
            subPages: {
                teammateProfileAppPages: {
                    id: 'teammateProfileApp',
                    to: '/dashboard/manage-team/profile',
                    text: 'Teammate Profile',
                    icon: 'HeroUserGroup',
                },
                chatAppPage: {
                    id: 'chatApp',
                    to: '/dashboard/manage-team/chat',
                    text: 'Chat Page',
                    icon: 'HeroChatBubbleLeftEllipsis',
                },
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
		subPages: {
			confirmationPage: {
				id: 'confirmationPage',
				to: '/signup/confirmation',
				text: 'Confirmation',
				icon: 'HeroArrowRightOnRectangle',
			},
		},
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
	userVerify: {
		id: 'userVerify',
		to: 'user/verify',
		text: 'Confirmation',
		icon: 'HeroArrowRightOnRectangle',
	},
	userPasswrodSet: {
		id: 'userPasswrodSet',
		to: '/set-password',
		text: 'Confirmation',
		icon: 'HeroArrowRightOnRectangle',
	},
};

const pagesConfig = {
	...examplePages,
	...authPages,
};

export default pagesConfig;
