import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
} from '../../../../../components/ui/Card';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import Alert from '../../../../../components/ui/Alert';
import { TColors } from '../../../../../types/colors.type';
import Button from '../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';
import {
	TaskBoardJobType,
	TaskBoardListType,
} from '../../../../../types/slices.type/agency/taskboard.slice.type';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import Pagination from '../../../../../components/ui/Pagination';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';

const TaskSectionCardPartial = ({
	cardType,
	color = 'blue',
	lineColor = `!border-blue-500`,
	jobList,
	ListLimit,
	getJobListAction,
}: {
	cardType: string;
	lineColor?: string;
	color: TColors;
	jobList: TaskBoardListType;
	getJobListAction: any;
	ListLimit: number;
}) => {
	return (
		<Card className='bg-zinc-100 max-2xl:col-span-2 max-lg:col-span-4'>
			<CardHeader>
				<CardHeaderChild>
					<Alert
						className='aspect-square !w-3 !p-0 text-center'
						variant='solid'
						rounded='rounded-full'
						color={color}
						colorIntensity='500'
					/>
					<h4>{cardType}</h4>
				</CardHeaderChild>
				<CardHeaderChild>
					<Alert
						className='aspect-square !w-8 !p-0 text-center'
						variant='solid'
						rounded='rounded-full'
						color='zinc'
						colorIntensity='800'>
						{jobList.count}
					</Alert>
				</CardHeaderChild>
			</CardHeader>
			<NavSeparator className={`!mx-4 !border-b-2 ${lineColor}`} />
			<Button
				iconSize='text-8xl'
				className='mx-4 mt-2 max-w-full border-dashed'
				color='zinc'
				variant='outline'
				icon='HeroPlus'></Button>
			<CardBody className='mt-4 flex h-[450px] flex-col gap-4 overflow-y-scroll'>
				<PageLoader loading={jobList.loading} error={jobList.error} data={jobList.rows}>
					{jobList.rows.map((job: TaskBoardJobType) => (
						<TableDataProfilePartial
							image={job.client?.image}
							key={job.id}
							title={job.title}
							subTitle={job.client?.name}
						/>
					))}
				</PageLoader>
			</CardBody>
			<CardFooter>
				<Pagination
					limit={ListLimit}
					count={jobList.count}
					getListAction={getJobListAction}
				/>
			</CardFooter>
		</Card>
	);
};

export default TaskSectionCardPartial;
