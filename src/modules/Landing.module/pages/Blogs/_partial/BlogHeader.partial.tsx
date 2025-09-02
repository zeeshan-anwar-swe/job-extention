import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import {
	getBlogPosts,
	setBlogSearch,
	setBlogTab,
} from '../../../../../store/slices/LandingPage/Blog.slice';
import CustomSearchComponent from '../../../../Shared/components/CustomSearch.component';

export const BlogHeaderPartial = () => {
	const dispatch: AppDispatch = useDispatch();
	const { tab } = useSelector((state: RootState) => state.blog.blogPosts);
	return (
		<div className='md:py-15 container mx-auto flex w-full flex-col items-center space-x-0 space-y-3 py-4 md:w-auto md:flex-row md:space-x-5 md:space-y-0'>
			<div className='relative w-full py-4 md:w-3/4'>
				<div className='flex flex-row space-x-2 md:space-x-4'>
					<div
						onClick={() => dispatch(setBlogTab('view-all'))}
						className={`font-inter z-20 cursor-pointer border-b-2 py-2 text-base font-semibold leading-6 ${
							tab === 'view-all'
								? 'border-[#004EEB] text-[#004EEB]'
								: 'border-transparent text-[#667085]'
						}`}>
						View all
					</div>
					<div
						onClick={() => dispatch(setBlogTab('news'))}
						className={`font-inter z-20 cursor-pointer border-b-2 py-2 text-base font-semibold leading-6 ${
							tab === 'news'
								? 'border-[#004EEB] text-[#004EEB]'
								: 'border-transparent text-[#667085]'
						}`}>
						News
					</div>
					<div
						onClick={() => dispatch(setBlogTab('updates'))}
						className={`font-inter z-20 cursor-pointer border-b-2 py-2 text-base font-semibold leading-6 ${
							tab === 'updates'
								? 'border-[#004EEB] text-[#004EEB]'
								: 'border-transparent text-[#667085]'
						}`}>
						Updates
					</div>
					<div
						onClick={() => dispatch(setBlogTab('case-studies'))}
						className={`font-inter z-20 cursor-pointer border-b-2 py-2 text-base font-semibold leading-6 ${
							tab === 'case-studies'
								? 'border-[#004EEB] text-[#004EEB]'
								: 'border-transparent text-[#667085]'
						}`}>
						Case Studies
					</div>
				</div>
				<hr className='absolute bottom-4 w-full border-b border-amber-50' />
			</div>
			<CustomSearchComponent
				placeholder='Search blogs...'
				searchListAction={getBlogPosts}
				searchLimit={9}
				setSearchActionForPagination={setBlogSearch}
			/>
		</div>
	);
};
