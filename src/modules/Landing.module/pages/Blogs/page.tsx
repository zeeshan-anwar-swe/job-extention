import FOOTER from '../_partial/FOOTER';
import driven from '../../../../../public/assets/driven.png';
import future from '../../../../../public/assets/future.png';
import STARTED from '../_partial/STARTED';
import tradition from '../../../../../public/assets/tradition.png';
import LatestCard from '../_partial/LatestCard';
import searchicon from '../../../../../public/assets/searchicon.png';

function BLOG() {
	return (

    <div className='bg-[#E0E2F4]'>

		<section className='mx-auto max-w-[1280px] bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10'>
			{/* BLOG section start */}
			<section className=''>
				<div className='container mx-auto'>
					<div className='flex flex-col justify-center space-y-2 text-center md:space-y-5'>
						<span className='font-inter bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold leading-6 text-transparent'>
							Our Blog
						</span>

						<span className='font-inter text-center font-medium leading-none tracking-[-0.02em] text-[#101828] md:text-lg lg:text-5xl'>
							Navigating the Path to Optimal <br className='hidden md:block' /> Hiring
							Process
						</span>

						<span className='font-inter text-lg font-normal leading-7 text-[#475467] lg:text-xl'>
							Explore cutting-edge developments and inspiring stories from the world
							of KoalaByte AI.
						</span>
					</div>
				</div>

				<div className='md:py-15 container mx-auto flex w-full flex-col space-x-0 space-y-3 py-4 md:w-auto md:flex-row md:space-x-5 md:space-y-0'>
					<div className='w-full py-4 md:w-3/4'>
						<div className='flex flex-row space-x-2 md:space-x-4'>
							<div className='font-inter text-base font-semibold leading-6 text-[#004EEB]'>
								View all
							</div>
							<div className='font-inter text-base font-semibold leading-6 text-[#667085]'>
								News
							</div>
							<div className='font-inter text-base font-semibold leading-6 text-[#667085]'>
								Updates
							</div>
							<div className='font-inter text-base font-semibold leading-6 text-[#667085]'>
								Case Studies
							</div>
						</div>
						<div className='mt-2 h-1 w-full bg-amber-50'></div>
					</div>
					<div className='w-full md:w-1/4'>
						<div className='flex space-x-2 rounded-2xl border border-amber-50 bg-white p-2'>
							<img src={searchicon} alt='searchicon' className='h-5 w-5' />
							<input
								type='text'
								placeholder='Search'
								className='font-inter w-full rounded-2xl text-base font-normal leading-6 text-[#667085] focus:outline-none'
							/>
						</div>
					</div>
				</div>

				<div className=' mx-auto flex flex-wrap gap-6'>
					<LatestCard
						image={tradition}
						headingA={'Technology'}
						headingB={'8 min read'}
						title={'AI vs. Traditional Hiring'}
						description={
							'Compare the benefits of AI-powered recruitment with traditional methods and see how KoalaByte gives recruiters a competitive edge.'
						}
						navigatePath='*'
					/>
					<LatestCard
						image={driven}
						headingA={'Human Resource Strategies'}
						headingB={'8 min read'}
						title={'Data-Driven Hiring: How to Make Smarter Recruitment Decisions'}
						description={
							'Learn how analytics and AI can optimize your hiring process for better outcomes.'
						}
						navigatePath='/Blog/BlogPost'
					/>
					<LatestCard
						image={future}
						headingA={'Technology'}
						headingB={'8 min read'}
						title={'Future of Interviews in Hiring Process'}
						description={
							'Understand how AI is transforming recruitment and improving decision-making.'
						}
						navigatePath='*'
					/>
				</div>

				<div className=' mx-auto flex flex-wrap gap-6 py-5 md:py-8 lg:py-12'>
					<LatestCard
						image={future}
						headingA={'Technology'}
						headingB={'8 min read'}
						title={'Future of Interviews in Hiring Process'}
						description={
							'Understand how AI is transforming recruitment and improving decision-making.'
						}
						navigatePath='*'
					/>
					<LatestCard
						image={tradition}
						headingA={'Technology'}
						headingB={'8 min read'}
						title={'AI vs. Traditional Hiring'}
						description={
							'Compare the benefits of AI-powered recruitment with traditional methods and see how KoalaByte gives recruiters a competitive edge.'
						}
						navigatePath='*'
					/>
					<LatestCard
						image={driven}
						headingA={'Human Resource Strategies'}
						headingB={'8 min read'}
						title={'Data-Driven Hiring: How to Make Smarter Recruitment Decisions'}
						description={
							'Learn how analytics and AI can optimize your hiring process for better outcomes.'
						}
						navigatePath='/Blog/BlogPost'
					/>
				</div>

				<div className=' mx-auto flex flex-wrap gap-6 pb-5 md:pb-8 lg:pb-12'>
					<LatestCard
						image={driven}
						headingA={'Human Resource Strategies'}
						headingB={'8 min read'}
						title={'Data-Driven Hiring: How to Make Smarter Recruitment Decisions'}
						description={
							'Learn how analytics and AI can optimize your hiring process for better outcomes.'
						}
						navigatePath='/Blog/BlogPost'
					/>
					<LatestCard
						image={future}
						headingA={'Technology'}
						headingB={'8 min read'}
						title={'Future of Interviews in Hiring Process'}
						description={
							'Understand how AI is transforming recruitment and improving decision-making.'
						}
						navigatePath='*'
					/>

					<LatestCard
						image={tradition}
						headingA={'Technology'}
						headingB={'8 min read'}
						title={'AI vs. Traditional Hiring'}
						description={
							'Compare the benefits of AI-powered recruitment with traditional methods and see how KoalaByte gives recruiters a competitive edge.'
						}
						navigatePath='*'
					/>
				</div>
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
