import dayjs from 'dayjs';
import getOS from '../utils/getOS.util';
import useFontSize from '../hooks/useFontSize';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import AsideRouter from '../components/router/AsideRouter';
import Wrapper from '../components/layouts/Wrapper/Wrapper';
import HeaderRouter from '../components/router/HeaderRouter';
import FooterRouter from '../components/router/FooterRouter';
import ContentRouter from '../components/router/ContentRouter';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const App = () => {
	const navigate = useNavigate();
	getOS();

	const { userStorage: user } = useAuth();
	const [transcriptText, setTranscriptText] = useState('');

	const commandToRouteMap: Record<string, string> = {
		// Dashboard / Home
		'go to dashboard': '/',
		'open dashboard': '/',
		'show dashboard': '/',
		'take me to dashboard': '/',
		'navigate to dashboard': '/',
		'back to dashboard': '/',
		'bring up dashboard': '/',
		'dashboard page': '/',
		'access dashboard': '/',
		'go home': '/',
		'open home': '/',
		'take me home': '/',
		'navigate home': '/',
		'go to home': '/',
		'show home': '/',
		'home page': '/',
		'main screen': '/',
		'start screen': '/',
		'landing page': '/',
		'back to home': '/',

		// Task Board
		'go to task board': '/task-board',
		'open task board': '/task-board',
		'show task board': '/task-board',
		'take me to task board': '/task-board',
		'navigate to task board': '/task-board',
		'back to task board': '/task-board',
		'bring up task board': '/task-board',
		'task board page': '/task-board',
		'access task board': '/task-board',
		'go to task board page': '/task-board',
		'open task board page': '/task-board',
		'show task board page': '/task-board',
		'take me to task board page': '/task-board',
		'navigate to task board page': '/task-board',
		'back to task board page': '/task-board',
		'bring up task board page': '/task-board',
		'access task board page': '/task-board',

		// Profile
		'go to profile': '/settings',
		'open profile': '/settings',
		'show profile': '/settings',
		'navigate to profile': '/settings',
		'profile page': '/settings',
		'view profile': '/settings',
		'access profile': '/settings',
		'my profile': '/settings',
		'take me to my profile': '/settings',
		'let me see my profile': '/settings',
		'check my profile': '/settings',
		'go to my account': '/settings',
		'show my account': '/settings',
		'account page': '/settings',
		'account details': '/settings',

		// Client
		'go to client': '/clients',
		'go to client page': '/clients',
		'open client': '/clients',
		'open page': '/clients',
		'show client': '/clients',
		'take me to client': '/clients',
		'navigate to client': '/clients',
		'navigate to client page': '/clients',
		'back to client': '/clients',
		'bring up client': '/clients',
		'client page': '/clients',
		'access client': '/clients',
		'go to clients': '/clients',
		'open clients': '/clients',
		'show clients': '/clients',
		'clients page': '/clients',
		'view clients': '/clients',
		'client list': '/clients',
		'clients list': '/clients',
		'manage clients': '/clients',
		'display clients': '/clients',
		'load client section': '/clients',
		'see all clients': '/clients',
		'client dashboard': '/clients',
		'clients dashboard': '/clients',
		'client overview': '/clients',
		'clients overview': '/clients',
		'client management': '/clients',
		'clients management': '/clients',
		'go to client portal': '/clients',
		'open client directory': '/clients',
		'show client records': '/clients',

		// Report and Analytics
		'go to reports and analytics': '/report-and-analytics',
		'open reports and analytics': '/report-and-analytics',
		'show reports and analytics': '/report-and-analytics',
		'take me to reports and analytics': '/report-and-analytics',
		'navigate to reports and analytics': '/report-and-analytics',
		'reports and analytics page': '/report-and-analytics',
		'access reports and analytics': '/report-and-analytics',
		'view reports': '/report-and-analytics',
		'see analytics': '/report-and-analytics',
		'display reports': '/report-and-analytics',
		'show analytics': '/report-and-analytics',
		'go to analytics': '/report-and-analytics',
		'open analytics': '/report-and-analytics',
		'take me to analytics': '/report-and-analytics',
		'navigate analytics': '/report-and-analytics',
		'analytics page': '/report-and-analytics',
		'report section': '/report-and-analytics',
		'analytics section': '/report-and-analytics',

		// AI Interview
		'go to ai interview': '/ai-interview',
		'open ai interview': '/ai-interview',
		'show ai interview': '/ai-interview',
		'take me to ai interview': '/ai-interview',
		'navigate to ai interview': '/ai-interview',
		'start ai interview': '/ai-interview',
		'begin ai interview': '/ai-interview',
		'access ai interview': '/ai-interview',
		'ai interview page': '/ai-interview',
		'interview with ai': '/ai-interview',
		'talk to ai': '/ai-interview',
		'virtual interview': '/ai-interview',
		'conduct ai interview': '/ai-interview',
		'initiate ai interview': '/ai-interview',
		'launch ai interview': '/ai-interview',

		// Settings
		'go to settings': '/settings',
		'go to setting': '/settings',
		'open settings': '/settings',
		'show settings': '/settings',
		'navigate to settings': '/settings',
		'settings page': '/settings',
		'access settings': '/settings',
		'account settings': '/settings',
		'change my settings': '/settings',
		'edit settings': '/settings',
		'configure settings': '/settings',
		'open configuration': '/settings',
		'system settings': '/settings',
		'adjust preferences': '/settings',
		'edit preferences': '/settings',
		'update settings': '/settings',
		'let me change settings': '/settings',

		// Candidates
		'go to candidates': '/candidates',
		'show candidates': '/candidates',
		'open candidates': '/candidates',
		'navigate to candidates': '/candidates',
		'view candidates': '/candidates',
		'candidates page': '/candidates',
		'candidate list': '/candidates',
		'candidate screen': '/candidates',
		'bring up candidates': '/candidates',
		'access candidates': '/candidates',
		'list of candidates': '/candidates',
		'find candidates': '/candidates',
		'who are the candidates': '/candidates',
		'candidate directory': '/candidates',
		'check candidates': '/candidates',

		// Jobs
		'go to jobs': '/jobs',
		'open jobs': '/jobs',
		'show jobs': '/jobs',
		'view jobs': '/jobs',
		'navigate to jobs': '/jobs',
		'jobs page': '/jobs',
		'job list': '/jobs',
		'available jobs': '/jobs',
		'job board': '/jobs',
		'check out jobs': '/jobs',
		'browse jobs': '/jobs',
		'find jobs': '/jobs',
		'what jobs are available': '/jobs',
		'show me jobs': '/jobs',
		'job openings': '/jobs',
		'job screen': '/jobs',
		'go to job board': '/jobs',
		'list of jobs': '/jobs',

		// Job create
		'create job': '/jobs/create-job',
		'add job': '/jobs/create-job',
		'new job': '/jobs/create-job',
		'post a job': '/jobs/create-job',
		'make a new job': '/jobs/create-job',
		'start a job posting': '/jobs/create-job',
		'open job creation': '/jobs/create-job',
		'go to create job': '/jobs/create-job',
		'navigate to create job': '/jobs/create-job',
		'add a new job': '/jobs/create-job',
		'register job': '/jobs/create-job',
		'submit job': '/jobs/create-job',
		'job creation page': '/jobs/create-job',
		'go to job creation': '/jobs/create-job',
		'launch job post': '/jobs/create-job',
		'initiate job post': '/jobs/create-job',
		'create a new job': '/jobs/create-job',

		// KoalaByte Assistant
		'go to koalabyte assistant': '/koalabyte-assistant',
		'open koalabyte assistant': '/koalabyte-assistant',
		'show koalabyte assistant': '/koalabyte-assistant',
		'take me to koalabyte assistant': '/koalabyte-assistant',
		'navigate to koalabyte assistant': '/koalabyte-assistant',
		'koalabyte assistant page': '/koalabyte-assistant',
		'access koalabyte assistant': '/koalabyte-assistant',
		'interact with koalabyte assistant': '/koalabyte-assistant',
		'talk to koalabyte assistant': '/koalabyte-assistant',
		'open the assistant': '/koalabyte-assistant',
		'go to the assistant': '/koalabyte-assistant',
		'show the assistant': '/koalabyte-assistant',
		'call koalabyte assistant': '/koalabyte-assistant',
		'engage koalabyte assistant': '/koalabyte-assistant',

		// Test for Candidate
		'go to test for candidate': '/test-for-cadidate',
		'open test for candidate': '/test-for-cadidate',
		'show test for candidate': '/test-for-cadidate',
		'take me to test for candidate': '/test-for-cadidate',
		'navigate to test for candidate': '/test-for-cadidate',
		'candidate test page': '/test-for-cadidate',
		'access candidate test': '/test-for-cadidate',
		'start candidate test': '/test-for-cadidate',
		'begin candidate test': '/test-for-cadidate',
		'open the test': '/test-for-cadidate',
		'go to the test': '/test-for-cadidate',
		'show the test': '/test-for-cadidate',
		'take candidate test': '/test-for-cadidate',
		'administer candidate test': '/test-for-cadidate',
		'view candidate test': '/test-for-cadidate',

		// Integrations
		'go to integrations': '/integrations',
		'open integrations': '/integrations',
		'show integrations': '/integrations',
		'take me to integrations': '/integrations',
		'navigate to integrations': '/integrations',
		'integrations page': '/integrations',
		'access integrations': '/integrations',
		'view integrations': '/integrations',
		'manage integrations': '/integrations',
		'see integrations': '/integrations',
		'integration settings': '/integrations',
		'connect integrations': '/integrations',
		'go to connect integrations': '/integrations',
		'open connect integrations': '/integrations',

		// Manage Team
		'go to manage team': '/manage-team',
		'open manage team': '/manage-team',
		'show manage team': '/manage-team',
		'take me to manage team': '/manage-team',
		'navigate to manage team': '/manage-team',
		'manage team page': '/manage-team',
		'access manage team': '/manage-team',
		'team management': '/manage-team',
		'manage team members': '/manage-team',
		'view team': '/manage-team',
		'see team members': '/manage-team',
		'team settings': '/manage-team',
		'go to team management': '/manage-team',
		'open team management': '/manage-team',
	};

	useEffect(() => {
		const handleSpeech = (e: any) => {
			const transcript: string = e.detail.toLowerCase();
			setTranscriptText(transcript); // Set the transcript text

			setTimeout(() => {
				setTranscriptText('');
			}, 3000); // Hide after 3 seconds

			for (const [command, route] of Object.entries(commandToRouteMap)) {
				if (transcript.includes(command)) {
					console.log(`Navigating to ${route}`);
					navigate(route);
					break;
				}
			}
		};

		window.addEventListener('FROM_IFRAME_SPEECH', handleSpeech);
		return () => window.removeEventListener('FROM_IFRAME_SPEECH', handleSpeech);
	}, [navigate]);

	const { fontSize } = useFontSize();
	dayjs.extend(localizedFormat);

	return (
		<>
			{user && transcriptText && (
				<div
					style={{
						position: 'fixed',
						top: '20px',
						left: '50%',
						transform: 'translateX(-50%)',
						background: 'rgba(0, 0, 0, 0.8)',
						color: 'white',
						padding: '10px 20px',
						borderRadius: '20px',
						zIndex: 9999,
						fontSize: '16px',
						transition: 'opacity 0.3s ease-in-out',
					}}>
					{transcriptText}
				</div>
			)}
			<style>{`:root {font-size: ${fontSize}px}`}</style>
			<div data-component-name='App' className='flex grow flex-col'>
				<AsideRouter />
				<Wrapper>
					<HeaderRouter />
					<ContentRouter />
					<FooterRouter />
				</Wrapper>
				<Toaster
					position='top-right'
					toastOptions={{
						success: {
							iconTheme: {
								primary: '#10b981',
								secondary: 'white',
							},
						},
						error: {
							iconTheme: {
								primary: '#ef4444',
								secondary: 'white',
							},
						},
					}}
				/>
			</div>
		</>
	);
};

export default App;
