import { Link } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';

const HeaderPartial = () => {
	return (
		<Link to='/jobs/create-job'>
			<Button variant='solid' rightIcon='HeroPlus'>
				Create a new job
			</Button>
		</Link>
	);
};

export default HeaderPartial;
