import Table, { TBody, Td, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import TableDataProfilePartial from './TableDataProfile.partial';
import TableDataFeedbackPartial from './TableDataFeedback.partial';
import TableDataActionsPartial from './TableDataActions.partial';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { useState } from 'react';
import Icon from '../../../../../components/icon/Icon';
import { cn } from '../../../../../utils/cn';

const TablePartial = () => {
	const { paginatedList } = useSelector((state: RootState) => state.team);
	const [isDesending, setIsDesending] = useState(false);

	return (
		<Table className='table-fixed max-md:min-w-[70rem]'>
			<THead
				className='group hover:cursor-pointer'
				onClick={() => setIsDesending(!isDesending)}>
				<Tr>
					<Th>
						<div className='flex items-center justify-center gap-2'>
							NAME
							<Icon
								className={cn(
									{ 'rotate-180': isDesending },
									'trans-all opacity-0 group-hover:opacity-100',
								)}
								icon='HeroChevronDown'
							/>
						</div>
					</Th>
					<Th>
						<div className='flex items-center justify-center gap-2'>
							% Jobs Closed
							<Icon
								className={cn(
									{ 'rotate-180': isDesending },
									'trans-all opacity-0 group-hover:opacity-100',
								)}
								icon='HeroChevronDown'
							/>
						</div>
					</Th>
					<Th>
						<div className='flex items-center justify-center gap-2'>
							Jobs in Progress
							<Icon
								className={cn(
									{ 'rotate-180': isDesending },
									'trans-all opacity-0 group-hover:opacity-100',
								)}
								icon='HeroChevronDown'
							/>
						</div>
					</Th>
					<Th>
						<div className='flex items-center justify-center gap-2'>
							Backlog
							<Icon
								className={cn(
									{ 'rotate-180': isDesending },
									'trans-all opacity-0 group-hover:opacity-100',
								)}
								icon='HeroChevronDown'
							/>
						</div>
					</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</THead>
			<TBody>
				{(isDesending ? [...paginatedList].reverse() : paginatedList).map((teamMember: any) => (
					<Tr key={teamMember.id}>
						<Td>
							<TableDataProfilePartial
								id={teamMember.id}
								image={teamMember.user.image}
								title={teamMember.user.name}
								subTitle={teamMember.user.email}
							/>
						</Td>

						<Td>
							<TableDataFeedbackPartial
								percentage={teamMember.jobsClosedPercentage}
							/>
						</Td>
						<Td className='text-center'>{teamMember.jobsInProgress}</Td>
						<Td className='text-center'>{teamMember.jobsInBackLog}</Td>
						<Td colSpan={2}>
							<TableDataActionsPartial teamMember={teamMember} />
						</Td>
					</Tr>
				))}
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
	);
};

export default TablePartial;
