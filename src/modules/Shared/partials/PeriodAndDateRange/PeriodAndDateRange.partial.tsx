import { useEffect } from 'react';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import PERIOD from '../../../../constants/periods.constant';
import PeriodButtonsPartial from './_partial/PeriodButtons.partial';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const PeriodAndDateRange = ({ activeTab, setActiveTab, setDateRange }: any) => {
	const onChange = (date: any, dateString: any) => {
		console.log({ date, dateString });
		typeof setActiveTab === 'function' && setActiveTab(PERIOD.RANGE);
		setDateRange({ startDate: dateString[0], endDate: dateString[1] });
	};

	return activeTab ? (
		<Subheader>
			<SubheaderLeft>
				<PeriodButtonsPartial activeTab={activeTab} setActiveTab={setActiveTab} />
			</SubheaderLeft>
			<SubheaderRight>
				<Space direction='horizontal'>
					<RangePicker
						defaultValue={[dayjs().startOf('day'), null]}
						className=' [&:not(.ant-picker-disabled)]:rounded-full [&:not(.ant-picker-disabled)]:border-2'
						onChange={onChange}
					/>
				</Space>
			</SubheaderRight>
		</Subheader>
	) : (
		<Space direction='horizontal'>
			<RangePicker
				defaultValue={[dayjs().startOf('day'), null]}
				className=' [&:not(.ant-picker-disabled)]:rounded-full [&:not(.ant-picker-disabled)]:border-2'
				onChange={onChange}
			/>
		</Space>
	);
};

export default PeriodAndDateRange;
