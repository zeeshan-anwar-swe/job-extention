import React, { useState, useEffect } from 'react'; // Import useState and useEffect
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
	// State to track dark mode status
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Effect to detect changes in the 'dark' class on the html element
	useEffect(() => {
		const checkDarkMode = () => {
			setIsDarkMode(document.documentElement.classList.contains('dark'));
		};

		// Initial check
		checkDarkMode();

		const observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					checkDarkMode();
				}
			}
		});

		observer.observe(document.documentElement, { attributes: true });

		return () => observer.disconnect();
	}, []); // Empty dependency array ensures this runs once on mount

	// Use a state for chart options that updates with theme changes
	const [chartOptions, setChartOptions] = useState<ApexOptions>({
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
			toolbar: {
				show: false,
			},
			background: isDarkMode ? colors.zinc['800'] : colors.white, // Chart background
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
		},
		title: {
			align: 'left',
			style: {
				color: isDarkMode ? colors.zinc['200'] : colors.zinc['800'], // Title color
			},
		},
		grid: {
			show: true,
			borderColor: isDarkMode ? colors.zinc['700'] : `${colors.zinc['500']}25`, // Grid line color
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
			labels: {
				style: {
					colors: isDarkMode ? colors.zinc['200'] : colors.zinc['700'], // X-axis label color
				},
			},
			axisBorder: {
				color: isDarkMode ? colors.zinc['600'] : colors.zinc['300'], // X-axis border color
			},
			axisTicks: {
				color: isDarkMode ? colors.zinc['600'] : colors.zinc['300'], // X-axis tick color
			},
		},
		yaxis: {
			labels: {
				style: {
					colors: isDarkMode ? colors.zinc['200'] : colors.zinc['700'], // Y-axis label color
				},
			},
		},
		tooltip: {
			theme: isDarkMode ? 'dark' : 'light', // Crucial for tooltip theme
			style: {
				fontSize: '12px',
				fontFamily: undefined,
				// Optionally, you can directly control background/text here if 'theme' isn't enough
				// background: isDarkMode ? colors.zinc['700'] : colors.white,
				// color: isDarkMode ? colors.white : colors.black,
			},
		},
	});

	// Effect to update chart options when isDarkMode changes
	useEffect(() => {
		setChartOptions((prevOptions) => ({
			...prevOptions,
			chart: {
				...prevOptions.chart,
				background: isDarkMode ? colors.zinc['800'] : colors.white,
			},
			title: {
				...prevOptions.title,
				style: {
					color: isDarkMode ? colors.zinc['200'] : colors.zinc['800'],
				},
			},
			grid: {
				...prevOptions.grid,
				borderColor: isDarkMode ? colors.zinc['700'] : `${colors.zinc['500']}25`,
			},
			xaxis: {
				...prevOptions.xaxis,
				labels: {
					...prevOptions.xaxis?.labels,
					style: {
						colors: isDarkMode ? colors.zinc['200'] : colors.zinc['700'],
					},
				},
				axisBorder: {
					...prevOptions.xaxis?.axisBorder,
					color: isDarkMode ? colors.zinc['600'] : colors.zinc['300'],
				},
				axisTicks: {
					...prevOptions.xaxis?.axisTicks,
					color: isDarkMode ? colors.zinc['600'] : colors.zinc['300'],
				},
			},
			yaxis: {
				...prevOptions.yaxis,
				...(Array.isArray(prevOptions.yaxis)
					? {}
					: {
							labels: {
								...prevOptions.yaxis?.labels,
								style: {
									colors: isDarkMode ? colors.zinc['200'] : colors.zinc['700'],
								},
							},
						}),
			},
			tooltip: {
				...prevOptions.tooltip,
				theme: isDarkMode ? 'dark' : 'light', // Update tooltip theme
			},
		}));
	}, [isDarkMode, categories]); // Re-run if isDarkMode or categories change

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
					options={chartOptions} // Use the state variable for options
					series={series} // Series can remain as a prop if it doesn't change with theme
					type='line'
					height={400}
				/>
			</CardBody>
		</Card>
	);
};

export default ChartPartial;
