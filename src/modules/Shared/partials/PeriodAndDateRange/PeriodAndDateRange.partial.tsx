import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import PERIOD from '../../../../constants/periods.constant';
import PeriodButtonsPartial from './_partial/PeriodButtons.partial';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const PeriodAndDateRange = ({ activeTab, setActiveTab, setDateRange }: any) => {
	const onChange = (date: any, dateString: any) => {
		console.log({date, dateString});
		setActiveTab(PERIOD.RANGE);
		setDateRange({ startDate: dateString[0], endDate: dateString[1] });
	};

	return (
		<Subheader>
			<SubheaderLeft>
				<PeriodButtonsPartial activeTab={activeTab} setActiveTab={setActiveTab} />
			</SubheaderLeft>
			<SubheaderRight>
				<Space direction='horizontal'>
					<RangePicker variant='borderless' onChange={onChange} />
				</Space>
			</SubheaderRight>
		</Subheader>
	);
};

export default PeriodAndDateRange;
