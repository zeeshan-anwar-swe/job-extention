import Button from '../../ui/Button';

const CircleLoader = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<Button
				iconSize='text-5xl'
				rounded='rounded-full'
				color='zinc'
				isLoading={true}
				size='xl'></Button>
		</div>
	);
};

export default CircleLoader;
