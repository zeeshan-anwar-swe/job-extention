import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
} from '../../../../../components/ui/Card';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import Alert from '../../../../../components/ui/Alert';
import { TColors } from '../../../../../types/colors.type';
import TableDataProfilePartial from './TableDataProfile.partial';
import {
	TaskBoardJobType,
	TaskBoardListType,
} from '../../../../../types/slices.type/agency/taskboard.slice.type';
import Pagination from '../../../../../components/ui/Pagination';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import { cn } from '../../../../../utils/cn';
import { useState } from 'react';
import { JobStatus } from '../../../../../types/enums/jobStatus.enum';
import { TaskboardCardButton } from './TaskboardCardButton';
import { formatString } from '../../../../../utils/helper';

const TaskSectionCardPartial = ({
	cardType,
	color = 'blue',
	lineColor = `!border-blue-500`,
	jobList,
	ListLimit,
	getJobListAction,
	sortBy,
}: {
	cardType: JobStatus;
	lineColor?: string;
	color: TColors;
	jobList: TaskBoardListType;
	getJobListAction: any;
	ListLimit: number;
	sortBy?: string;
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
					<h4>{formatString(cardType)}</h4>
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
			<TaskboardCardButton cardType={cardType} />
			<CardBody
				className={cn(
					'mt-4 flex h-[450px] flex-col gap-4 overflow-y-scroll',
					sortBy === 'Descending' && 'flex-col-reverse',
				)}>
				<PageLoader loading={jobList.loading} error={jobList.error} data={jobList.rows}>
					{jobList.rows.map((job: TaskBoardJobType) => (
						<TableDataProfilePartial
							image={job.client?.image}
							key={job.id}
							title={job.title}
							job={job}
							subTitle={job.client?.name}
						/>
					))}
				</PageLoader>
			</CardBody>
			<CardFooter>
				<Pagination
					limit={ListLimit}
					count={jobList.count}
					getListAction={getJobListAction()}
				/>
			</CardFooter>
		</Card>
	);
};

export default TaskSectionCardPartial;
