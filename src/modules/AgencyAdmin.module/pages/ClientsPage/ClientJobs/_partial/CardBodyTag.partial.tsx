import Button from '../../../../../../components/ui/Button';

const CardBodyTagPartial = ({ title, value }: { title: string; value: string|number }) => {
	return (
		<Button
			borderWidth='border'
			variant='outline'
			color='zinc'
			className='gap-2 max-md:!w-full'>
			<span>{title}</span>
			<h5>{value}</h5>
		</Button>
	);
};

export default CardBodyTagPartial;
