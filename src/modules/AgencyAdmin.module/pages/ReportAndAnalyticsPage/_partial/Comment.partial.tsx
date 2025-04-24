import { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';

import getFirstLetter from '../../../../../utils/getFirstLetter';
import CircularProgressBar from '../../../../../components/ui/CircleProgressBar';

interface ICommentItemProps {
	image?: string;
	firstName: string;
	username: string;
	productName: string;
	comment: string;
	time: string;
	progress: number;
}
const CommentItem: FC<ICommentItemProps> = (props) => {
	const { image, firstName, username, productName, comment, time, progress } = props;

	return (
		<div className='flex w-full items-center gap-4'>
			<div className='flex-shrink-0'>
				{image && <img src={image} alt={firstName} className='h-16 w-16 rounded-full' />}
				{!image && (
					<div className='flex aspect-square h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 text-2xl text-blue-500'>
						{getFirstLetter(firstName)}
					</div>
				)}
			</div>
			<div className='flex flex-grow items-center justify-between'>
				<div>
					<b>{firstName}</b> <span className='text-gray-500'>@{username}</span>
				</div>
				<CircularProgressBar
					color='stroke-red-500'
					sqSize={50}
					strokeWidth={5}
					percentage={progress}
				/>
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
					<div>
						<CardTitle>Team Performance</CardTitle>
						<p>Jobs percentage closed by team.</p>
					</div>
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div className='flex flex-col gap-4'>
					<CommentItem
						progress={18}
						image={''}
						firstName={'Abid'}
						username={'abcabc'}
						productName={'Personal'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
					<CommentItem
						progress={18}
						image={''}
						firstName={'Abid'}
						username={'abcabc'}
						productName={'Personal'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
					<CommentItem
						progress={18}
						image={''}
						firstName={'Abid'}
						username={'abcabc'}
						productName={'Personal'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
					<CommentItem
						progress={18}
						image={''}
						firstName={'Abid'}
						username={'abcabc'}
						productName={'Personal'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
					<CommentItem
						progress={18}
						image={''}
						firstName={'Abid'}
						username={'abcabc'}
						productName={'Personal'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
					<CommentItem
						progress={18}
						image={''}
						firstName={'Abid'}
						username={'abcabc'}
						productName={'Personal'}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default CommentPartial;
