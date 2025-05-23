import { useState, useMemo, useEffect } from 'react';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import PeriodButtonsPartial from './_partial/PeriodButtons.partial';
import PERIOD, { TPeriod } from '../../../../constants/periods.constant';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import dayjs from 'dayjs';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import i18n from '../../../../i18n';
import themeConfig from '../../../../config/theme.config';
import colors from 'tailwindcss/colors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';

export const getDefaultRangeForPeriod = (period: TPeriod): Range => {
	const today = dayjs();

	switch (period) {
		case PERIOD.DAY:
			return {
				startDate: today.toDate(),
				endDate: today.toDate(),
				key: 'selection',
			};
		case PERIOD.WEEK:
			return {
				startDate: today.startOf('week').toDate(),
				endDate: today.endOf('week').toDate(),
				key: 'selection',
			};
		case PERIOD.MONTH:
			return {
				startDate: today.startOf('month').toDate(),
				endDate: today.endOf('month').toDate(),
				key: 'selection',
			};
		case PERIOD.RANGE:
			return {
				startDate: today.subtract(0, 'days').toDate(), // Default 7-day range
				endDate: today.toDate(),
				key: 'selection',
			};
		default:
			return {
				startDate: today.toDate(),
				endDate: today.toDate(),
				key: 'selection',
			};
	}
};

const formatDateRange = (range: Range, period: TPeriod): string => {
	const { startDate, endDate } = range;
	if (!startDate || !endDate) return '';

	const start = dayjs(startDate).locale(i18n.language);
	const end = dayjs(endDate).locale(i18n.language);

	if (period === PERIOD.RANGE || !start.isSame(end, 'day')) {
		if (start.isSame(end, 'month')) {
			return `${start.format('MMMM D')} - ${end.format('D, YYYY')}`;
		}
		if (start.isSame(end, 'year')) {
			return `${start.format('MMMM D')} - ${end.format('MMMM D, YYYY')}`;
		}
		return `${start.format('LL')} - ${end.format('LL')}`;
	}

	switch (period) {
		case PERIOD.DAY:
			return start.format('LL');
		case PERIOD.WEEK:
			return `${start.format('MMMM D')} - ${end.format('D, YYYY')}`;
		case PERIOD.MONTH:
			return start.format('MMMM, YYYY');
		default:
			return start.format('LL');
	}
};

const PeriodAndDateRange = ({ activeTab, setActiveTab, dateRange, setDateRange }: any) => {
	// Update date range when active tab changes
	  useEffect(() => {
        setDateRange(getDefaultRangeForPeriod(activeTab));
    }, []);

	 const handleDateRangeChange = (rangesByKey: RangeKeyDict) => {
        const { selection } = rangesByKey;
        const { startDate, endDate } = selection;

        if (!startDate || !endDate) return;

        // Always set to RANGE when manually selecting dates
        setActiveTab(PERIOD.RANGE);
        setDateRange(selection);
    };

    const formattedDateRange = useMemo(
        () => formatDateRange(dateRange, activeTab),
        [dateRange, activeTab],
    );

	return (
		<Subheader>
			<SubheaderLeft>
				<PeriodButtonsPartial activeTab={activeTab} setActiveTab={setActiveTab} />
			</SubheaderLeft>
			<SubheaderRight>
				<Dropdown>
					<DropdownToggle>
						<Button icon='HeroCalendarDays'>{formattedDateRange}</Button>
					</DropdownToggle>
					<DropdownMenu className='!p-0'>
						<DateRangePicker
							onChange={handleDateRangeChange}
							moveRangeOnFirstSelection={true}
							months={2}
							ranges={[dateRange]}
							direction='horizontal'
							rangeColors={[
								colors[themeConfig.themeColor][themeConfig.themeColorShade],
								colors.emerald[themeConfig.themeColorShade],
								colors.amber[themeConfig.themeColorShade],
							]}
							showDateDisplay={false}
						/>
					</DropdownMenu>
				</Dropdown>
			</SubheaderRight>
		</Subheader>
	);
};

export default PeriodAndDateRange;
