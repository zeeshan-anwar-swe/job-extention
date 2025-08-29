import { useSelector } from 'react-redux';
import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../components/ui/Table';
import TableRowPartial from './TableRow.partial';
import { RootState } from '../../../../../store';
import Icon from '../../../../../components/icon/Icon';
import Button from '../../../../../components/ui/Button';
import { useState } from 'react';
import { cn } from '../../../../../utils/cn';

const TablePartial = () => {
	const [isDesending, setIsDesending] = useState(false);
	const { rows } = useSelector((state: RootState) => state.customCV.list);
	return (
		<Table>
			<THead
				className='group hover:cursor-pointer'
				onClick={() => setIsDesending(!isDesending)}>
				<Tr>
					<Th>
						<div className='flex items-center justify-center gap-2'>
							Profile
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
							Industry
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
							Location
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
							Experience
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
				{(isDesending ? [...rows].reverse() : rows).map((candidate) => (
					<TableRowPartial candidate={candidate} key={candidate.id} />
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>Profile</Th>
					<Th>Industry</Th>
					<Th>Location</Th>
					<Th>Experience</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
