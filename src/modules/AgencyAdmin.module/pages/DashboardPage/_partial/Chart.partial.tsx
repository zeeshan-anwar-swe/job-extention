import React, { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import Chart from '../../../../../components/Chart';
import { IChartOptions } from '../../../../../interface/chart.interface';
import ReactApexChart from 'react-apexcharts';

const ChartPartial = ({series, categories}:{series:any, categories:any}) => {
	 const [state, setState] = React.useState({
          
            series: series,
            options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Product Trends by Month',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: categories,
              }
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
				  <ReactApexChart options={state.options} series={state.series} type="line" height={400} />
			</CardBody>
		</Card>
	);
};

export default ChartPartial;