import Button from '../../../components/ui/Button';
import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../components/ui/Table';
import { CardBody, CardHeader, CardHeaderChild, CardTitle } from '../../../components/ui/Card';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import TableDataSourcePartial from './TableDataSource.partial';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/ui/Dropdown';
import { useState } from 'react';
import InviteModalPartial from './InviteModal.partial';

const TablePartial = () => {
	const [sortBy, setSortBy] = useState<string>('Default');
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<CardHeader>
				<CardHeaderChild className=''>
					<div>
						<CardTitle>Clients</CardTitle>
						<p>View and manage your client relationships.</p>
						<div className='relative flex items-center'>
							<h6>Sort By</h6>
							<Dropdown>
								<DropdownToggle hasIcon={true}>
									<Button>{sortBy}</Button>
								</DropdownToggle>
								<DropdownMenu placement='bottom-end'>
									<div className='px-4 text-sm font-bold'>Select An Order</div>
									<DropdownItem onClick={() => setSortBy('Assending')}>
										Assending
									</DropdownItem>
									<DropdownItem onClick={() => setSortBy('Desending')}>
										Desending
									</DropdownItem>
									<DropdownItem onClick={() => setSortBy('New First')}>
										New First
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>
				</CardHeaderChild>
				<CardHeaderChild>
					<Button
						onClick={() => setModal(true)}
						variant='solid'
						rightIcon='HeroPaperAirplane'>
						Invite a Client
					</Button>
					<InviteModalPartial setModal={setModal} modal={modal} />
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='overflow-auto'>
				<Table className='table-fixed max-md:min-w-[70rem]'>
					<THead>
						<Tr>
							<Th>NAME</Th>
							<Th>Hiring Rate</Th>
							<Th>Active Jobs</Th>
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
							<Td colSpan={2}>
								<TableDataActionsPartial />
							</Td>
						</Tr>
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
			</CardBody>
		</>
	);
};

export default TablePartial;
