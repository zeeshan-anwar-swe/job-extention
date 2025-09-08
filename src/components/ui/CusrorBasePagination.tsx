import Button from './Button';
import Icon from '../icon/Icon';
import { cn } from '../../utils/cn';
import { FC, useState } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { FilterOptionsType, TCandidateSource } from '../../store/slices/Candiates.slice';

interface CursorBasePaginationProps {
	use: string;
	limit: number;
	nextPage: number;
	cursor: string | null;
	filterOptions: FilterOptionsType;
	candidateSource?: TCandidateSource;
	getMoreListAction: (payload: {
		page: number;
		limit: number;
		filterOptions: FilterOptionsType;
		cursor: string | null;
		candidateSource?: TCandidateSource;
	}) => void;
}

export const CursorBasePagination: FC<CursorBasePaginationProps> = ({
	limit,
	cursor,
	nextPage,
	filterOptions,
	candidateSource,
	getMoreListAction,
}) => {
	const dispatch: AppDispatch = useDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLoadMore = async () => {
		try {
			if (isLoading) return; // Prevent multiple calls while loading
			setIsLoading(true);
			await dispatch(
				getMoreListAction({
					limit,
					cursor,
					filterOptions,
					page: nextPage,
					candidateSource,
				}),
			);
		} catch (error) {
			console.error('Error loading more items:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			aria-disabled={isLoading}
			onClick={handleLoadMore}
			className={cn('mx-auto flex cursor-pointer flex-col items-center gap-2')}>
			<Button className='' color='blue' variant='solid' isLoading={isLoading}>
				Show More
			</Button>
			<div className='animate-bounce'>
				<Icon icon='HeroChevronDoubleDown' className='text-2xl' />
			</div>
		</div>
	);
};
