import React from 'react';
import Button from '../../../components/ui/Button';

const AssignJobModalListItemPartial = () => {
	return (
		<div className='flex items-center justify-between gap-4 rounded-xl border-2 pr-2 transition-all ease-in-out hover:bg-zinc-200'>
			<div className='flex gap-4'>
				<Button icon='HeroFolder' className='h-fit'></Button>
				<div className=''>
					<div className='flex items-center gap-2'>
						<h5 className='m-0 p-0'>Web Designer </h5>
						<span>|</span>
						<span>3Year Experience </span>
						<span>|</span>
						<span>Miami</span>
					</div>
					<p>June 13, 2024</p>
				</div>
			</div>

			<Button className='h-fit' variant='solid'>
				Assign
			</Button>
		</div>
	);
};

export default AssignJobModalListItemPartial;
