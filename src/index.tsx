import './i18n';
import './styles/index.css';
import App from './App/App';
import './styles/vendors.css';
import { store } from './store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import 'react-date-range/dist/styles.css';
import reportWebVitals from './reportWebVitals';
import 'react-date-range/dist/theme/default.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { SocketProvider } from './context/socketContext';
import { ThemeContextProvider } from './context/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<ThemeContextProvider>
				<BrowserRouter>
					<AuthProvider>
						<SocketProvider>
							<App />
						</SocketProvider>
					</AuthProvider>
				</BrowserRouter>
			</ThemeContextProvider>
		</Provider>
	</StrictMode>,
);

reportWebVitals();
