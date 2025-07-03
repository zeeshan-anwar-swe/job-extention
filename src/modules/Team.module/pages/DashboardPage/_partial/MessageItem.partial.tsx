import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';
import Badge from '../../../../../components/ui/Badge';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import { Message } from '../../../../../types/slices.type/chat/chat.slice.type';
import { formatTimeString } from '../../../../../utils/helper';
interface User {
  userId: string;
  lastMessage: string;
  unreadCount: number;
  image: string | null;
  name: string;
  createdAt: string; // Consider using Date for better date handling if parsing later
}
const MessageItemPartial = ({ chatRow }: { chatRow: User }) => {
	
	const { loading, imageUrl } = useImageValidation(chatRow?.image);

	return (
		<Card className='!flex-row !items-center gap-2 bg-zinc-100 dark:bg-zinc-950'>
			<CardHeader>
				<ImageLoaderWraper loading={loading} height='h-12'>
					<img className='h-12 w-12 rounded-full' src={imageUrl} alt='profile-image' />
				</ImageLoaderWraper>
			</CardHeader>

			<CardBody className='py-4'>
				<CardTitle className='!text-base'>
					{textValidationCheck(
						chatRow?.name,
					)}
				</CardTitle>
				<CardTitle className='!text-base !font-light'>
					{formatTimeString(chatRow?.createdAt)}
				</CardTitle>

				{chatRow.unreadCount > 0 && <Badge variant='solid'>{chatRow.unreadCount}</Badge>}
				<p>{textValidationCheck(chatRow?.lastMessage)}</p>
			</CardBody>
		</Card>
	);
};

export default MessageItemPartial;
