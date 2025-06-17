import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataDatePartial from './TableDataPosition.partial';
import TableDataStatusPartial from './TableDataFeedback.partial';
import TableDataAmountPartial from './TableDataAmount.partial';
import TableDataCreditPartial from './TableDataSource.partial';
import Alert from '../../../../../../components/ui/Alert';
import Checkbox from '../../../../../../components/form/Checkbox';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import { TSInvoice } from '../../../../../../types/slices.type/subcription.slice.type';
import { formatString, formatTimestampToDate } from '../../../../../../utils/helper';

const TablePartial = () => {
	const [allChecked, setAllChecked] = useState<boolean>(false);
	const { data } = useSelector((state: RootState) => state.subscription.userSubscription);
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
					<Th>Plan</Th>
					<Th>Status</Th>
					<Th>Amount</Th>
				</Tr>
			</THead>
			<TBody>
				{data.invoices.map((invoice: TSInvoice) => (
					<Tr key={invoice.id}>
						<Td>
							<TableDataProfilePartial
								allChecked={allChecked}
								title={invoice.invoiceNumber}
							/>
						</Td>
						<Td>
							<TableDataDatePartial
								title={formatTimestampToDate(invoice.createdAt)}
							/>
						</Td>

						<Td className='text-center'>{formatString(invoice.lookup_key)}</Td>
						<Td>
							<TableDataStatusPartial title={invoice.status} />
						</Td>
						<Td className='text-center'>{invoice.amount}</Td>
					</Tr>
				))}
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
					<Th>Plan</Th>
					<Th>Status</Th>
					<Th>Amount</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
