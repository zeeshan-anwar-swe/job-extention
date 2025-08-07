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
	const { candidatesList } = useSelector((state: RootState) => state.candidates);
	return (
		<Table>
			<THead className='group hover:cursor-pointer' onClick={() => setIsDesending(!isDesending)}>
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
							Position
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
							Client
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
							Feedback
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
							Source
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
				{(isDesending ? [...candidatesList].reverse() : candidatesList).map((candidate) => (
					<TableRowPartial candidate={candidate} key={candidate.id} />
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>NAME</Th>
					<Th>POSITION</Th>
					<Th>CLIENT</Th>
					<Th>Feedback</Th>
					<Th>Source</Th>
					<Th colSpan={2}>Action</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};

export default TablePartial;
