import React, { SVGProps } from 'react';

const SvgDoubleCheck = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='svg-icon'
		{...props}>
		<path
			d='M22 7L11.5 17.5L7.5 13.5M6 17.5L2 13.5M16.5 7L11.5 12'
			stroke='#3B82F6'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default SvgDoubleCheck;
