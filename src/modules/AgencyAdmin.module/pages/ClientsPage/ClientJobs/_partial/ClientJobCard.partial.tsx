import Alert from '../../../../../../components/ui/Alert';
import Button from '../../../../../../components/ui/Button';
import CardBodyTagPartial from './CardBodyTag.partial';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardTitle,
} from '../../../../../../components/ui/Card';
import { Link } from 'react-router-dom';
import { ClientJob } from '../../../../../../types/slices.type/jobs.slice.type';

const ClientJobCardPartial = ({ job }: { job: ClientJob }) => {
	
	return (
		<Card className='col-span-4 flex flex-col gap-2 border border-zinc-300 max-2xl:col-span-6 max-lg:col-span-12'>
			<CardHeader className='gap-4 '>
				<div className='flex items-center gap-4'>
					<Alert icon='HeroFolder' variant='solid' />
					<CardTitle>{job?.title}</CardTitle>
				</div>
			
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<div className='flex flex-wrap items-center gap-2 max-md:flex-col max-md:items-start'>
					<CardBodyTagPartial title='No. of Positions:' value={job.positions} />
					<CardBodyTagPartial title='Experience:' value={job.experience} />
				</div>
				<div className='flex flex-wrap items-center gap-2 max-md:flex-col max-md:items-start'>
					<CardBodyTagPartial title='Location:' value={job.location} />
					<CardBodyTagPartial title='Job Type:' value={job.type} />
				</div>
			</CardBody>
			<CardFooter className='border-t-2 !py-2'>
				<CardFooterChild>
					<Link to='/dashboard/jobs/view-job-details' state={job}>
						<Button className='!px-0  !font-medium' rightIcon='HeroArrowUpRight'>
							Job Details
						</Button>
					</Link>
				</CardFooterChild>
				{/* <CardFooterChild>
					<div className='flex items-center'>
						<img
							className='-mr-6 aspect-square w-10 object-cover'
							src={profileImageUrlValidationCheck('')}
						/>
						<img
							className='-mr-6 aspect-square w-10 object-cover'
							src={profileImageUrlValidationCheck('')}
						/>
						<img
							className='-mr-6 aspect-square w-10 object-cover'
							src={profileImageUrlValidationCheck('')}
						/>
						<img
							className='-mr-6 aspect-square w-10 object-cover'
							src={profileImageUrlValidationCheck('')}
						/>
						<Button variant='solid' rounded='rounded-full' icon='HeroPlus'></Button>
					</div>
				</CardFooterChild> */}
			</CardFooter>
		</Card>
	);
};

export default ClientJobCardPartial;
