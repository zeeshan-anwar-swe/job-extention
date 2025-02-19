import React, { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../components/ui/Card';
import Chart from '../../../components/Chart';
import { IChartOptions } from '../../../interface/chart.interface';

const ChartPartial = () => {
	const [state] = useState<IChartOptions>({
		series: [
			{
				name: 'Jobs Applied',
				data: [61, 58, 63, 60],
			},
			{
				name: 'Total Hirings',
				data: [87, 105, 91, 114],
			},
			{
				name: 'Pending Jobs',
				data: [45, 48, 52, 53],
			},
			{
				name: 'Rejected Jobs',
				data: [45, 48, 52, 53],
			},
		],
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
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories: ['Jun', 'Jul', 'Aug', 'Sep'],
			},
			yaxis: {
				title: {
					text: '$ (thousands)',
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter(val) {
						return `$ ${val} thousands`;
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
				<Chart series={state.series} options={state.options} type='bar' height={400} />
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
