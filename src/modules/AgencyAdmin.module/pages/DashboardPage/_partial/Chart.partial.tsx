import { useEffect, useRef, useState } from 'react';
import Chart from '../../../../../components/Chart';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { IChartOptions } from '../../../../../interface/chart.interface';
import { TPeriod } from '../../../../../constants/periods.constant';

const ChartPartial = ({ period, series, categories }: { period: TPeriod; series: any, categories: string[] }) => {
	const chartContainerRef = useRef<HTMLDivElement | null>(null);
	const [range, setRange] = useState<string>(period.text);
	const [chartDimensions, setChartDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	console.log({series, categories});
	

	const [state, setState] = useState<IChartOptions>({
		series,

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
				categories,
				//  categories: period.text === 'Day'
					// 	? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					// 	: period.text === 'Week'
					// 		? ['weak 1', 'weak 2', 'weak 3', 'weak 4', 'weak 5']
					// 		: period.text === 'Month' ? [
					// 				'Jan',
					// 				'Feb',
					// 				'Mar',
					// 				'Apr',
					// 				'May',
					// 				'Jun',
					// 				'Jul',
					// 				'Aug',
					// 				'Sep',
					// 				'Oct',
					// 				'Nov',
					// 				'Dec',
					// 			]:categories,
				title: {
					text: range,
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

	// Observe container dimensions
	useEffect(() => {
		setState({
			...state,
			options: {
				...state.options,
				xaxis: {
					...state.options.xaxis,
					title: {
						...state?.options?.xaxis?.title,
						text: range,
					},
				},
			},
		});
	}, [period.text]);

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
