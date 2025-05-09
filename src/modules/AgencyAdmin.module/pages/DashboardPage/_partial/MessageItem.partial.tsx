import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { profileImageUrlValidationCheck, textValidationCheck } from '../../../../../utils/validationCheck';
import Badge from '../../../../../components/ui/Badge';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import { ChatRow } from '../../../../../types/slices.type/chat/chat.slice.type';
import { formatTimeString } from '../../../../../utils/helper';

const MessageItemPartial = ({ chatRow }: { chatRow: ChatRow }) => {
	const { loading, imageUrl } = useImageValidation("");
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
					<CardTitle className='!text-base'>{textValidationCheck(chatRow?.sender?.name)}</CardTitle>
					<CardTitle className='!text-base !font-light'>{formatTimeString(chatRow?.createdAt)}</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					<Badge variant='solid'>1</Badge>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<p>
					{textValidationCheck(chatRow?.text)}
				</p>
			</CardBody>
		</Card>
	);
};

export default MessageItemPartial;
