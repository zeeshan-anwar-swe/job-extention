import Card, { CardBody } from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Balance from '../../../../../components/Balance';
import Button from '../../../../../components/ui/Button';

const Balance3Partial = () => {
	return (
		<Card>
			<CardBody>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-purple-500'>
							<Icon icon='HeroScan' size='text-3xl' className='text-white' />
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
						<span className='font-semibold'>New Recruiters</span>
					</div>
					<div className='flex justify-between'>
						<div className='text-4xl font-semibold'>48</div>
						<Balance status='negative' value='-2%' />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Balance3Partial;
