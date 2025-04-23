import { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import usersDb from '../../../../../mocks/db/users.db';
import productsDb from '../../../../../mocks/db/products.db';
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
						progress={usersDb[0].progress}
						image={usersDb[0].image?.thumb}
						firstName={usersDb[0].firstName}
						username={usersDb[0].username}
						productName={productsDb[0].productName}
						comment='Very high quality product and arrived quickly.'
						time='1h'
					/>
					<CommentItem
						progress={usersDb[1].progress}
						image={usersDb[1].image?.thumb}
						firstName={usersDb[1].firstName}
						username={usersDb[1].username}
						productName={productsDb[1].productName}
						comment='A very functional product.'
						time='3h'
					/>
					<CommentItem
						progress={usersDb[2].progress}
						image={usersDb[2].image?.thumb}
						firstName={usersDb[2].firstName}
						username={usersDb[2].username}
						productName={productsDb[2].productName}
						comment='I have preferred the nu brand before, I like the designs of their products very much.'
						time='3h'
					/>
					<CommentItem
						progress={usersDb[3].progress}
						image={usersDb[3].image?.thumb}
						firstName={usersDb[3].firstName}
						username={usersDb[3].username}
						productName={productsDb[3].productName}
						comment='The price could have been a little more affordable.'
						time='18h'
					/>
					<CommentItem
						progress={usersDb[7].progress}
						image={usersDb[7].image?.thumb}
						firstName={usersDb[7].firstName}
						username={usersDb[7].username}
						productName={productsDb[4].productName}
						comment='Everything is very good for now, I will comment again after a long use.'
						time='1d'
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default CommentPartial;
