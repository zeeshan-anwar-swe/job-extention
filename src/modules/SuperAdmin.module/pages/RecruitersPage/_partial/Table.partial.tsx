import { useSelector } from 'react-redux';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import TableRowPartial from './TableRow.partial';
import { RootState } from '../../../../../store';
import { useState } from 'react';
import Icon from '../../../../../components/icon/Icon';
import { cn } from '../../../../../utils/cn';

const TablePartial = () => {
	const [isDesending, setIsDesending] = useState(false);
	const { rows } = useSelector(
		(state: RootState) => state.recruitersAdmin.reccruitersList,
	);
	return (
		<Table className=' max-md:min-w-[70rem]'>
			<THead
				className='group hover:cursor-pointer'
				onClick={() => setIsDesending(!isDesending)}>
				<Tr>
					<Th>
						<div className='flex items-center justify-center gap-2'>
							RECRUITER NAME
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
							JOINED ON
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
							INDUSTRY
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
							JOB SUCCESS %
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
							LOCATION
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
				{(isDesending ? [...rows].reverse() : rows).map((recruiter) => (
					<TableRowPartial recruiter={recruiter} key={recruiter.id} />
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>RECRUITER NAME</Th>
					<Th>JOINED ON</Th>
					<Th>INDUSTRY</Th>
					<Th>JOB SUCCESS %</Th>
					<Th>LOCATION</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
