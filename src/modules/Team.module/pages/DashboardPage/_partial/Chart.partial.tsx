import React, { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../../components/ui/Card';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import colors from 'tailwindcss/colors';

const ChartPartial = ({
	series,
	categories,
}: {
	series: ApexOptions['series'];
	categories: string[];
}) => {
	const [state, setState] = React.useState({
		series: series,
		options: {
			colors: [
				colors.blue['500'],
				colors.violet['500'],
				colors.emerald['500'],
				colors.amber['500'],
				colors.rose['500'],
				colors.purple['500'],
			],
			chart: {
				height: 400,
				type: 'line',
				zoom: {
					enabled: false,
				},
			},

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
				curve: 'smooth',
        show: true,
				// width: 2,
				// colors: ['transparent'],
			},
			title: {
				// text: 'Job Openings vs Filled',
				align: 'left', // Explicitly type 'left'
			},
			grid: {
				show: true,
				borderColor: `${colors.zinc['500']}25`,
				strokeDashArray: 0,
				xaxis: {
					lines: {
						show: false,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},

				padding: {
					top: 0,
					right: 10,
					bottom: 0,
					left: 10,
				},
			},
			xaxis: {
				categories: categories,
			},
		} as ApexOptions,
	});
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild className='!block'>
					<CardSubTitle>Performance Metrics</CardSubTitle>
					<CardTitle>Job Openings vs Filled</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<ReactApexChart
					options={state.options}
					series={state.series}
					type='line'
					height={400}
				/>
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
