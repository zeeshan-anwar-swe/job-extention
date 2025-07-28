import React, { useState } from 'react';
import { IChartOptions } from '../../../../../interface/chart.interface';
import Chart from '../../../../../components/Chart';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import Label from '../../../../../components/form/Label';

const ApexLineChartPartial = () => {
	const [state] = useState<IChartOptions>({
		series: [
			{
				name: 'Unsubscribes',
				data: [180, 217, 196, 243, 223, 298, 321],
			},
			{
				name: 'New Subscribers',
				data: [121, 27, 178, 143, 123, 498, 321],
			},
			{
				name: 'New Sign Up',
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
				categories: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				title: {
					text: 'Days',
				},
			},
		},
	});
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild className='!flex-col !items-start !gap-0'>
					<Label htmlFor='performance'> Performance Metrics</Label>
					<CardTitle>User Growth Overview</CardTitle>
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
