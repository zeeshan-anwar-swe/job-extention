import FAQ from "../_partial/FAQ";
import "slick-carousel/slick/slick.css";
import STARTED from "../_partial/STARTED";
import "slick-carousel/slick/slick-theme.css";
import { HomeHeroSection } from "./_partial/HeroSection";
import { HomeOtherSections } from "./_partial/OtherSections";
import { HomeIntroductionSection } from "./_partial/IntroductionSection";
import PageWrapper from "../../../../components/layouts/PageWrapper/PageWrapper";
import "../../styles/App.css";
import "../../styles/index.css";

function LandingPage() {
  return (
    <PageWrapper isProtectedRoute={false} name="Home">
      <div className="w-full overflow-x-hidden bg-primary-bg">
        <HomeHeroSection />
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 md:space-y-20 lg:space-y-24 lg:px-8">
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
