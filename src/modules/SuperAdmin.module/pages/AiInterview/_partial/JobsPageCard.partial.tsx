import Button from '../../../../../components/ui/Button';
import {
	profileImageUrlValidationCheck,
} from '../../../../../utils/validationCheck';
import Card, { CardBody, CardFooter, CardFooterChild } from '../../../../../components/ui/Card';

const JobsPageCardPartial = () => {
	return (
		<Card
			color='zinc'
			className='col-span-4 flex flex-col gap-2 overflow-hidden border border-zinc-300 dark:bg-zinc-950 max-2xl:col-span-6 max-lg:col-span-12'>
			<CardBody className='relative flex flex-col gap-4 !p-0'>
				<img
					className='aspect-video w-full object-cover'
					src={profileImageUrlValidationCheck('http://localhost:7112/src/assets/svg-images/dummy-image.png')}
					alt=''
				/>

				<Button
					className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 !border-white bg-white/30 text-white backdrop-blur-sm'
					icon='HeroPlay'
					size='xl'
					variant='outline'
					rounded='rounded-full'></Button>
			</CardBody>
			<CardFooter className='!flex-col !items-start !py-2'>
				<CardFooterChild>
					<h6>Job Title: </h6> <span className='font-semibold'>Web Designer</span>
				</CardFooterChild>
				<CardFooterChild>
					<h6>Candidate: </h6>
					<Button
						className='gap-2 !py-0 !pl-1 !pr-2'
						variant='outline'
						color='zinc'
						borderWidth='border'
						rounded='rounded-full'>
						<img
							className='aspect-square w-6'
							src={profileImageUrlValidationCheck("")}
							alt='profile'
						/>
						<h6>Butlar Doe</h6>
					</Button>
					<Button
						title='View Profile'
						className='gap-2 !px-2 !py-0 text-blue-800'
						rounded='rounded-full'
						variant='solid'
						colorIntensity='100'
						rightIcon='HeroChevronDown'>
						In Review
					</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};

export default JobsPageCardPartial;
