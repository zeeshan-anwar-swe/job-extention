import { useEffect, useState } from 'react';
import Button from './Button';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import Card, { CardFooter } from './Card';

const Pagination = ({
	count,
	limit,
	filterOptions,
	setCurrentPageAction,
	search,
	getListAction,
}: {
	limit: number;
	count: number;
	filterOptions?: any;
	search?: string;
	setCurrentPageAction?: any;
	getListAction: ({
		page,
		limit,
		search,
				
	}: {
		page: number;
		limit: number;
		search?: string;
	}) => void;
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const dispatch: AppDispatch = useDispatch();
	const totalPages = Math.ceil(count / limit);

	const handlePageChange = async (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			await setCurrentPage(page);
			setCurrentPageAction && (await dispatch(setCurrentPageAction(page)));
			if (filterOptions) {
				dispatch(getListAction({ page, limit, ...filterOptions }));
			} else {
				if (search) {
					dispatch(getListAction({ page, limit, search }));
				} else {
					dispatch(getListAction({ page, limit }));
				}
			}
		}
	};

	const handleNextPage = () => {
		handlePageChange(currentPage + 1);
	};

	const handlePrevPage = () => {
		handlePageChange(currentPage - 1);
	};

	useEffect(() => {
		dispatch(getListAction({ page: 1, limit }));
	}, [dispatch, getListAction, limit]);

	useEffect(() => {
		setCurrentPage(1);
		setCurrentPageAction && dispatch(setCurrentPageAction(1));
	}, [search]);

	return (
		<Card className={`${totalPages < 2 && '!hidden'} ml-auto w-full bg-transparent`}>
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
					{totalPages > 0 && (
						<Button
							color='blue'
							colorIntensity='500'
							className='text-nowrap !border-blue-500'
							variant='solid'>
							{currentPage} / {totalPages}
						</Button>
					)}
					<Button
						variant='solid'
						onClick={handleNextPage}
						color='blue'
						colorIntensity='500'
						className={`${currentPage === totalPages && 'cursor-not-allowed opacity-50'}`}
						isDisable={currentPage === totalPages}>
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Pagination;
