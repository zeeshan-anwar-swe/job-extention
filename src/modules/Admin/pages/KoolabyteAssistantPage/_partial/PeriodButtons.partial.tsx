import { Dispatch, FC, SetStateAction } from 'react';
import { IButtonProps } from '../../../../../components/ui/Button';
import { TPeriod } from '../../../../../constants/periods.constant';
import Alert from '../../../../../components/ui/Alert';

interface IPeriodButtonsPartialProps {
	activeTab: TPeriod;
	setActiveTab: Dispatch<SetStateAction<TPeriod>>;
}
const PeriodButtonsPartial: FC<IPeriodButtonsPartialProps> = (props) => {
	const { activeTab, setActiveTab } = props;

	const defaultProps: IButtonProps = {
		size: 'sm',
		color: 'zinc',
		rounded: 'rounded-full',
	};
	const activeProps: IButtonProps = {
		...defaultProps,
		isActive: true,
		color: 'blue',
		colorIntensity: '500',
		variant: 'solid',
	};

	return (
		<div className='flex items-center rounded-full border-2 border-zinc-500/20 p-1 px-8 drop-shadow-xl dark:border-zinc-800'>
			<Alert
				className='!p-2'
				iconSize='text-xl'
				variant='solid'
				color='zinc'
				rounded='rounded-full'
				icon='HeroMicrophone'
				colorIntensity='800'
			/>
			<svg xmlns='http://www.w3.org/2000/svg' height='40' fill='currentColor'>
				<rect x='5' y='15' width='5' height='10' rx='2' />
				<rect x='20' y='10' width='5' height='20' rx='2' />
				<rect x='35' y='5' width='5' height='30' rx='2' />
				<rect x='50' y='10' width='5' height='20' rx='2' />
				<rect x='65' y='15' width='5' height='10' rx='2' />
				<rect x='80' y='10' width='5' height='20' rx='2' />
				<rect x='95' y='5' width='5' height='30' rx='2' />

				<rect x='115' y='15' width='5' height='10' rx='2' />
				<rect x='130' y='10' width='5' height='20' rx='2' />
				<rect x='145' y='5' width='5' height='30' rx='2' />
				<rect x='160' y='10' width='5' height='20' rx='2' />
				<rect x='175' y='15' width='5' height='10' rx='2' />
				<rect x='190' y='10' width='5' height='20' rx='2' />
				<rect x='205' y='5' width='5' height='30' rx='2' />

				<rect x='225' y='15' width='5' height='10' rx='2' />
				<rect x='240' y='10' width='5' height='20' rx='2' />
				<rect x='255' y='5' width='5' height='30' rx='2' />
				<rect x='270' y='10' width='5' height='20' rx='2' />
				<rect x='285' y='15' width='5' height='10' rx='2' />
				<rect x='300' y='10' width='5' height='20' rx='2' />
				<rect x='315' y='5' width='5' height='30' rx='2' />
			</svg>
			<img className='h-14' src='/images/koola-bear.png' alt='koola-bear' />
		</div>
	);
};

export default PeriodButtonsPartial;
