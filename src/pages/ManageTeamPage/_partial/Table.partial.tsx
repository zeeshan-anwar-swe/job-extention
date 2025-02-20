import Button from '../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../components/ui/Table';
import { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../components/ui/Card';
import SearchPartial from './Search.partial';
import TableDataPartial from './TableDataProfile.partial';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataPositionPartial from './TableDataPosition.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import { Link } from 'react-router-dom';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/ui/Dropdown';
import { useState } from 'react';
import AssignJobModalPartial from './AssignJob.partial';
import TableDataBacklogPartial from './TableDataBacklog.partial';

const TablePartial = () => {
	const [sortBy, setSortBy] = useState<string>('Default');
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<CardHeader>
				<CardHeaderChild className=''>
					<div>
						<CardTitle>Your Team</CardTitle>
						<p>Add, Remove, Assign Jobs to team members.</p>
					</div>
				</CardHeaderChild>
				<CardHeaderChild>
					<Button onClick={() => setModal(true)} variant='solid' rightIcon='HeroPlus'>
						Add a Team Member
					</Button>
					<AssignJobModalPartial setModal={setModal} modal={modal} />
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='overflow-auto'>
				<Table className='table-fixed max-md:min-w-[70rem]'>
					<THead>
						<Tr>
							<Th>NAME</Th>
							<Th>% Jobs Closed</Th>
							<Th>Jobs in Progress</Th>
							<Th>backlog</Th>
							<Th colSpan={2}>Action</Th>
						</Tr>
					</THead>
					<TBody>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial percentage={20} />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td>
								<TableDataBacklogPartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>

						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial percentage={40} />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td>
								<TableDataBacklogPartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial percentage={70} />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td>
								<TableDataBacklogPartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial percentage={90} />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td>
								<TableDataBacklogPartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
						<Tr>
							<Td>
								<TableDataProfilePartial
									title='Alina Jourge'
									subTitle='alina@gmail.com'
								/>
							</Td>

							<Td>
								<TableDataFeedbackPartial percentage={10} />
							</Td>
							<Td>
								<TableDataSourcePartial />
							</Td>
							<Td>
								<TableDataBacklogPartial />
							</Td>
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
					</TBody>
					<TFoot>
						<Tr>
							<Th>NAME</Th>
							<Th>% Jobs Closed</Th>
							<Th>Jobs in Progress</Th>
							<Th>backlog</Th>
							<Th colSpan={2}>Action</Th>
						</Tr>
					</TFoot>
				</Table>
			</CardBody>
		</>
	);
};

export default TablePartial;
