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
const App = () => {
	getOS();

	const { fontSize } = useFontSize();
	dayjs.extend(localizedFormat);

	return (
		<>
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
