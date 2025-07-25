import TableRowPartial from './TableRow.partial';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';
import { ClientListItemType } from '../../../../../types/slices.type/clients.slice.type';

const TablePartial = ({sortBy}:{sortBy:string}) => {
    const { paginatedClients } = useSelector((state: RootState) => state.clients);

    // Create a copy and conditionally reverse it
    const clientsToRender = sortBy === 'Desending'
        ? [...paginatedClients].reverse()
        : paginatedClients;

    return (
        <Table className='table-fixed'>
            <THead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>Hiring Rate</Th>
                    <Th>Active Jobs</Th>
                    <Th colSpan={2}>Action</Th>
                </Tr>
            </THead>
            <TBody>
                {/* Map over the potentially reversed list */}
                {clientsToRender.map((client: ClientListItemType) => (
                    <TableRowPartial client={client} key={client.id} />
                ))}
            </TBody>
            <TFoot>
                <Tr>
                    <Th>NAME</Th>
                    <Th>Hiring Rate</Th>
                    <Th>Active Jobs</Th>
                    <Th colSpan={2}>Action</Th>
                </Tr>
            </TFoot>
        </Table>
    );
};

export default TablePartial;