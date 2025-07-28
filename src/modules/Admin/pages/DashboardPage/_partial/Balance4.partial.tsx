import Card, { CardBody } from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Balance from '../../../../../components/Balance';
import Button from '../../../../../components/ui/Button';

const Balance4Partial = () => {
	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-amber-500'>
							<Icon icon='HeroBriefcase' size='text-3xl' className='text-white' />
						</div>
						<Button
							size='sm'
							rounded='rounded-full'
							variant='outline'
							borderWidth='border'
							color='zinc'>
							View All
						</Button>
					</div>
					<div className='space-x-1 text-zinc-500 rtl:space-x-reverse'>
						<span className='font-semibold'>New Clients</span>
					</div>
					<div className='flex justify-between'>
						<div className='text-4xl font-semibold'>8</div>
						<Balance status='negative' value='-13%' />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance4Partial;
