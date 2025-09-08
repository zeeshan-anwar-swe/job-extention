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
	const { transcriptText } = useGlobalVoice();

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
						background: '#E0E2F4',
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
