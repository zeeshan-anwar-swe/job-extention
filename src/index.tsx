import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { ThemeContextProvider } from './context/themeContext';
import { AuthProvider } from './context/authContext';
import App from './App/App';

import './i18n';
import './styles/index.css';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './styles/vendors.css';
import { store } from './store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeContextProvider>
				<BrowserRouter>
					<AuthProvider>
						<App />
					</AuthProvider>
				</BrowserRouter>
			</ThemeContextProvider>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
