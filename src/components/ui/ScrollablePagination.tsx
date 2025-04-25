import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import toast from 'react-hot-toast';

interface ScrollPaginationWithObserverProps {
  initialLimit: number;
  loadMoreAction: ({ page, limit }: { page: number; limit: number }) => void;
}

const ScrollablePagination: React.FC<ScrollPaginationWithObserverProps> = ({
  initialLimit,
  loadMoreAction,
}) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { inView } = useInView({
    threshold: 0.1,
    rootMargin: '20px',
    triggerOnce: false,
  });
 
  useEffect(() => {
    
      dispatch(loadMoreAction({page,limit}))
    
  }, []);

  


  useEffect(() => {
    if (inView ) {
      toast.success("inview")
    }
  }, [inView]);

  return (
    <div ref={loadMoreRef}>
      {loading && <div>Loading more items...</div>}
      {/* {!hasMore && page > 1 && <div>No more items to load.</div>} */}
      {/* The div above with the ref will trigger the `inView` state change */}
    </div>
  );
};

export default ScrollablePagination;