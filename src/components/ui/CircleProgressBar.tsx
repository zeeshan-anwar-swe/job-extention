import { FC } from 'react';

interface Props {
	strokeWidth?: number;
	sqSize?: number;
	percentage: number;
	color?: string; // This prop isn't currently used
}

const CircularProgressBar: FC<Props> = (props) => {
	const { strokeWidth = 8, sqSize = 160, percentage } = props; // Removed unused 'color'
	const radius = (sqSize - strokeWidth) / 2;
	const viewBox = `0 0 ${sqSize} ${sqSize}`;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;
	const statusMessage = `${percentage}%`;

	let strokeColorClass; // More descriptive variable name

	if (percentage < 25) {
		strokeColorClass = 'stroke-red-500';
	} else if (percentage < 50) {
		// Simplified condition (percentage >= 25 is implied)
		strokeColorClass = 'stroke-amber-500';
	} else if (percentage < 75) {
		// Simplified condition
		strokeColorClass = 'stroke-blue-500';
	} else {
		// percentage >= 75 (no need for explicit check)
		strokeColorClass = 'stroke-green-500';
	}

	return (
		<svg width={sqSize} height={sqSize} viewBox={viewBox}>
			<circle
				className='fill-none stroke-gray-200'
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={strokeWidth} // Simplified
			/>
			<circle
				className={`fill-none ${strokeColorClass} transition-all delay-200 ease-in`}
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeLinecap='round'
				strokeWidth={strokeWidth} // Simplified
				transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
				style={{
					strokeDasharray: dashArray,
					strokeDashoffset: dashOffset,
				}}
			/>
			<text
				x='50%'
				y='50%'
				dy='.3em'
				textAnchor='middle'
				fill='#172554'
				className='font-semibold'>
				{statusMessage}
			</text>
		</svg>
	);
};

export default CircularProgressBar;
