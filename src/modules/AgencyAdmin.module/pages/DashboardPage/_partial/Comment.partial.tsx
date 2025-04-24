import { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import getFirstLetter from '../../../../../utils/getFirstLetter';
import Icon from '../../../../../components/icon/Icon';
import Badge from '../../../../../components/ui/Badge';

interface ICommentItemProps {
	image?: string;
	firstName: string;
	username: string;
	productName: string;
	comment: string;
	time: string;
}
const CommentItem: FC<ICommentItemProps> = (props) => {
	const { image, firstName, username, productName, comment, time } = props;
	return (
		<div className='flex w-full gap-4 rounded-xl bg-zinc-100 p-2 dark:bg-zinc-950'>
			<div className='flex-shrink-0'>
				{image && <img src={image} alt={firstName} className='h-16 w-16 rounded-full' />}
				{!image && (
					<div className='flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 text-2xl text-blue-500'>
						{getFirstLetter(firstName)}
					</div>
				)}
			</div>
			<div className='flex-grow'>
				<div>
					<b>{firstName}</b> <span className='text-gray-500'>@{username}</span>
				</div>
				<div className='mb-2'>
					<span className='text-gray-500'>On</span> <b>{productName} | Web Developer</b>
				</div>
				<Badge
					variant='solid'
					color='amber'
					colorIntensity='100'
					className='!text-amber-800'>
					Fair
				</Badge>
				<div>{comment}</div>
			</div>
			<div className='flex-shrink-0'>
				<Icon icon='HeroTwiceCheck' color='blue' size='text-3xl' />
			</div>
		</div>
	);
};
CommentItem.defaultProps = {
	image: undefined,
};

const CommentPartial = () => {
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Client Feedback</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='scrollbar flex h-96 flex-col gap-4 overflow-y-scroll '>
				<CommentItem
					image={''}
					firstName={'Aadil'}
					username={'adilkhan'}
					productName={'Dpad'}
					comment='Very high quality product and arrived quickly.'
					time='1h'
				/>
			</CardBody>
		</Card>
	);
};

export default CommentPartial;
