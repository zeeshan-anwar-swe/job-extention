import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FAQ from '../_partial/FAQ';
import STARTED from '../_partial/STARTED';
import FOOTER from '../_partial/FOOTER';
import Card from '../_partial/Card';
import CardB from '../_partial/CardB';
import LatestCard from '../_partial/LatestCard';
import PricingCard from '../_partial/PricingCard';
import SlideCard from '../_partial/SlideCard';
import microphone from '../../../../../public/assets/microphone.png';
import play from '../../../../../public/assets/play.png';
import dashboard from '../../../../../public/assets/dashboard.png';
import crm from '../../../../../public/assets/crm.png';
import frame32 from '../../../../../public/assets/frame32.png';
import cube from '../../../../../public/assets/cube.png';
import server from '../../../../../public/assets/server.png';
import vector from '../../../../../public/assets/vector.png';
import stream from '../../../../../public/assets/stream.png';
import search from '../../../../../public/assets/search.png';
import tradition from '../../../../../public/assets/tradition.png';
import driven from '../../../../../public/assets/driven.png';
import man from '../../../../../public/assets/man.png';
import righticon from '../../../../../public/assets/righticon.png';
import lefticon from '../../../../../public/assets/lefticon.png';
import drew from '../../../../../public/assets/drew.png';
import bg from '../../../../../public/assets/bg.jpg';
// import animatedbear from "../../../../../public/assets/animated-bear.gif";

