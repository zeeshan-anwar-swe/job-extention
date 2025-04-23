import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataDatePartial from './TableDataPosition.partial';
import TableDataStatusPartial from './TableDataFeedback.partial';
import TableDataAmountPartial from './TableDataAmount.partial';
import TableDataCreditPartial from './TableDataSource.partial';
import Alert from '../../../../../../components/ui/Alert';
import Checkbox from '../../../../../../components/form/Checkbox';
import { useState } from 'react';

const TablePartial = () => {
	const [allChecked, setAllChecked] = useState<boolean>(false);
	return (
		<Table className='table-fixed !rounded-xl max-md:min-w-[70rem]'>
			<THead>
				<Tr>
					<Th className='!flex items-center gap-6'>
						<Checkbox
							onChange={() => setAllChecked((pre) => !pre)}
							checked={allChecked}
							id='Inovice'
						/>
						Invoice
					</Th>
					<Th>
						<Alert
							className='!m-0 !py-0 dark:!text-white'
							iconSize='text-xl'
							rightIcon='HeroArrowDown'>
							Billing Date
						</Alert>
					</Th>
					<Th>Credit Added</Th>
					<Th>Status</Th>
					<Th>Amount</Th>
				</Tr>
			</THead>
			<TBody>
				<Tr>
					<Td>
						<TableDataProfilePartial allChecked={allChecked} title='#007 – Dec 2022' />
					</Td>
					<Td>
						<TableDataDatePartial title='Dec 1, 2022' />
					</Td>

					<Td>
						<TableDataCreditPartial />
					</Td>
					<Td>
						<TableDataStatusPartial title='Paid' />
					</Td>
					<Td>
						<TableDataAmountPartial />
					</Td>
				</Tr>

				<Tr>
					<Td>
						<TableDataProfilePartial allChecked={allChecked} title='#007 – Dec 2022' />
					</Td>
					<Td>
						<TableDataDatePartial title='Dec 1, 2022' />
					</Td>

					<Td>
						<TableDataCreditPartial />
					</Td>
					<Td>
						<TableDataStatusPartial title='Paid' />
					</Td>
					<Td>
						<TableDataAmountPartial />
					</Td>
				</Tr>
				<Tr>
					<Td>
						<TableDataProfilePartial allChecked={allChecked} title='#007 – Dec 2022' />
					</Td>
					<Td>
						<TableDataDatePartial title='Dec 1, 2022' />
					</Td>

					<Td>
						<TableDataCreditPartial />
					</Td>
					<Td>
						<TableDataStatusPartial title='Un paid' />
					</Td>
					<Td>
						<TableDataAmountPartial />
					</Td>
				</Tr>
				<Tr>
					<Td>
						<TableDataProfilePartial allChecked={allChecked} title='#005 – Dec 2022' />
					</Td>
					<Td>
						<TableDataDatePartial title='Dec 1, 2022' />
					</Td>

					<Td>
						<TableDataCreditPartial />
					</Td>
					<Td>
						<TableDataStatusPartial title='Paid' />
					</Td>
					<Td>
						<TableDataAmountPartial />
					</Td>
				</Tr>
				<Tr>
					<Td>
						<TableDataProfilePartial allChecked={allChecked} title='#003 – Dec 2022' />
					</Td>
					<Td>
						<TableDataDatePartial title='Dec 1, 2022' />
					</Td>

					<Td>
						<TableDataCreditPartial />
					</Td>
					<Td>
						<TableDataStatusPartial title='Paid' />
					</Td>
					<Td>
						<TableDataAmountPartial />
					</Td>
				</Tr>
			</TBody>
			<TFoot>
				<Tr>
					<Th className='!flex items-center gap-6'>
						<Checkbox
							onChange={() => setAllChecked((pre) => !pre)}
							checked={allChecked}
							id='Inovice'
						/>
						Invoice
					</Th>
					<Th>
						<Alert
							className='!m-0 !py-0 dark:!text-white'
							iconSize='text-xl'
							rightIcon='HeroArrowDown'>
							Billing Date
						</Alert>
					</Th>
					<Th>Credit Added</Th>
					<Th>Status</Th>
					<Th>Amount</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
