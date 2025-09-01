import FAQ from '../_partial/FAQ';
import FOOTER from '../_partial/FOOTER';
import PricingCard from '../_partial/PricingCard';
import STARTED from '../_partial/STARTED';

function PRICING() {
	const basicPlanFeatures = [
		'Upload and analyse up to 5 dental images per month.',
		'Dashboard interactions for detailed review.',
		'Access to standard dental health reports.',
	];
	const premiumPlanFeatures = [
		'Upload and analyse unlimited dental images per month,',
		'Interactive dashboard features for in-depth examination.',
		'Advanced dental health insights and strategic dental-care recommendations.',
		'Access to premium dental report templates via dashboard.',
		'AI-driven suggestions for dental health improvement.',
		'Priority email support for assistance.',
	];
	return (
		<div className='bg-[#E0E2F4] '>

		<section className='mx-auto max-w-[1280px] bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-6 lg:px-14 lg:py-10'>
			{/* pricing setion start */}
			<section className=''>
				<div className='flex flex-col items-center space-y-2'>
					<div className='font-inter text-center text-3xl font-medium leading-none tracking-[-0.02em] text-[#101828]'>
						Pricing Plans
					</div>
					<div className='font-inter py-3 text-center text-lg font-normal leading-[30px] text-[#475467]'>
						Choose a plan that fits your recruitment goals—whether you're a solo
						recruiter or a growing enterprise.
					</div>
					<div className='font-inter flex w-fit items-center rounded-full border border-[#F2F4F7] bg-white px-1 py-1 text-sm font-medium text-[#667085] md:text-lg'>
						<div className='font-inter rounded-full bg-[#1F51E8] px-3 text-white'>
							Monthly Billing
						</div>
						Annual Billing
					</div>
				</div>

				<div className=' mx-auto flex flex-col gap-6 py-5 md:flex-row'>
					<PricingCard
						planName={'Basic plan'}
						price={'Free'}
						description={'The essentials to provide your best work for clients.'}
						buttonTextColor='text-[#344054]'
						buttonText={'Current Plan'}
						features={basicPlanFeatures}
					/>
					<PricingCard
						planName={'Premium plan'}
						price={'$20'}
						priceSubtext={'per month'}
						description={'A plan that scales with your rapidly growing business.'}
						buttonTextColor='text-[#FFFFFF]'
						buttonBgColor='bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC]'
						buttonText={'Upgrade Plan'}
						features={premiumPlanFeatures}
					/>
					<PricingCard
						planName={'Premium plan'}
						price={'$20'}
						priceSubtext={'per month'}
						description={'A plan that scales with your rapidly growing business.'}
						buttonTextColor='text-[#FFFFFF]'
						buttonBgColor='bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC]'
						buttonText={'Upgrade Plan'}
						features={premiumPlanFeatures}
					/>
				</div>

				{/* Pricing. section ends */}
			</section>

			{/* FAQ setion start */}
			<section className='py-3 md:py-6 lg:py-10'>
				<FAQ />
			</section>

			{/* Started section start */}
			<section>
				<STARTED />
			</section>
			{/* Started section ends */}

			{/* main secrion ends */}
		</section>
		</div>

	);
}
export default PRICING;