function LandingPage() {
	const basicPlanFeatures = ['5 jobs', 'Limited Candidates access', 'Basic analytics'];
	const premiumPlanFeatures = [
		'Unlimited jobs',
		'Access to KoalaByte talking avatar.',
		'Advanced analytics',
		'24-hour support response time',
		'CRM automations.',
	];

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 0,
		arrows: false,
	};

	return (
		<div className='w-full overflow-x-hidden bg-[#E0E2F4]'>
			<section className='py-5 md:py-8 lg:py-10'>
				<div
					className='relative w-full'
					style={{
						backgroundImage: `
              linear-gradient(
                to top,
                rgba(224, 226, 244, 0) 0%,
                rgba(224, 226, 244, 0.5) 50%,
                rgba(224, 226, 244, 1) 100%
              ),
              url(${bg})
            `,
						backgroundSize: '100% 50%',
						backgroundPosition: 'bottom center',
						backgroundRepeat: 'no-repeat',
						height: '100%',
					}}>
					<section className='mx-auto max-w-[1280px] px-5 md:px-10 lg:px-14'>
						<div className='lg-space-x-8 mx-auto flex flex-col items-start justify-between space-y-8 py-8 md:flex-row md:space-x-5 md:space-y-0'>
							<div className='w-full md:w-1/2 '>
								<div className=''>
									<div className='flex w-fit items-center rounded-full bg-white/50 px-1 py-1 text-sm text-[#010314]/50 lg:text-lg'>
										<div className='mr-2 rounded-full bg-gradient-to-r from-[#1F51E8] to-[#0D9DEC] px-3 text-sm text-white md:mr-3 lg:text-lg'>
											Find, Track, Hire
										</div>
										Join our beta <button className='cursor-pointer'>→</button>
									</div>

									<div className='pt-5'>
										<span className='block font-[Urbanist] text-3xl font-semibold text-[#0535A8] md:text-4xl lg:text-6xl'>
											Your Koalifed AI <br /> Recruiting Assistant- <br />
										</span>
										<span className='block font-[Urbanist] text-3xl font-semibold text-[#1E1E1E] md:text-4xl lg:text-6xl'>
											KoalaByte
										</span>
									</div>

									<div className='py-5 text-justify text-[#475467] lg:text-lg'>
										KoalaByte revolutionizes recruitment with an AI-powered
										talking avatar assistant —search candidates, manage jobs,
										and navigate effortlessly using just your voice.
									</div>

									<div>
										<a
											href='/signup'
											className='cursor-pointer rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-4 py-2 text-white'>
											Get Started &gt;
										</a>
									</div>
								</div>
							</div>

							<div className="rounded-4xl relative flex h-full min-h-[400px] w-full flex-col items-center justify-between bg-[url('./assets/Frame.png')] bg-cover bg-center bg-no-repeat py-6 md:w-1/2 md:py-12">
								{/* Top Text */}
								<div className='z-10 w-auto rounded-full bg-[#0073FF] px-3 text-sm text-white md:text-lg'>
									Looking for top talent?
								</div>

								{/* Centered GIF */}
								<div className='relative z-10 flex w-full flex-1 items-center justify-center'>
									<img
										src='/images/animated-bear.gif'
										alt='beargif'
										className='h-full max-h-[300px] w-auto object-contain'
									/>
								</div>

								{/* Bottom Button */}
								<div className='z-10 flex w-auto items-center rounded-full bg-gradient-to-r from-[#2C5EF4] to-[#0D9BEC] px-3 text-sm text-white'>
									<img
										src={microphone}
										alt='Microphone'
										className='mr-2 h-4 w-4'
									/>
									<span className='text-white'>Start Talking</span>
								</div>
							</div>
						</div>
					</section>
				</div>
			</section>

			{/* Main Content Sections */}
			<div className='mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 md:space-y-20 lg:space-y-24 lg:px-8'>
				{/* Introducing Section */}
				<section className='overflow-hidden rounded-2xl border-2 border-white bg-white/50'>
					<div className='flex flex-col md:flex-row'>
						<div className='w-full p-6 md:w-1/2 md:p-8 lg:p-12'>
							<span className='bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-sm font-semibold text-transparent md:text-base'>
								Introducing KoalaByte AI
							</span>
							<h2 className='mb-4 mt-2 text-2xl font-medium text-[#010314] md:text-3xl'>
								Empower Your Hiring and Job Tracking with AI
							</h2>
							<p className='mb-6 text-base text-[#8F8F8F] md:text-lg'>
								KoalaByte AI offers a range of core advantages that set us apart in
								the human resource technology landscape. These advantages are
								designed to make your processes more efficient, data-driven, and
								ultimately more successful.
							</p>
							<button className='flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-5 py-2.5 text-white'>
								<span className='font-semibold'>Watch Demo</span>
								<img src={play} alt='Play icon' className='ml-2 h-4 w-4' />
							</button>
						</div>
						<div className='relative min-h-[300px] w-full md:w-1/2'>
							<img
								src={dashboard}
								alt='Dashboard'
								className='h-full w-full rounded-3xl object-cover pt-4 lg:object-contain lg:object-right'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#1399C7] to-[#0435A7]'>
									<img src={play} alt='Play icon' className='h-6 w-6' />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Core Features Header */}
				<section className='flex flex-col items-center justify-between md:flex-row'>
					<div className='mb-6 md:mb-0'>
						<span className='block bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold text-transparent'>
							Core Features
						</span>
						<h2 className='mt-2 text-2xl font-medium text-[#010314] md:text-3xl'>
							Core Features That Redefine Your Hiring Process!
						</h2>
					</div>
					<a
						href='/signup'
						className='flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-5 py-2.5 text-white'>
						Get Started &gt;
					</a>
				</section>

				{/* Features Cards */}
				<section className='grid grid-cols-1  gap-6 md:grid-cols-3'>
					<Card
						image={crm}
						title={'Efficiently Move Data to Your CRM'}
						description={
							"Effortlessly move candidate details and edited CVs from KoalaByte to your recruiter's CRM, ensuring seamless data management and workflow integration."
						}
					/>
					<Card
						image={crm}
						title={'Data-Driven Hiring Decisions'}
						description={
							"Effortlessly move candidate details and edited CVs from KoalaByte to your recruiter's CRM, ensuring seamless data management and workflow integration."
						}
					/>
					<Card
						image={crm}
						title={'Efficiently Move Data to Your CRM'}
						description={
							"Effortlessly move candidate details and edited CVs from KoalaByte to your recruiter's CRM, ensuring seamless data management and workflow integration."
						}
					/>
				</section>

				{/* Why Choose Section */}
				<section className='flex flex-col items-center justify-between md:flex-row'>
					<div className='mb-6 md:mb-0 md:w-2/3'>
						<span className='block bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold text-transparent'>
							Core Features
						</span>
						<h2 className='mb-2 mt-2 text-2xl font-medium text-[#010314] md:text-3xl'>
							Why Choose KoalaByte AI?
						</h2>
						<p className='text-lg text-[#010314]/50'>
							Experience the future of recruitment with AI-driven efficiency, seamless
							automation, and intelligent decision-making—all in one platform.
						</p>
					</div>
					<button className='cursor-pointer rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-5 py-2.5 font-semibold text-white'>
						Get &gt;
					</button>
				</section>

				{/* Secure & Smart Section */}
				<section className='rounded-2xl border-2 border-white bg-white/50 p-6 md:p-8'>
					<div className='flex flex-col gap-8 md:flex-row'>
						<div className='md:w-1/2'>
							<div className='mb-4 flex items-center text-2xl font-medium text-[#010314]'>
								<img src={cube} alt='cube' className='mr-3 h-8 w-8' />
								Secure & Smart Candidate Management
							</div>
							<p className='text-lg text-[#515151]'>
								KoalaByte ensures a seamless and secure recruitment experience with
								encrypted data, role-based access, and real-time candidate tracking.
								Effortlessly search, edit, and assign candidates while maintaining a
								scalable and recruiter-friendly workflow.
							</p>
						</div>
						<div className='items-center md:w-1/2'>
							<img src={frame32} alt='frame32' className='w-full rounded-lg ' />
						</div>
					</div>
				</section>

				{/* Additional Features */}
				<section className='grid grid-cols-1 gap-8 md:grid-cols-2'>
					<CardB
						image={search}
						icon={vector}
						title={'AI-Powered Candidate Search'}
						description={
							"KoalaByte's intelligent AI assistant sifts through vast databases, analyzing profiles from LinkedIn and GitHub to match you with the best-fit candidates in seconds."
						}
					/>
					<CardB
						image={stream}
						icon={server}
						title={'Streamlined Workflow & CRM Integration'}
						description={
							'KoalaByte keeps your recruitment process seamless by automatically transferring candidate profiles, edited CVs, and job details to your CRM.'
						}
					/>
				</section>

				{/* Case Studies */}
				<section className='rounded-lg bg-white/50 p-6 md:p-8'>
					<div className='mb-8 flex flex-col items-start justify-between md:flex-row md:items-center'>
						<div className='mb-6 md:mb-0'>
							<h2 className='mb-2 text-2xl font-medium text-[#010314] md:text-3xl'>
								Latest Case Studies
							</h2>
							<p className='text-lg text-[#010314]/50'>
								Real-world examples showcasing the impact of the Solomon AI concept
								on businesses.
							</p>
						</div>
						<div className='flex items-center space-x-3'>
							<button className='flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-4 py-2 text-white'>
								All Posts &gt;
							</button>
							<button className='cursor-pointer rounded-full bg-white p-2 shadow-sm'>
								<img src={lefticon} alt='lefticon' className='h-4 w-4' />
							</button>
							<button className='cursor-pointer rounded-full bg-white p-2 shadow-sm'>
								<img src={righticon} alt='righticon' className='h-4 w-4' />
							</button>
						</div>
					</div>

					<div className='grid grid-cols-1 gap-6  md:grid-cols-3'>
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
							image={man}
							headingA={'Technology'}
							headingB={'8 min read'}
							title={'Future of Interviews in Hiring Process'}
							description={
								'Understand how AI is transforming recruitment and improving decision-making.'
							}
							navigatePath='*'
						/>
					</div>
				</section>

				{/* Pricing Section */}
				<section className='text-center'>
					<span className='bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold text-transparent'>
						Pricing
					</span>
					<h2 className='mb-2 mt-2 text-2xl font-medium text-[#101828] md:text-3xl'>
						Plans that Fit Your Scale
					</h2>
					<p className='mx-auto mb-8 max-w-2xl text-lg text-[#475467]'>
						Find your perfect plan at KolaByte AI. Unlock all premium features to
						streamline your hiring process.
					</p>

					<div className='grid grid-cols-1 gap-6  md:grid-cols-3'>
						<PricingCard
							planName={'Basic plan'}
							price={'Free'}
							priceSubtext={'forever'}
							description={'The essentials to provide your best work for clients.'}
							buttonTextColor='text-[#344054]'
							buttonText={'Sign Up'}
							features={basicPlanFeatures}
						/>
						<PricingCard
							planName={'Startup plan'}
							recommended={'Recommended'}
							price={'$20'}
							priceSubtext={'per month'}
							description={'A plan that scales with your rapidly growing business.'}
							buttonTextColor='text-[#FFFFFF]'
							buttonBgColor='bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC]'
							buttonText={'Get Started'}
							features={premiumPlanFeatures}
						/>
						<PricingCard
							planName={'Startup plan'}
							price={'$20'}
							priceSubtext={'per month'}
							description={'A plan that scales with your rapidly growing business.'}
							buttonTextColor='text-[#FFFFFF]'
							buttonBgColor='bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC]'
							buttonText={'Get Started'}
							features={premiumPlanFeatures}
						/>
					</div>
				</section>

				{/* slide card */}
				<section className='rounded-lg border-2 border-white bg-white/50 p-6'>
					<Slider {...settings}>
						<SlideCard
							quote={
								'Before KoalaByte, hiring was slow and tedious. Now, AI-powered search, seamless CRM integration, and the talking avatar assistant have streamlined everything. We cut hiring time by 40% and improved placements dramatically—KoalaByte is a game-changer!'
							}
							author={'— Drew Cano'}
							position={'Senior Technical Recruiter'}
							imageSrc={drew}
						/>
						<SlideCard
							quote={
								'The CRM integration is seamless, and the talking avatar assistant is a game-changer. Highly recommend KoalaByte.'
							}
							author={'— Jane Smith'}
							position={'HR Manager'}
							imageSrc={frame32}
						/>
					</Slider>
				</section>

				{/* FAQ */}
				<section>
					<FAQ />
				</section>

				{/* Get Started */}
				<section>
					<STARTED />
				</section>

			
			</div>
		</div>
	);
}

export default LandingPage;
