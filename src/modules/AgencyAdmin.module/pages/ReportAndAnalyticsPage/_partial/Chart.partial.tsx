import { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import Chart from '../../../../../components/Chart2';
import { IChartOptions } from '../../../../../interface/chart.interface';

const ChartPartial = ({chartData,  categories }:any) => {

	
	

	


	const [state] = useState<IChartOptions>({
		series: chartData,
			options: {
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					borderRadiusWhenStacked: 'all',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				// width: 2,
				// colors: ['transparent'],
			},
			xaxis: {
				categories,
				// : period.text === 'Day'
				// 		? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				// 		: period.text === 'Week'
				// 			? ['weak 1', 'weak 2', 'weak 3','weak 3','weak 4','weak 5']
				// 			: [
				// 					'Jan',
				// 					'Feb',
				// 					'Mar',
				// 					'Apr',
				// 					'May',
				// 					'Jun',
				// 					'Jul',
				// 					'Aug',
				// 					'Sep',
				// 					'Oct',
				// 					'Nov',
				// 					'Dec',
				// 				],
			},
			yaxis: {
				title: {
					text: 'Jobs',
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter(val) {
						return `${val}`;
					},
				},
			},
		},
	});
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Chart</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<Chart series={state.series} options={state.options} type='bar' height={500} />
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
