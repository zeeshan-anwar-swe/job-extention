import Alert from '../../../../../../components/ui/Alert';
import Button from '../../../../../../components/ui/Button';
import CardBodyTagPartial from './CardBodyTag.partial';
import CardDropdownPartial from './CardDropdown.partial';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
} from '../../../../../../components/ui/Card';
import { Link } from 'react-router-dom';

const ClientProfilePageCardPartial = () => {
	return (
		<Card className='col-span-4 flex flex-col gap-2 border-2 border-zinc-300 max-2xl:col-span-6 max-lg:col-span-12'>
			<CardHeader className='gap-4 max-md:!flex-col-reverse'>
				<Alert icon='HeroFolder' variant='solid' />
				<div className='flex-1'>
					<h4 className='max-md:text-sm'>Web Developer</h4>
					<Button
						rounded='rounded-full'
						variant='outline'
						color='zinc'
						className='gap-2 !px-2 !py-1'
						rightIcon='Hero'>
						<img
							className='aspect-square w-6 '
							src={profileImageUrlValidationCheck('')}
							alt='profile-image'
						/>
						<h5 className='max-md:text-sm'>Alex Hales</h5>
					</Button>
				</div>
				<div className='h-full max-md:flex-1'>
					<CardDropdownPartial />
				</div>
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<div className='flex items-center gap-2 max-md:flex-col max-md:items-start'>
					<CardBodyTagPartial title='No. of Positions:' value='4' />
					<CardBodyTagPartial title='Experience:' value='1-4 Years' />
				</div>
				<div className='flex items-center gap-2 max-md:flex-col max-md:items-start'>
					<CardBodyTagPartial title='Location:' value='Miami' />
					<CardBodyTagPartial title='Job Type:' value='Full Time, On Site' />
				</div>
			</CardBody>
			<CardFooter className='border-t-2 !py-2'>
				<CardFooterChild>
					<Link to='/dashboard/jobs/view-cadidates/web-developer'>
						<Button className='!px-0  !font-medium' rightIcon='HeroArrowUpRight'>
							Job Details
						</Button>
					</Link>
				</CardFooterChild>
				<CardFooterChild>
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
						<Button
							variant='outline'
							rounded='rounded-full'
							className='!bg-white'
							icon='HeroPlus'></Button>
					</div>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default ClientProfilePageCardPartial;
