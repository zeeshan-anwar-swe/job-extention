import React, { useState } from 'react';
import Card, {
  CardBody,
  CardHeader,
  CardHeaderChild,
  CardTitle,
} from '../../../../../components/ui/Card';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ChartPartial = ({series, categories}:{series:ApexOptions["series"], categories:string[]}) => {
  console.log({series, categories});

    const [state, setState] = React.useState({

          series: series,
          options: {
            chart: {
              height: 400,
              type: 'line' as const,
              zoom: {
                enabled: false
              }
            },

            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth' as ApexOptions["stroke"]["curve"]
            },
            title: {
              text: 'Product Trends by Month',
              align: 'left' as ApexOptions["title"]["align"] // Explicitly type 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'],
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