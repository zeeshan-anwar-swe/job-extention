import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { profileImageUrlValidationCheck } from '../../../../../utils/validationCheck';
import Badge from '../../../../../components/ui/Badge';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';

const MessageItemPartial = ({ feedBack }: any) => {
	const { loading, imageUrl } = useImageValidation(feedBack?.client?.image);
	return (
		<Card className='bg-zinc-100 dark:bg-zinc-950'>
			<CardHeader>
				<CardHeaderChild>
					<ImageLoaderWraper loading={loading} height='h-10'>
						<img
							className='h-10 w-10 rounded-full'
							src={imageUrl}
							alt='profile-image'
						/>
					</ImageLoaderWraper>
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
