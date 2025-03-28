import Button from '../../../../components/ui/Button';
import Card, {
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import { profileImageUrlValidationCheck } from '../../../../utils/validationCheck';

const AssignJobModalListItemPartial = () => {
	return (
		<Card className='!bg-zinc-100 dark:!bg-zinc-800'>
			<CardHeader className=''>
				<CardHeaderChild>
					<img
						className='h-12 w-12 rounded-full object-cover'
						src={profileImageUrlValidationCheck('')}
						alt='profile-image'
					/>
					<CardSubTitle className='!font-medium text-[#5E687A]'>Xavier Quin</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<Button className='h-fit' variant='solid'>
						Assign
					</Button>
				</CardHeaderChild>
			</CardHeader>
		</Card>
	);
};

export default AssignJobModalListItemPartial;
