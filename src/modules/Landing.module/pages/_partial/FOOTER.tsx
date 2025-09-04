import axe from "../../../../../public/assets/axe.png";
import fb from "../../../../../public/assets/fb.png";
import insta from "../../../../../public/assets/insta.png";
import lnkdn from "../../../../../public/assets/lnkdn.png";
import logo from "../../../../../public/assets/logo-new.png";

function FOOTER() {
  return (
    <section className="pt-5 md:pt-10 lg:pt-16 bg-[#E0E2F4] w-full mx-auto  px-5 md:px-10 lg:px-14 ">
      <div className="flex items-center flex-col space-y-5 md:space-y-7">
        <div>
          <img className="h-12" src={logo} alt="logo" />
        </div>
        <div className="flex flex-row justify-between items-center space-x-3 md:space-x-5">
          <div>
            <img src={fb} alt="Facebook" />
          </div>
          <div>
            <img src={insta} alt="Instagram" />
          </div>
          <div>
            <img src={axe} alt="Axe" />
          </div>
          <div>
            <img src={lnkdn} alt="LinkedIn" />
          </div>
        </div>
        <div className="text-center font-inter font-normal text-xs   text-[#010314]">
          KoalaByte AI simplifies hiring with automated candidate sourcing,
          real-time CV editing, and seamless CRM integration. <br /> Its
          AI-powered talking avatar helps recruiters navigate, manage tasks, and
          find top talent effortlessly.
        </div>

        <div className="w-full h-px bg-gray-700"></div>

        <div className="flex w-full flex-col md:flex-row justify-between items-center">
          <div className="text-left font-inter font-normal text-base leading-6 text-[#667085]">
            Copyright © 2025 Koality.
          </div>
          <div className="text-right font-inter font-normal text-base leading-6 text-[#667085]">
            Terms&nbsp;&nbsp;&nbsp;Privacy&nbsp;&nbsp;&nbsp;Cookies
          </div>
        </div>
      </div>
    </section>
  );
}
export default FOOTER;
