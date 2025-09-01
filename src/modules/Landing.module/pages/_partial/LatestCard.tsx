import arrow from "../../../../../../public/assets/arrow.png";
import { useNavigate } from "react-router-dom";

function LatestCard({
  image,
  headingA,
  headingB,
  title,
  description,
  navigatePath,
}:any) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    if (navigatePath) {
      navigate(navigatePath);
    }
  };

  return (
    <div className="flex-1 rounded-2xl border-2 border-white bg-white/50 cursor-pointer">
      <img src={image} alt="crm" className="w-full p-2" />
      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-center w-fit rounded-full bg-neutral-300 border-b-black px-1 py-1 lg:px-1.5 lg:py-1.5">
          <div className="rounded-full px-2 lg:px-3 mr-1 lg:mr-2 bg-[#010314] text-white font-medium text-xs text-center">
            {headingA}
          </div>
          <span className="text-[#010314]/50 font-medium text-xs">
            {headingB}
          </span>
        </div>
        <div
          className="flex items-center "
          onClick={handleTitleClick}
        >
          <h1 className="text-xl font-medium">{title}</h1>
          <img src={arrow} alt="arrow" className="ml-2" />
        </div>
        <p className="text-justify text-base font-normal text-[#7E808A]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default LatestCard;
