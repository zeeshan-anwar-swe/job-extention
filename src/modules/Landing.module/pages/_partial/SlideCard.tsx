import React from "react";

const SlideCard = ({
  quote,
  author,
  position,
  imageSrc,
  imageAlt = "Testimonial author",
}:any) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-14">
      <div className="md:w-1/2">
        <div className="py-2 md:py-4 lg:py-20 px-2 md:px-6 lg:px-16">
          <span className="font-inter font-normal text-sm md:text-base lg:text-lg xl:text-2xl  text-[#010314] text-center">
            {quote}
          </span>
          <span className="font-inter font-semibold text-xl leading-7 text-[#010314] block mt-4">
            {author}
          </span>
          <span className="font-inter font-normal text-base leading-6 text-[#010314]/50 block">
            {position}
          </span>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={imageSrc} alt={imageAlt} className="max-w-full" />
      </div>
    </div>
  );
};

export default SlideCard;
