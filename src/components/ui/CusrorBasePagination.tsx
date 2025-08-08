import { useEffect, useState, useCallback } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import Card, { CardFooter } from './Card';
import Button from './Button';
interface CursorBasePaginationProps {
	limit: number;
	cursor: string;
	setCursor: (cursor: string) => void;
	filterOptions?: any;
	search?: string;
	setCurrentPageAction?: any;
	getListAction: any;
}

const CursorBasePagination = ({
	limit,
	cursor,
	setCursor,
	filterOptions,
	search,
	setCurrentPageAction,
	getListAction,
}: CursorBasePaginationProps) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const dispatch: AppDispatch = useDispatch();

	// Handler for fetching the next page.
	const handleNextPage = useCallback(() => {
		// Only proceed if there's a cursor for the next page
		if (!cursor) {
			setCurrentPage((prevPage) => prevPage + 1);
			setCurrentPageAction && dispatch(setCurrentPageAction(currentPage + 1));

			if (filterOptions) {
				dispatch(getListAction({ page: currentPage + 1,	limit, cursor, ...filterOptions }));
			} else {
				if (search) {
					dispatch(getListAction({page: currentPage + 1, limit, search, cursor }));
				} else {
					dispatch(getListAction({page: currentPage + 1, limit, cursor }));
				}
			}
		}
	}, [
		cursor,
		currentPage,
		dispatch,
		filterOptions,
		getListAction,
		limit,
		search,
		setCurrentPageAction,
	]);

	// Handler for going back to the first page.
	const handlePrevPage = useCallback(() => {
		// Only allow going back if we're not on the first page
		if (currentPage > 1) {
			setCursor('');
			setCurrentPage(1);
			setCurrentPageAction && dispatch(setCurrentPageAction(1));

			if (filterOptions) {
				dispatch(getListAction({ page : currentPage, limit, ...filterOptions }));
			} else {
				if (search) {
					dispatch(getListAction({ page : currentPage,limit, search }));
				} else {
					dispatch(getListAction({page : currentPage, limit }));
				}
			}
		}
	}, [
		currentPage,
		dispatch,
		filterOptions,
		getListAction,
		limit,
		search,
		setCursor,
		setCurrentPageAction,
	]);

	// Initial fetch when the component mounts.
	useEffect(() => {
		// Initial fetch always gets the first page without a cursor.
		dispatch(getListAction({page : currentPage, limit }));
	}, [dispatch, getListAction, limit]);

	// Reset currentPage and cursor when the search term changes.
	useEffect(() => {
		setCurrentPage(1);
		setCursor('');
		setCurrentPageAction && dispatch(setCurrentPageAction(1));
	}, [search, setCursor, setCurrentPageAction, dispatch]);

	return (
		<Card className='ml-auto w-full bg-transparent'>
			<CardFooter>
				<div className='ml-auto flex items-center gap-2 '>
					<Button
						variant='solid'
						onClick={handlePrevPage}
						color='blue'
						colorIntensity='500'
						className={`${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}
						isDisable={currentPage === 1}>
						Prev
					</Button>
					<Button
						color='blue'
						colorIntensity='500'
						className='text-nowrap !border-blue-500'
						variant='solid'>
						{currentPage}
					</Button>
					<Button
						variant='solid'
						onClick={handleNextPage}
						color='blue'
						colorIntensity='500'
						// The 'Next' button is disabled only if the cursor is an empty string
						// className={`${!cursor && 'cursor-not-allowed opacity-50'}`}
						// isDisable={!cursor}
						>
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default CursorBasePagination;
