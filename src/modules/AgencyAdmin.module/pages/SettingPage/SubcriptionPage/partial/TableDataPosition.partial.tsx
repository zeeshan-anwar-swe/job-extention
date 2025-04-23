import { textValidationCheck } from '../../../../../../utils/validationCheck';

const TableDataPositionPartial = ({ title }: { title?: string }) => {
	return (
		<div>
			<p className=' text-md text-center'>{textValidationCheck(title)}</p>
		</div>
	);
};

export default TableDataPositionPartial;
