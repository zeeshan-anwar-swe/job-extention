import { Link } from 'react-router-dom';
import Alert from '../../../../../../components/ui/Alert';

const TableDataSourcePartial = ({ linkedInUrl }: { linkedInUrl?: string }) => {
	return (
		<div className='mx-auto flex w-fit'>
			{linkedInUrl && (
				<Link to={linkedInUrl} target='_blank'>
					<Alert icon='HeroLinkedIn' />
				</Link>
			)}
		</div>
	);
};

export default TableDataSourcePartial;
