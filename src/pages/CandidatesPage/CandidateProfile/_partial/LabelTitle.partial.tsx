import { textValidationCheck } from "../../../../utils/validationCheck";

const LabelTitlepartial = ({label, detail}:{label?:string, detail?:string}) => {
	return (
		<div className='flex-1'>
			<label className=" font-light">{textValidationCheck(label)}</label>
			<p className='rounded-xl font-normal bg-zinc-100 p-4'>{textValidationCheck(detail)}</p>
		</div>
	);
};

export default LabelTitlepartial;
