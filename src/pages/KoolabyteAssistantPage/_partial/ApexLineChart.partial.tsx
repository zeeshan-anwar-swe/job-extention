import React, { useState } from 'react';
import { IChartOptions } from '../../../interface/chart.interface';
import Chart from '../../../components/Chart';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../components/ui/Card';

const ApexLineChartPartial = () => {
	const [state] = useState<IChartOptions>({
		series: [
			{
				name: 'Jobs',
				data: [180, 217, 196, 243, 223, 298, 321],
			},
			{
				name: 'hired',
				data: [121, 27, 178, 143, 123, 498, 321],
			},
			{
				name: 'Interview',
				data: [21, 117, 112, 13, 33, 308, 121],
			},
		],
		options: {
			chart: {
				height: 300,
				type: 'line',
				toolbar: {
					show: false,
				},
			},
			dataLabels: {
				// enabled: true,
			},
			stroke: {
				curve: 'smooth',
			},
			markers: {
				size: 0,
			},
			xaxis: {
				categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				title: {
					text: 'Days',
				},
			},
			yaxis: {
				title: {
					text: 'Views',
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
				<Chart
					series={state.series}
					options={state.options}
					type={state.options.chart?.type}
					height={400}
				/>
				{/* <Chart series={state.series} options={state.options} type='bar' height={400} /> */}
			</CardBody>
		</Card>
	);
};

export default ApexLineChartPartial;
