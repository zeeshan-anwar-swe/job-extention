import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import Avatar from '../../../../components/Avatar';

interface IMessageItemProps {
	image?: string;
	name: string;
	isOnline: boolean;
	text: ReactNode;
	isUnread: boolean;
	time: string;
}
const MessageItem: FC<IMessageItemProps> = ({ image, name, isOnline, text, isUnread, time }) => {
	return (
		<div className='flex min-w-[24rem] gap-2'>
			<div className='relative flex-shrink-0'>
				<Avatar src={image} name={name} />
				<span className='absolute bottom-0 end-0 flex h-3 w-3 rounded-full outline outline-white dark:outline-zinc-900'>
					<span
						className={classNames('relative inline-flex h-3 w-3 rounded-full', {
							'bg-red-500': !isOnline,
							'bg-emerald-500': isOnline,
						})}
					/>
				</span>
			</div>
			<div className='grow-0'>
				<div className='flex gap-2 font-bold'>{name}</div>
				<div className='flex w-[18rem] gap-2 text-zinc-500'>
					<span className='truncate'>{text}</span>
				</div>
			</div>
			<div className='relative flex flex-shrink-0 items-center'>
				{isUnread && (
					<span className='absolute end-0 top-0 flex h-2 w-2'>
						<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75' />
						<span className='relative inline-flex h-2 w-2 rounded-full bg-red-500' />
					</span>
				)}
				<div className='text-zinc-500'>{time}</div>
			</div>
		</div>
	);
};
MessageItem.defaultProps = {
	image: undefined,
};

const MessagesPartial = () => {
	return (
		<div className='relative'>
			<Dropdown>
				<DropdownToggle hasIcon={false}>
					<Button icon='HeroChatBubbleLeftEllipsis' aria-label='Messages' />
				</DropdownToggle>
				<DropdownMenu
					placement='bottom-end'
					className='flex flex-col flex-wrap divide-y divide-dashed divide-zinc-500/50 p-4 [&>*]:py-4'>
					<MessageItem
						image={''}
						name={`${'Nahoon'} ${'Banak'}`}
						isOnline
						isUnread
						text='You can find the offer file attached. You can find the offer file attached.'
						time='1h'
					/>
					<MessageItem
						image={''}
						name={`${'Nahoon'} ${'Banak'}`}
						isOnline
						isUnread
						text='You can find the offer file attached. You can find the offer file attached.'
						time='1h'
					/>
				</DropdownMenu>
			</Dropdown>
			<span className='absolute end-0 top-0 flex h-3 w-3'>
				<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75' />
				<span className='relative inline-flex h-3 w-3 rounded-full bg-red-500' />
			</span>
		</div>
	);
};

export default MessagesPartial;
