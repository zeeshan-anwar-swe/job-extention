import { textValidationCheck } from '../../../utils/validationCheck';

const TableDataPositionPartial = ({ title, subTitle }: { title?: string; subTitle?: string }) => {
	return (
		<div>
			<h5>{textValidationCheck(title)}</h5>
			<p>{`Client: ${textValidationCheck(subTitle)}`}</p>
		</div>
	);
};

export default TableDataPositionPartial;
