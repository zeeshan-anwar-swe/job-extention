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
import { useAuth } from '../context/authContext';
import { useGlobalVoice } from '../hooks/useGlobalVoice';
const App = () => {
	getOS();

	const { userStorage: user } = useAuth();
<<<<<<< Updated upstream
	const [transcriptText, setTranscriptText] = useState('');

	const commandToRouteMap: Record<string, string> = {
        // Dashboard / Home
        'go to dashboard': '/dashboard/',
        'open dashboard': '/dashboard/',
        'show dashboard': '/dashboard/',
        'take me to dashboard': '/dashboard/',
        'navigate to dashboard': '/dashboard/',
        'back to dashboard': '/dashboard/',
        'bring up dashboard': '/dashboard/',
        'dashboard page': '/dashboard/',
        'access dashboard': '/dashboard/',
        'go home': '/dashboard/',
        'open home': '/dashboard/',
        'take me home': '/dashboard/',
        'navigate home': '/dashboard/',
        'go to home': '/dashboard/',
        'show home': '/dashboard/',
        'home page': '/dashboard/',
        'main screen': '/dashboard/',
        'start screen': '/dashboard/',
        'landing page': '/dashboard/',
        'back to home': '/dashboard/',

        // Task Board
        'go to task board': '/dashboard/task-board',
        'open task board': '/dashboard/task-board',
        'show task board': '/dashboard/task-board',
        'take me to task board': '/dashboard/task-board',
        'navigate to task board': '/dashboard/task-board',
        'back to task board': '/dashboard/task-board',
        'bring up task board': '/dashboard/task-board',
        'task board page': '/dashboard/task-board',
        'access task board': '/dashboard/task-board',
        'go to task board page': '/dashboard/task-board',
        'open task board page': '/dashboard/task-board',
        'show task board page': '/dashboard/task-board',
        'take me to task board page': '/dashboard/task-board',
        'navigate to task board page': '/dashboard/task-board',
        'back to task board page': '/dashboard/task-board',
        'bring up task board page': '/dashboard/task-board',
        'access task board page': '/dashboard/task-board',

        // Profile
        'go to profile': '/dashboard/settings',
        'open profile': '/dashboard/settings',
        'show profile': '/dashboard/settings',
        'navigate to profile': '/dashboard/settings',
        'profile page': '/dashboard/settings',
        'view profile': '/dashboard/settings',
        'access profile': '/dashboard/settings',
        'my profile': '/dashboard/settings',
        'take me to my profile': '/dashboard/settings',
        'let me see my profile': '/dashboard/settings',
        'check my profile': '/dashboard/settings',
        'go to my account': '/dashboard/settings',
        'show my account': '/dashboard/settings',
        'account page': '/dashboard/settings',
        'account details': '/dashboard/settings',

        // Client
        'go to client': '/dashboard/clients',
        'go to client page': '/dashboard/clients',
        'open client': '/dashboard/clients',
        'open page': '/dashboard/clients',
        'show client': '/dashboard/clients',
        'take me to client': '/dashboard/clients',
        'navigate to client': '/dashboard/clients',
        'navigate to client page': '/dashboard/clients',
        'back to client': '/dashboard/clients',
        'bring up client': '/dashboard/clients',
        'client page': '/dashboard/clients',
        'access client': '/dashboard/clients',
        'go to clients': '/dashboard/clients',
        'open clients': '/dashboard/clients',
        'show clients': '/dashboard/clients',
        'clients page': '/dashboard/clients',
        'view clients': '/dashboard/clients',
        'client list': '/dashboard/clients',
        'clients list': '/dashboard/clients',
        'manage clients': '/dashboard/clients',
        'display clients': '/dashboard/clients',
        'load client section': '/dashboard/clients',
        'see all clients': '/dashboard/clients',
        'client dashboard': '/dashboard/clients',
        'clients dashboard': '/dashboard/clients',
        'client overview': '/dashboard/clients',
        'clients overview': '/dashboard/clients',
        'client management': '/dashboard/clients',
        'clients management': '/dashboard/clients',
        'go to client portal': '/dashboard/clients',
        'open client directory': '/dashboard/clients',
        'show client records': '/dashboard/clients',

        // Report and Analytics
        'go to reports and analytics': '/dashboard/report-and-analytics',
        'open reports and analytics': '/dashboard/report-and-analytics',
        'show reports and analytics': '/dashboard/report-and-analytics',
        'take me to reports and analytics': '/dashboard/report-and-analytics',
        'navigate to reports and analytics': '/dashboard/report-and-analytics',
        'reports and analytics page': '/dashboard/report-and-analytics',
        'access reports and analytics': '/dashboard/report-and-analytics',
        'view reports': '/dashboard/report-and-analytics',
        'see analytics': '/dashboard/report-and-analytics',
        'display reports': '/dashboard/report-and-analytics',
        'show analytics': '/dashboard/report-and-analytics',
        'go to analytics': '/dashboard/report-and-analytics',
        'open analytics': '/dashboard/report-and-analytics',
        'take me to analytics': '/dashboard/report-and-analytics',
        'navigate analytics': '/dashboard/report-and-analytics',
        'analytics page': '/dashboard/report-and-analytics',
        'report section': '/dashboard/report-and-analytics',
        'analytics section': '/dashboard/report-and-analytics',

        // AI Interview
        'go to ai interview': '/dashboard/ai-interview',
        'open ai interview': '/dashboard/ai-interview',
        'show ai interview': '/dashboard/ai-interview',
        'take me to ai interview': '/dashboard/ai-interview',
        'navigate to ai interview': '/dashboard/ai-interview',
        'start ai interview': '/dashboard/ai-interview',
        'begin ai interview': '/dashboard/ai-interview',
        'access ai interview': '/dashboard/ai-interview',
        'ai interview page': '/dashboard/ai-interview',
        'interview with ai': '/dashboard/ai-interview',
        'talk to ai': '/dashboard/ai-interview',
        'virtual interview': '/dashboard/ai-interview',
        'conduct ai interview': '/dashboard/ai-interview',
        'initiate ai interview': '/dashboard/ai-interview',
        'launch ai interview': '/dashboard/ai-interview',

        // Settings
        'go to settings': '/dashboard/settings',
        'go to setting': '/dashboard/settings',
        'open settings': '/dashboard/settings',
        'show settings': '/dashboard/settings',
        'navigate to settings': '/dashboard/settings',
        'settings page': '/dashboard/settings',
        'access settings': '/dashboard/settings',
        'account settings': '/dashboard/settings',
        'change my settings': '/dashboard/settings',
        'edit settings': '/dashboard/settings',
        'configure settings': '/dashboard/settings',
        'open configuration': '/dashboard/settings',
        'system settings': '/dashboard/settings',
        'adjust preferences': '/dashboard/settings',
        'edit preferences': '/dashboard/settings',
        'update settings': '/dashboard/settings',
        'let me change settings': '/dashboard/settings',

        // Candidates
        'go to candidates': '/dashboard/candidates',
        'show candidates': '/dashboard/candidates',
        'open candidates': '/dashboard/candidates',
        'navigate to candidates': '/dashboard/candidates',
        'view candidates': '/dashboard/candidates',
        'candidates page': '/dashboard/candidates',
        'candidate list': '/dashboard/candidates',
        'candidate screen': '/dashboard/candidates',
        'bring up candidates': '/dashboard/candidates',
        'access candidates': '/dashboard/candidates',
        'list of candidates': '/dashboard/candidates',
        'find candidates': '/dashboard/candidates',
        'who are the candidates': '/dashboard/candidates',
        'candidate directory': '/dashboard/candidates',
        'check candidates': '/dashboard/candidates',

        // Jobs
        'go to jobs': '/dashboard/jobs',
        'open jobs': '/dashboard/jobs',
        'show jobs': '/dashboard/jobs',
        'view jobs': '/dashboard/jobs',
        'navigate to jobs': '/dashboard/jobs',
        'jobs page': '/dashboard/jobs',
        'job list': '/dashboard/jobs',
        'available jobs': '/dashboard/jobs',
        'job board': '/dashboard/jobs',
        'check out jobs': '/dashboard/jobs',
        'browse jobs': '/dashboard/jobs',
        'find jobs': '/dashboard/jobs',
        'what jobs are available': '/dashboard/jobs',
        'show me jobs': '/dashboard/jobs',
        'job openings': '/dashboard/jobs',
        'job screen': '/dashboard/jobs',
        'go to job board': '/dashboard/jobs',
        'list of jobs': '/dashboard/jobs',

        // Job create
        'create job': '/dashboard/jobs/create-job',
        'add job': '/dashboard/jobs/create-job',
        'new job': '/dashboard/jobs/create-job',
        'post a job': '/dashboard/jobs/create-job',
        'make a new job': '/dashboard/jobs/create-job',
        'start a job posting': '/dashboard/jobs/create-job',
        'open job creation': '/dashboard/jobs/create-job',
        'go to create job': '/dashboard/jobs/create-job',
        'navigate to create job': '/dashboard/jobs/create-job',
        'add a new job': '/dashboard/jobs/create-job',
        'register job': '/dashboard/jobs/create-job',
        'submit job': '/dashboard/jobs/create-job',
        'job creation page': '/dashboard/jobs/create-job',
        'go to job creation': '/dashboard/jobs/create-job',
        'launch job post': '/dashboard/jobs/create-job',
        'initiate job post': '/dashboard/jobs/create-job',
        'create a new job': '/dashboard/jobs/create-job',

        // KoalaByte Assistant
        'go to koalabyte assistant': '/dashboard/koalabyte-assistant',
        'open koalabyte assistant': '/dashboard/koalabyte-assistant',
        'show koalabyte assistant': '/dashboard/koalabyte-assistant',
        'take me to koalabyte assistant': '/dashboard/koalabyte-assistant',
        'navigate to koalabyte assistant': '/dashboard/koalabyte-assistant',
        'koalabyte assistant page': '/dashboard/koalabyte-assistant',
        'access koalabyte assistant': '/dashboard/koalabyte-assistant',
        'interact with koalabyte assistant': '/dashboard/koalabyte-assistant',
        'talk to koalabyte assistant': '/dashboard/koalabyte-assistant',
        'open the assistant': '/dashboard/koalabyte-assistant',
        'go to the assistant': '/dashboard/koalabyte-assistant',
        'show the assistant': '/dashboard/koalabyte-assistant',
        'call koalabyte assistant': '/dashboard/koalabyte-assistant',
        'engage koalabyte assistant': '/dashboard/koalabyte-assistant',

        // Test for Candidate
        'go to test for candidate': '/dashboard/test-for-cadidate',
        'open test for candidate': '/dashboard/test-for-cadidate',
        'show test for candidate': '/dashboard/test-for-cadidate',
        'take me to test for candidate': '/dashboard/test-for-cadidate',
        'navigate to test for candidate': '/dashboard/test-for-cadidate',
        'candidate test page': '/dashboard/test-for-cadidate',
        'access candidate test': '/dashboard/test-for-cadidate',
        'start candidate test': '/dashboard/test-for-cadidate',
        'begin candidate test': '/dashboard/test-for-cadidate',
        'open the test': '/dashboard/test-for-cadidate',
        'go to the test': '/dashboard/test-for-cadidate',
        'show the test': '/dashboard/test-for-cadidate',
        'take candidate test': '/dashboard/test-for-cadidate',
        'administer candidate test': '/dashboard/test-for-cadidate',
        'view candidate test': '/dashboard/test-for-cadidate',

        // Integrations
        'go to integrations': '/dashboard/integrations',
        'open integrations': '/dashboard/integrations',
        'show integrations': '/dashboard/integrations',
        'take me to integrations': '/dashboard/integrations',
        'navigate to integrations': '/dashboard/integrations',
        'integrations page': '/dashboard/integrations',
        'access integrations': '/dashboard/integrations',
        'view integrations': '/dashboard/integrations',
        'manage integrations': '/dashboard/integrations',
        'see integrations': '/dashboard/integrations',
        'integration settings': '/dashboard/integrations',
        'connect integrations': '/dashboard/integrations',
        'go to connect integrations': '/dashboard/integrations',
        'open connect integrations': '/dashboard/integrations',

        // Manage Team
        'go to manage team': '/dashboard/manage-team',
        'open manage team': '/dashboard/manage-team',
        'show manage team': '/dashboard/manage-team',
        'take me to manage team': '/dashboard/manage-team',
        'navigate to manage team': '/dashboard/manage-team',
        'manage team page': '/dashboard/manage-team',
        'access manage team': '/dashboard/manage-team',
        'team management': '/dashboard/manage-team',
        'manage team members': '/dashboard/manage-team',
        'view team': '/dashboard/manage-team',
        'see team members': '/dashboard/manage-team',
        'team settings': '/dashboard/manage-team',
        'go to team management': '/dashboard/manage-team',
        'open team management': '/dashboard/manage-team',
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
=======
	const { transcriptText } = useGlobalVoice();
>>>>>>> Stashed changes

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
