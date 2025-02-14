import Alert from '../../../components/ui/Alert';
import Button from '../../../components/ui/Button';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/ui/Card';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import CardBodyTagPartial from './CardBodyTag.partial';

const JobsPageCardPartial = () => {
	return (
		<Card className='col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<Alert icon='HeroFolder' variant='solid'>
					{''}
				</Alert>
				<div className='flex-1'>
					<h4>Web Developer</h4>
					<Button
						rounded='rounded-full'
						variant='outline'
						color='zinc'
						className='gap-2 !px-2 !py-1 '
						rightIcon='Hero'>
						<img
							className='aspect-square w-6 '
							src={profileImageUrlValidationCheck('')}
							alt='profile-image'
						/>
						<h5>Alex Hales</h5>
					</Button>
				</div>
				<div className='h-full'>
					<Button size='lg' icon='HeroEllipsisHorizontal'></Button>
				</div>
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<CardBodyTagPartial title='No. of Positions:' value='4' />
					<CardBodyTagPartial title='Experience:' value='1-4 Years' />
				</div>
				<div className='flex items-center gap-2'>
					<CardBodyTagPartial title='Location:' value='Miami' />
					<CardBodyTagPartial title='Job Type:' value='Full Time, On Site' />
				</div>
			</CardBody>
			<CardFooter className='border-t-2 !py-2'>
				<Button
					size='lg'
					className='!px-0 !text-xl !font-bold'
					rightIcon='HeroArrowUpRight'>
					View Cadidates
				</Button>
			</CardFooter>
		</Card>
	);
};

export default JobsPageCardPartial;
