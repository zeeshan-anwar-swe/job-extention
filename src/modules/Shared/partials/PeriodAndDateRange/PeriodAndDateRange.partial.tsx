import { useEffect, useState } from 'react'; // Import useState
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import PERIOD from '../../../../constants/periods.constant';
import PeriodButtonsPartial from './_partial/PeriodButtons.partial';
import { DatePicker, Space, ConfigProvider, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const PeriodAndDateRange = ({ activeTab, setActiveTab, setDateRange }: any) => {
	const onChange = (date: any, dateString: any) => {
		typeof setActiveTab === 'function' && setActiveTab(PERIOD.RANGE);
		setDateRange({ startDate: dateString[0], endDate: dateString[1] });
	};

	// State to track dark mode status
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// Function to check and update dark mode status
		const checkDarkMode = () => {
			setIsDarkMode(document.documentElement.classList.contains('dark'));
		};

		// Initial check
		checkDarkMode();

		// Create a MutationObserver to watch for changes to the 'class' attribute on the <html> element
		const observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'class'
				) {
					checkDarkMode(); // Re-check dark mode status if class attribute changes
				}
			}
		});

		// Start observing the <html> element for attribute changes
		observer.observe(document.documentElement, { attributes: true });

		// Clean up the observer when the component unmounts
		return () => observer.disconnect();
	}, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

	return (
		<ConfigProvider
			theme={{
				algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
				// You can further customize specific DatePicker tokens here for finer control
				// components: {
				//     DatePicker: {
				//         activeBg: isDarkMode ? '#333' : '#e6f7ff',
				//     },
				// },
			}}
		>
			{activeTab ? (
				<Subheader>
					<SubheaderLeft>
						<PeriodButtonsPartial activeTab={activeTab} setActiveTab={setActiveTab} />
					</SubheaderLeft>
					<SubheaderRight>
						<Space direction='horizontal'>
							<RangePicker
								defaultValue={[dayjs().startOf('day'), null]}
								className='[&:not(.ant-picker-disabled)]:rounded-full [&:not(.ant-picker-disabled)]:border-2'
								onChange={onChange}
								// Optional: Add dropdownClassName for the calendar popup if needed for specific dark mode styling
								// dropdownClassName={isDarkMode ? 'dark-mode-picker-dropdown' : ''}
							/>
						</Space>
					</SubheaderRight>
				</Subheader>
			) : (
				<Space direction='horizontal'>
					<RangePicker
						defaultValue={[dayjs().startOf('day'), null]}
						className='[&:not(.ant-picker-disabled)]:rounded-full [&:not(.ant-picker-disabled)]:border-2'
						onChange={onChange}
						// Optional: Add dropdownClassName for the calendar popup if needed for specific dark mode styling
						// dropdownClassName={isDarkMode ? 'dark-mode-picker-dropdown' : ''}
					/>
				</Space>
			)}
		</ConfigProvider>
	);
};

export default PeriodAndDateRange;