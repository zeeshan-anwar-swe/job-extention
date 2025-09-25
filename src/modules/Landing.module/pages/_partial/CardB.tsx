function CardB({ image, icon, title, description }:any) {
  return (
    <div className="flex-1 rounded-3xl border-2 border-white bg-white/50">
      <img src={image} alt="crm" className="w-full p-6" />
      <div className="flex flex-col gap-2 p-6">
        <div className="flex">
          <img src={icon} alt="icon" className="mr-2" />
          <h1 className="text-xl font-medium dark:text-[#010314] ">{title}</h1>
        </div>

        <p className="text-justify text-base font-normal text-[#7E808A]">
          {description}
        </p>
      </div>
    </div>
  );
}
export default CardB;
