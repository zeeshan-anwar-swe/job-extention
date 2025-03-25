import { useSelector } from 'react-redux';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../components/ui/Table';
import TableRowPartial from './TableRow.partial';
import { RootState } from '../../../store';

const TablePartial = () => {
	const { pageLoading, candidatesList, error } = useSelector(
		(state: RootState) => state.candidates,
	);
	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th>NAME</Th>
					<Th>POSITION</Th>
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{candidatesList.map((candidate) => (
					<TableRowPartial candidate={candidate} key={candidate.id} />
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>NAME</Th>
					<Th>POSITION</Th>
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
