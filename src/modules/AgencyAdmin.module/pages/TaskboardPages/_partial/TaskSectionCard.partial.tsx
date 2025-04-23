import Card, { CardBody, CardHeader, CardHeaderChild } from '../../../../../components/ui/Card';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import Alert from '../../../../../components/ui/Alert';
import { TColors } from '../../../../../types/colors.type';
import Button from '../../../../../components/ui/Button';
import TableDataProfilePartial from './TableDataProfile.partial';

const TaskSectionCardPartial = ({
	cardType,
	taskCount,
	color = 'blue',
	lineColor = `!border-blue-500`,
}: {
	cardType: string;
	lineColor?: string;
	color: TColors;
	taskCount: number;
}) => {
	return (
		<Card className='bg-zinc-100 max-xl:col-span-2 max-lg:col-span-4'>
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
						{taskCount}
					</Alert>
				</CardHeaderChild>
			</CardHeader>
			<NavSeparator className={`!mx-4 !border-b-2 ${lineColor}`} />
			<Button
				className='mx-4 mt-2 max-w-full border-dotted'
				color='zinc'
				variant='outline'
				icon='HeroPlus'></Button>
			<CardBody className='mt-4 flex flex-col gap-4'>
				<TableDataProfilePartial title='Web Developing' subTitle='Alex Hales' />
			</CardBody>
		</Card>
	);
};

export default TaskSectionCardPartial;
