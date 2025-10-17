import { Link } from "react-router-dom";
import { CardSubTitle } from "../../../../components/ui/Card";

function FOOTER() {
  return (
    <section className="pt-5 md:pt-10 lg:pt-16  w-full mx-auto  px-5 md:px-10 lg:px-14 ">
      <div className="flex items-center flex-col space-y-5 md:space-y-7">
        <div>
          <img className="h-12" src="/assets/logo-new.png" alt="logo" />
        </div>
        <div className="flex flex-row justify-between items-center space-x-3 md:space-x-5">
          <div>
            <img src="/assets/fb.png" alt="Facebook" />
          </div>
          <div>
            <img src="/assets/insta.png" alt="Instagram" />
          </div>
          <div>
            <img src="/assets/axe.png" alt="Axe" />
          </div>
          <div>
            <img src="/assets/lnkdn.png" alt="LinkedIn" />
          </div>
        </div>
        <CardSubTitle className="text-center font-inter font-normal text-xs   text-[#010314]">
          Koalify  AI simplifies hiring with automated candidate sourcing,
          real-time CV editing, and seamless CRM integration. <br /> Its
          AI-powered talking avatar helps recruiters navigate, manage tasks, and
          find top talent effortlessly.
        </CardSubTitle>

        <div className="w-full h-px bg-gray-700"></div>

        <div className="flex w-full flex-col md:flex-row justify-between items-center">
          <div className="text-left font-inter font-normal text-base leading-6 text-[#667085]">
            Copyright © 2025 Koality.
          </div>
          <div>
            Fully compliant with GDPR, CCPA, and all major privacy regulations.
          </div>
          <div className="text-right font-inter font-normal text-base leading-6 text-[#667085]">
            Terms&nbsp;&nbsp;&nbsp;
            <Link to="/privacy-policy" className="hover:underline">
            Privacy
            </Link>
            &nbsp;&nbsp;&nbsp;Cookies
          </div>
        </div>
      </div>
    </section>
  );
}
export default FOOTER;
