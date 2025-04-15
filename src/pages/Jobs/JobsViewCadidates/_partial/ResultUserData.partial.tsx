import TableDataFeedbackPartial from './TableDataFeedback.partial';
import { profileImageUrlValidationCheck } from '../../../../utils/validationCheck';
import { CardFooterChild } from '../../../../components/ui/Card';

const ResultUserDataPartial = ({ candidate }: any) => {
	return (
		<CardFooterChild className='flex-1 !flex-col !items-start rounded-xl bg-zinc-100 p-2'>
			<div className='flex items-center gap-4 '>
				<img
					className='aspect-square w-10 object-cover'
					src={profileImageUrlValidationCheck('')}
					alt=''
				/>
				<div>
					<h4>
						{candidate.candidate.name}{' '}
						<span className='text-base'>1:22PM Yesterday</span>
					</h4>

					<p className='m-0'>on Jenny Wilson | Web Developer</p>
				</div>
			</div>
			<div className='flex flex-col items-start gap-2'>
				<TableDataFeedbackPartial className='!m-0' title='Hired' />
				<p>Excellent problem-solving abilities, very impressed!</p>
			</div>
		</CardFooterChild>
	);
};

export default ResultUserDataPartial;
