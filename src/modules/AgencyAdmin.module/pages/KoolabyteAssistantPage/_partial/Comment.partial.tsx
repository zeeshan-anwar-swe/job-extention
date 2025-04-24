import React, { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import getFirstLetter from '../../../../../utils/getFirstLetter';
import SvgTwiceCheck from '../../../../../components/icon/heroicons/TwiceCheck';

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
		<div className='flex w-full gap-4'>
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
					<span className='text-gray-500'>On</span> <b>{productName}</b>
				</div>
				<div>{comment}</div>
			</div>
			<div className='flex-shrink-0'>
				<SvgTwiceCheck color='blue' />
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
			<CardBody>
				<div className='flex flex-col gap-4'>
					<CommentItem
						image={''}
						firstName={'Adil'}
						username={'aadilkham'}
						productName={'DSLR'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default CommentPartial;
