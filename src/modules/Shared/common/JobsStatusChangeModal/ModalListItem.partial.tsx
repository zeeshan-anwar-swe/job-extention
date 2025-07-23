
import { AppDispatch } from '../../../../store';
import { useDispatch } from 'react-redux';
import Card, {
	CardHeader,
} from '../../../../components/ui/Card';


export const JobsStatusChangeModalListItem = () => {
	const dispatch: AppDispatch = useDispatch();

	return (
		<Card className='border'>
			<CardHeader>
				<h1>job</h1>
			</CardHeader>
		</Card>
	);
};
