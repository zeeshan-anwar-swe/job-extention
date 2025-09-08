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
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import { HomeHeroSection } from './_partial/HeroSection';
import { HomeIntroductionSection } from './_partial/IntroductionSection';
import { HomeOtherSections } from './_partial/OtherSections';
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
		<PageWrapper isProtectedRoute={false} name='Home'>
			<div className='w-full overflow-x-hidden bg-primary-bg'>
				<HomeHeroSection />

				<div className='mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 md:space-y-20 lg:space-y-24 lg:px-8'>
					<HomeIntroductionSection />

					<HomeOtherSections />

					<section>
						<FAQ />
					</section>

					<section>
						<STARTED />
					</section>
				</div>
			</div>
		</PageWrapper>
	);
}

export default LandingPage;
