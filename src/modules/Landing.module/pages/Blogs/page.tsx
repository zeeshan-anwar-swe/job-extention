import FOOTER from '../_partial/FOOTER';
import driven from '../../../../../public/assets/driven.png';
import future from '../../../../../public/assets/future.png';
import STARTED from '../_partial/STARTED';
import tradition from '../../../../../public/assets/tradition.png';
import LatestCard from '../_partial/LatestCard';
import searchicon from '../../../../../public/assets/searchicon.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import { getBlogPosts } from '../../../../store/slices/LandingPage/Blog.slice';
import { TBlogPost } from '../../../../types/slices.type/agency/blog.slice.type';
import { BlogHeaderPartial } from './_partial/BlogHeader.partial';

function BLOG() {
	const { error, rows, search, loading, count } = useSelector(
		(state: RootState) => state.blog.blogPosts,
	);
	return (
		<div className='bg-[#E0E2F4]'>
			<section className='mx-auto max-w-[1280px] space-y-4 bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10'>
				{/* BLOG section start */}
				<section className=''>
					<div className='container mx-auto'>
						<div className='flex flex-col justify-center space-y-2 text-center md:space-y-5'>
							<span className='font-inter bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold leading-6 text-transparent'>
								Our Blog
							</span>

							<h1 className='font-inter text-center font-medium  text-[#101828] md:text-lg lg:text-5xl'>
								Navigating the Path to Optimal <br />
							</h1>
							<h1 className='font-inter text-center font-medium  text-[#101828] md:text-lg lg:text-5xl'>
								Hiring Process
							</h1>

							<span className='font-inter text-lg font-normal leading-7 text-[#475467] lg:text-xl'>
								Explore cutting-edge developments and inspiring stories from the
								world of KoalaByte AI.
							</span>
						</div>
					</div>

					<BlogHeaderPartial />

					<PageLoader loading={loading} data={rows} error={error}>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
							{rows.map((blogPost: TBlogPost) => (
								<LatestCard
									image={blogPost.image}
									headingA={blogPost.title}
									headingB={blogPost.readingTime}
									title={blogPost.title}
									description={blogPost.content}
									navigatePath='/blog-post'
								/>
							))}
						</div>
					</PageLoader>
					<Pagination
						count={count}
						getListAction={getBlogPosts}
						limit={9}
						search={search}
					/>
				</section>

				{/* started section start */}
				<section>
					<STARTED />
				</section>

				{/* footer section start */}
				<section>
					<FOOTER />
				</section>
			</section>
		</div>
	);
}
export default BLOG;
