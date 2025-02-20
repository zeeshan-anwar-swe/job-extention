import { DropdownItem } from '../../../../components/ui/Dropdown';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../utils/validationCheck';

const DropDownITemUserMetaPartial = ({
	profileImageUrl,
	title,
}: {
	profileImageUrl?: string;
	title?: string;
}) => {
	return (
		<DropdownItem className='m-4 gap-2 rounded-md bg-zinc-100'>
			<img
				className='aspect-square w-10 rounded-lg'
				src={profileImageUrlValidationCheck(profileImageUrl)}
				alt='profile-image'
			/>
			<h5>{textValidationCheck(title)}</h5>
		</DropdownItem>
	);
};

export default DropDownITemUserMetaPartial;
