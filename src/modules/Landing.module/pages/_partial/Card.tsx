function Card({ image, title, description }:any) {
  return (
    <div className="flex-1 rounded-2xl border border-white bg-white/50">
      <img src={image} alt="crm" className="w-full" />
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-xl font-medium dark:text-[#010314] ">{title}</h1>

        <p className="text-justify text-base font-normal text-[#7E808A]">
          {description}
        </p>
      </div>
    </div>
  );
}
export default Card;
