import React from 'react';
import {
	profileImageUrlValidationCheck,
	textValidationCheck,
} from '../../../../../utils/validationCheck';
import Button from '../../../../../components/ui/Button';

interface commentItemProps {
	name: string;
	isSubscribed?: boolean;
	time?: string;
}
const CommentItemPartial: React.FC<commentItemProps> = ({ name, isSubscribed }) => {
	const message = `${textValidationCheck(name)} just ${
		isSubscribed ? '<b>subscribed</b>' : '<b>unsubscribed</b>'
	} to KoalaByte.`;
	return (
		<div className='relative flex items-center gap-4 rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800'>
			<div className='relative'>
				<img
					className='h-16 w-16 rounded-full max-sm:h-12 max-sm:w-12'
					src={profileImageUrlValidationCheck('')}
					alt='profile'
				/>
				<Button
					className='absolute -right-2 top-0 '
					size='xs'
					variant='solid'
					rounded='rounded-full'
					color={isSubscribed ? 'emerald' : 'red'}
					icon={isSubscribed ? 'HeroCheck' : 'HeroXMark'}
				/>
			</div>
			<p className='absolute right-2 top-1 text-zinc-500 dark:text-zinc-100'>25m ago</p>
			<label
				className='text-lg text-zinc-600 dark:text-zinc-100'
				dangerouslySetInnerHTML={{ __html: message }}
			/>
		</div>
	);
};

export default CommentItemPartial;
