import { useEffect, useState } from 'react';
import Button from './Button';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import Card, { CardFooter } from './Card';

const Pagination = ({
	count,
	limit,
	getListAction,
}: {
	limit: number;
	count: number;
	getListAction: ({ page, limit }: { page: number; limit: number }) => void;
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const dispatch: AppDispatch = useDispatch();
	const totalPages = Math.ceil(count / limit);
	const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

	const handlePageChange = async (page: number) => {
		if (page !== currentPage) {
			await setCurrentPage(page);
			dispatch(getListAction({ page, limit }));
		}
	};

	useEffect(() => {
		dispatch(getListAction({ page: 1, limit }));
	}, []);

	return (
		<Card className={`${totalPages <= 1 && 'hidden'} !bg-transparent`}>
			<CardFooter>
				<div className='ml-auto flex items-center gap-2 '>
					{pageNumbers.map((pageNumber) => (
						<Button
							onClick={() => handlePageChange(pageNumber)}
							color='blue'
							colorIntensity='500'
							borderWidth='border-2'
							className={`   !border-blue-500 hover:!border-blue-600 hover:bg-blue-600 hover:!text-white`}
							key={pageNumber}
							variant={pageNumber === currentPage ? 'solid' : 'outline'}>
							{pageNumber}
						</Button>
					))}
				</div>
			</CardFooter>
		</Card>
	);
};

export default Pagination;
