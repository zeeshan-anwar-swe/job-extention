import React, { useEffect, useRef, useState } from 'react';
import Chart from '../../../../components/Chart';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';
import { IChartOptions } from '../../../../interface/chart.interface';

const ChartPartial = () => {
	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const [chartDimensions, setChartDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	const [chartState] = useState<IChartOptions>({
		series: [
			{
				name: 'Net Profit',
				data: [61, 58, 63, 60, 66],
			},
			{
				name: 'Revenue',
				data: [87, 105, 91, 114, 94],
			},
			{
				name: 'Free Cash Flow',
				data: [45, 48, 52, 53, 41],
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
				categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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
				<CardHeaderChild>
					<CardTitle>Chart</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div ref={chartContainerRef} className='h-96 w-full'>
					{chartDimensions && (
						<Chart
							series={chartState.series}
							options={chartState.options}
							type='bar'
							width={chartDimensions.width}
							height={chartDimensions.height}
						/>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
