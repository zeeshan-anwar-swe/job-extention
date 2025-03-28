import React, { useEffect, useRef, useState } from 'react';
import Chart from '../../../components/Chart';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../components/ui/Card';
import { IChartOptions } from '../../../interface/chart.interface';

const ChartPartial = () => {
	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const [chartDimensions, setChartDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

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
				height: 400,
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

	// Observe container dimensions
	useEffect(() => {
		if (!chartContainerRef.current) return;

		const updateDimensions = () => {
			const rect = chartContainerRef.current?.getBoundingClientRect();
			if (rect) {
				setChartDimensions({ width: rect.width, height: rect.height });
			}
		};

		updateDimensions(); // Set initial dimensions

		const observer = new ResizeObserver(() => updateDimensions());
		observer.observe(chartContainerRef.current);

		return () => observer.disconnect(); // Cleanup observer on unmount
	}, []);

	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild className=''>
					<div>
						<p>Performance Metrics</p>
						<CardTitle>Job Openings vs Filled</CardTitle>
					</div>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div ref={chartContainerRef} className=' w-full'>
					{chartDimensions && (
						<Chart
							series={state.series}
							options={state.options}
							type='line'
							width={chartDimensions.width}
							height={400}
						/>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
