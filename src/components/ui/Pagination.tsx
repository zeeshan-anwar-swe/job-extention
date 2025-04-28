import { useEffect, useState } from 'react';
import Button from './Button';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import Card, { CardFooter } from './Card';

const Pagination = ({
	count,
	limit,
	filterOptions,
	params,
	getListAction,
}: {
	limit: number;
	count: number;
	filterOptions?: any;
	params?: string;
	getListAction: ({
		page,
		limit,
		params,
	}: {
		page: number;
		limit: number;
		params?: string;
	}) => void;
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const dispatch: AppDispatch = useDispatch();
	const totalPages = Math.ceil(count / limit);

	const handlePageChange = async (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			await setCurrentPage(page);
			if (filterOptions) {
				dispatch(getListAction({ page, limit, ...filterOptions }));
			} else {
				if (params) {
					dispatch(getListAction({ page, limit, params }));
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

		return () => {
			setCurrentPage(1);
		};
	}, [dispatch, getListAction, limit]);

	console.log({ totalPages });

	return (
		<Card className={`${totalPages < 2 && '!hidden'}`}>
			<CardFooter>
				<div className='ml-auto flex items-center gap-2 '>
					<Button
						onClick={handlePrevPage}
						color='blue'
						colorIntensity='500'
						className={`!border-blue-500 hover:!border-blue-600 hover:bg-blue-600 hover:!text-white ${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}
						isDisable={currentPage === 1}>
						Prev
					</Button>
					{totalPages > 0 && (
						<Button
							color='blue'
							colorIntensity='500'
							className='!border-blue-500'
							variant='solid'>
							{currentPage} / {totalPages}
						</Button>
					)}
					<Button
						onClick={handleNextPage}
						color='blue'
						colorIntensity='500'
						className={`!border-blue-500 hover:!border-blue-600 hover:bg-blue-600 hover:!text-white ${currentPage === totalPages && 'cursor-not-allowed opacity-50'}`}
						isDisable={currentPage === totalPages}>
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Pagination;
