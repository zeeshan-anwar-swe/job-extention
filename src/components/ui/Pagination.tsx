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

    const handlePageChange = async (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            await setCurrentPage(page);
            dispatch(getListAction({ page, limit }));
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

    return (
        <Card className={`${totalPages <= 1 && 'hidden'} !bg-transparent`}>
            <CardFooter>
                <div className='ml-auto flex items-center gap-2 '>
                    <Button
                        onClick={handlePrevPage}
                        color='blue'
                        colorIntensity='500'
                        borderWidth='border-2'
                        className={`!border-blue-500 hover:!border-blue-600 hover:bg-blue-600 hover:!text-white ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                        isDisable={currentPage === 1}
                    >
                        Prev
                    </Button>
                    {totalPages > 0 && (
                        <Button
                            color='blue'
                            colorIntensity='500'
                            borderWidth='border-2'
                            className='!border-blue-500'
                            variant='solid'
                            isDisable
                        >
                            {currentPage} / {totalPages}
                        </Button>
                    )}
                    <Button
                        onClick={handleNextPage}
                        color='blue'
                        colorIntensity='500'
                        borderWidth='border-2'
                        className={`!border-blue-500 hover:!border-blue-600 hover:bg-blue-600 hover:!text-white ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                        isDisable={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Pagination;