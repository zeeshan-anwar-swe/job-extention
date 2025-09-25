import { motion } from 'framer-motion';
import PricingCard from '../../_partial/PricingCard';
import Card from '../../_partial/Card';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardB from '../../_partial/CardB';
import LatestCard from '../../_partial/LatestCard';
import SlideCard from '../../_partial/SlideCard';
import { useNavigate } from 'react-router-dom';
import { CaseStudieSection } from './CaseStudieSection';

export const HomeOtherSections = () => {
	const navigateTo = useNavigate();
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

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	const slideVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.3,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	return (
		<>
			{/* Core Features Header */}
			<motion.section
				className='flex flex-col items-center justify-between md:flex-row'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}>
				<motion.div className='mb-6 md:mb-0' variants={itemVariants}>
					<span className='block bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold text-transparent'>
						Core Features
					</span>
					<h2 className='mt-2 text-2xl font-medium text-[#010314] dark:text-[#010314] md:text-3xl'>
						Core Features That Redefine Your Hiring Process!
					</h2>
				</motion.div>
				<motion.a
					href='/signup'
					className='flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-5 py-2.5 text-white'
					variants={itemVariants}
					whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(30, 81, 232, 0.3)' }}
					whileTap={{ scale: 0.95 }}>
					Get Started &gt;
				</motion.a>
			</motion.section>

			{/* Features Cards */}
			<motion.section
				className='grid grid-cols-1 gap-6 md:grid-cols-3'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}>
				<motion.div variants={itemVariants}>
					<Card
						image='/assets/crm.png'
						title={'Efficiently Move Data to Your CRM'}
						description={
							"Effortlessly move candidate details and edited CVs from KoalaByte to your recruiter's CRM, ensuring seamless data management and workflow integration."
						}
					/>
				</motion.div>
				<motion.div variants={itemVariants}>
					<Card
						image='/assets/crm.png'
						title={'Data-Driven Hiring Decisions'}
						description={
							"Effortlessly move candidate details and edited CVs from KoalaByte to your recruiter's CRM, ensuring seamless data management and workflow integration."
						}
					/>
				</motion.div>
				<motion.div variants={itemVariants}>
					<Card
						image='/assets/crm.png'
						title={'Efficiently Move Data to Your CRM'}
						description={
							"Effortlessly move candidate details and edited CVs from KoalaByte to your recruiter's CRM, ensuring seamless data management and workflow integration."
						}
					/>
				</motion.div>
			</motion.section>

			{/* Why Choose Section */}
			<motion.section
				className='flex flex-col items-center justify-between md:flex-row'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}>
				<motion.div className='mb-6 md:mb-0 md:w-2/3' variants={slideVariants}>
					<span className='block bg-gradient-to-r from-[#1297C6] to-[#477EF5] bg-clip-text text-base font-semibold text-transparent'>
						Core Features
					</span>
					<h2 className='mb-2 mt-2 text-2xl font-medium text-[#010314] dark:text-[#010314] md:text-3xl'>
						Why Choose KoalaByte AI?
					</h2>
					<p className='text-lg text-[#010314]/50'>
						Experience the future of recruitment with AI-driven efficiency, seamless
						automation, and intelligent decision-making—all in one platform.
					</p>
				</motion.div>
				<motion.button
					className='cursor-pointer rounded-lg bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] px-5 py-2.5 font-semibold text-white'
					variants={itemVariants}
					whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(30, 81, 232, 0.3)' }}
					whileTap={{ scale: 0.95 }}>
					Get &gt;
				</motion.button>
			</motion.section>

			{/* Secure & Smart Section */}
			<motion.section
				className='rounded-2xl border-2 border-white bg-white/50 p-6 md:p-8'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}>
				<div className='flex flex-col gap-8 md:flex-row'>
					<motion.div className='md:w-1/2' variants={slideVariants}>
						<div className='mb-4 flex items-center text-2xl font-medium text-[#010314]'>
							<img src='/assets/cube.png' alt='cube' className='mr-3 h-8 w-8' />
							Secure & Smart Candidate Management
						</div>
						<p className='text-lg text-[#515151]'>
							KoalaByte ensures a seamless and secure recruitment experience with
							encrypted data, role-based access, and real-time candidate tracking.
							Effortlessly search, edit, and assign candidates while maintaining a
							scalable and recruiter-friendly workflow.
						</p>
					</motion.div>
					<motion.div className='items-center md:w-1/2' variants={itemVariants}>
						<img
							src='/assets/frame32.png'
							alt='frame32'
							className='w-full rounded-lg'
						/>
					</motion.div>
				</div>
			</motion.section>

			{/* Additional Features */}
			<motion.section
				className='grid grid-cols-1 gap-8 md:grid-cols-2'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}>
				<motion.div variants={itemVariants}>
					<CardB
						image='/assets/search.png'
						icon='/assets/vector.png'
						title={'AI-Powered Candidate Search'}
						description={
							"KoalaByte's intelligent AI assistant sifts through vast databases, analyzing profiles from LinkedIn and GitHub to match you with the best-fit candidates in seconds."
						}
					/>
				</motion.div>
				<motion.div variants={itemVariants}>
					<CardB
						image='/assets/stream.png'
						icon='/assets/server.png'
						title={'Streamlined Workflow & CRM Integration'}
						description={
							'KoalaByte keeps your recruitment process seamless by automatically transferring candidate profiles, edited CVs, and job details to your CRM.'
						}
					/>
				</motion.div>
			</motion.section>

			{/* Case Studies */}
			<CaseStudieSection/>

			{/* Pricing Section */}
			<motion.section
				className='text-center'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}>
				<motion.div variants={itemVariants}>
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
				</motion.div>

				<motion.div
					className='grid grid-cols-1 gap-6 md:grid-cols-3'
					variants={containerVariants}>
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
				</motion.div>
			</motion.section>

			{/* slide card */}
			<motion.section
				className='rounded-lg border-2 border-white bg-white/50 p-6'
				variants={itemVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}>
				<Slider {...settings}>
					<SlideCard
						quote={
							'Before KoalaByte, hiring was slow and tedious. Now, AI-powered search, seamless CRM integration, and the talking avatar assistant have streamlined everything. We cut hiring time by 40% and improved placements dramatically—KoalaByte is a game-changer!'
						}
						author={'— Drew Cano'}
						position={'Senior Technical Recruiter'}
						imageSrc='/assets/drew.png'
					/>
					<SlideCard
						quote={
							'The CRM integration is seamless, and the talking avatar assistant is a game-changer. Highly recommend KoalaByte.'
						}
						author={'— Jane Smith'}
						position={'HR Manager'}
						imageSrc='/assets/frame32.png'
					/>
				</Slider>
			</motion.section>
		</>
	);
};
