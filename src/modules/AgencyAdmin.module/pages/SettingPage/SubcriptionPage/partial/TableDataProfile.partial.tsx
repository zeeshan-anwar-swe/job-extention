import { useEffect, useState } from 'react';
import Checkbox from '../../../../../../components/form/Checkbox';
import Alert from '../../../../../../components/ui/Alert';
import { textValidationCheck } from '../../../../../../utils/validationCheck';

const TableDataProfilePartial = ({
	title,
	allChecked,
}: {
	title?: string;
	allChecked?: boolean;
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	useEffect(() => {
		if (allChecked === undefined) return;
		setIsChecked(allChecked);
	}, [allChecked]);

	return (
		<div className='flex items-center justify-center'>
			<Checkbox
				className='!m-0 !p-0'
				id='Inovice'
				checked={isChecked}
				onChange={() => setIsChecked((pre) => !pre)}
			/>
			<Alert className='dark:!text-white' icon='HeroDocument'>
				{textValidationCheck(title)}
			</Alert>
		</div>
	);
};

export default TableDataProfilePartial;
