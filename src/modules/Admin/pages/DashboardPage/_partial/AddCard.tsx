import Button from '../../../../../components/ui/Button';
import Card, { CardBody } from '../../../../../components/ui/Card';

const AddCardPartial = () => {
	return (
		<Card className='h-full'>
			<CardBody>
				<div className='flex h-full flex-col items-center justify-center'>
					<Button
						size='xl'
						variant='solid'
						rounded='rounded-full'
						icon='HeroPlus'></Button>
					<h2>Create Job</h2>
				</div>
			</CardBody>
		</Card>
	);
};

export default AddCardPartial;
