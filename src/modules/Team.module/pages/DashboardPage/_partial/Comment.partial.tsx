import { useEffect } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import Icon from '../../../../../components/icon/Icon';
import Badge from '../../../../../components/ui/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import { getClientFeedback } from '../../../../../store/slices/Agency/Client.slice';
import { formatTimeString } from '../../../../../utils/helper';
import Pagination from '../../../../../components/ui/Pagination';

const CommentItem = ({ feedBack }: any) => {
	const { imageUrl, loading } = useImageValidation(feedBack?.client?.image);

	return (
		<div className='flex w-full gap-4 rounded-xl bg-zinc-100 p-2 dark:bg-zinc-950'>
			<div className='flex-shrink-0'>
				<ImageLoaderWraper loading={loading} height='h-16'>
					<img src={imageUrl} alt='profile-image' className='h-16 w-16 rounded-full' />
				</ImageLoaderWraper>
			</div>
			<div className='flex-grow'>
				<div>
					<b>{feedBack?.client?.name}</b>{' '}
					<span className='text-gray-500'>{formatTimeString(feedBack?.createdAt)}</span>
				</div>
				<div className='mb-2'>
					<span className='text-gray-500'>On</span>{' '}
					<b>
						{feedBack?.candidate?.name} | {feedBack?.title}
					</b>
				</div>
				<Badge
					variant='solid'
					color='amber'
					colorIntensity='100'
					className='!text-amber-800'>
					Fair
				</Badge>
				<div>{feedBack?.feedback}</div>
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
	const dispatch: AppDispatch = useDispatch();
	const { pageLoading, clientFeedback, paginationCount, error } = useSelector(
		(state: RootState) => state.clients,
	);

	useEffect(() => {
		dispatch(getClientFeedback({ limit: 10, page: 1 }));
	}, []);
	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle>Client Feedback</CardTitle>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='scrollbar flex h-96 flex-col gap-4 overflow-y-scroll '>
				<PageLoader loading={pageLoading} error={error} data={clientFeedback}>
					{clientFeedback.map((feedBack) => (
						<CommentItem feedBack={feedBack} key={feedBack.id} />
					))}
				</PageLoader>
			</CardBody>
			<CardFooter>
				<Pagination limit={10} count={paginationCount} getListAction={getClientFeedback} />
			</CardFooter>
		</Card>
	);
};

export default CommentPartial;
