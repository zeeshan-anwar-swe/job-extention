import check from "../../../../../public/assets/check.png";

function PricingCard({
  planName,
  price,
  priceSubtext,
  description,
  buttonText,
  features,
  buttonBgColor = "bg-white",
  buttonTextColor,
  recommended,
}:any) {
  return (
    <div className="flex-1 rounded-2xl bg-white/50 border-2 border-white p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="text-left font-inter font-semibold text-lg leading-7 text-[#475467]">
          {planName}
        </div>
        {recommended && (
          <div className="rounded-full p-1 bg-[#EFF4FF] border border-[#B2CCFF] cursor-pointer font-inter font-medium text-xs leading-5 text-[#004EEB] text-center">
            {recommended}
          </div>
        )}
      </div>
      <div className="text-left">
        <span className=" font-semibold text-[40px] tracking-[-0.02em] text-[#101828] ">
          {price}
        </span>
        <span className=" font-medium text-base leading-6 text-[#475467]">
          {priceSubtext}
        </span>
      </div>
      <div className="text-left  font-normal text-base leading-6 text-[#475467]">
        {description}
      </div>
      <div>
        <button
          className={`w-full rounded-lg p-2 border border-[#C1C7CC] font-inter font-semibold cursor-pointer text-lg leading-7 ${buttonTextColor} ${buttonBgColor}`}
        >
          {buttonText}
        </button>
      </div>
      <div className="w-full h-px bg-gray-400"></div>
      <div className="text-left font-inter font-semibold text-base leading-6 text-[#101828]">
        Features
      </div>
      {features.map((feature:any, index:number) => (
        <div
          key={index}
          className="flex items-center font-inter font-normal text-base leading-6 text-[#475467]"
        >
          <img src={check} alt="check" className="mr-2" /> {feature}
        </div>
      ))}
    </div>
  );
}

export default PricingCard;
