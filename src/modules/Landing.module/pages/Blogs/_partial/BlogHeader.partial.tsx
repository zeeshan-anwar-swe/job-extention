import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import {
	getBlogCategoryList,
	getBlogPosts,
	setBlogSearch,
	setBlogTab,
} from '../../../../../store/slices/Blog.slice';
import CustomSearchComponent from '../../../../Shared/components/CustomSearch.component';
import { useEffect } from 'react';
import { TBlogCategory } from '../../../../../types/slices.type/blog.slice.type';

export const BlogHeaderPartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { tab } = useSelector((state: RootState) => state.blog.blogPosts);
	const { rows, loading, error } = useSelector((state: RootState) => state.blog.blogCategoryList);

	console.log({ rows, loading, error });

	useEffect(() => {
		dispatch(getBlogCategoryList({ limit: 10, page: 1 }));
	}, []);
	return (
		<div className='md:py-15 container mx-auto flex w-full flex-col items-center space-x-0 space-y-3 py-4 md:w-auto md:flex-row md:space-x-5 md:space-y-0'>
			<div className='relative w-full py-4 md:w-3/4'>
				<div className='flex flex-row space-x-2 md:space-x-4'>
					<div
						onClick={() => dispatch(setBlogTab(null))}
						className={`font-inter z-20 cursor-pointer border-b-2 py-2 text-base font-semibold leading-6 ${
							tab === null
								? 'border-[#004EEB] text-[#004EEB]'
								: 'border-transparent text-[#667085]'
						}`}>
						View all
					</div>

					{rows.map((category: TBlogCategory) => (
						<div
							key={category.id}
							onClick={() => dispatch(setBlogTab(category))}
							className={`font-inter z-20 cursor-pointer border-b-2 py-2 text-base font-semibold leading-6 ${
								tab?.name === category.name
									? 'border-[#004EEB] text-[#004EEB]'
									: 'border-transparent text-[#667085]'
							}`}>
							{category.name}
						</div>
					))}
				</div>
				<hr className='absolute bottom-4 w-full border-b border-amber-50' />
			</div>
			<CustomSearchComponent
				searchLimit={9}
				idForList={tab?.id}
				placeholder='Search blogs...'
				searchListAction={getBlogPosts}
				setSearchActionForPagination={setBlogSearch}
			/>
		</div>
	);
};
