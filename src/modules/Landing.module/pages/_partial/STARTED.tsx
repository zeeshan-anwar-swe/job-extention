import startbg from "../../../../../public/assets/startbg.jpg";
function STARTED() {
  return (
    <section
      className="rounded-xl max-w-[1280px] mx-auto font-['Inter'] px-5 md:px-10 lg:px-14 py-6 md:py-10 lg:py-16"
      style={{
        backgroundImage: `url(${startbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="font-inter font-normal text-lg leading-[30px] text-[#565C69] text-center">
          Ready to Transform Your Hiring Process?
        </div>
        <div className="text-center font-semibold md:font-medium text-[36px] leading-[44px] tracking-[-0.02em] text-[#010314]">
          Get ready to Shaping Legal Strategies with <br /> AI-Powered Precision
          and Insight.
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto justify-center">
          <div className="flex">
            <button className="rounded-lg px-6 py-3 w-full md:w-auto cursor-pointer bg-gradient-to-r from-[#1E51E8] to-[#0BA5EC] font-inter font-semibold text-lg leading-7 text-white">
              Get Started
            </button>
          </div>
          <div className="flex">
            <button className="rounded-lg px-6 py-3 w-full md:w-auto bg-[#A6A8B5] cursor-pointer font-inter font-semibold text-lg leading-7 text-white">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default STARTED;
