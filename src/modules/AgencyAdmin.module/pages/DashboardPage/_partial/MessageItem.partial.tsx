import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { profileImageUrlValidationCheck } from '../../../../../utils/validationCheck';
import Badge from '../../../../../components/ui/Badge';

const MessageItemPartial = () => {
	return (
		<Card className='bg-zinc-100 dark:bg-zinc-950'>
			<CardHeader>
				<CardHeaderChild>
					<img
						className='h-10 w-10 rounded-full'
						src={profileImageUrlValidationCheck('')}
						alt='profile-image'
					/>
					<CardTitle className='!text-base'>John Doe</CardTitle>
					<CardTitle className='!text-base !font-light'>4:16PM Today</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<Badge variant='solid'>3</Badge>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<p>
					How will the independent contractor be paid? A fixed wage (i.e. hourly or
					monthly), A set fee, After completing certain milestones or Other?
				</p>
			</CardBody>
		</Card>
	);
};

export default MessageItemPartial;
