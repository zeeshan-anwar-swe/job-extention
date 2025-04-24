import React, { FC, ReactNode } from 'react';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import Avatar from '../../../../components/Avatar';

import Icon from '../../../../components/icon/Icon';
import { TIcons } from '../../../../types/icons.type';

interface INotificationItemProps {
	image?: string;
	name: string;
	icon?: TIcons;
	firstLine: ReactNode;
	secondLine: ReactNode;
	isUnread: boolean;
	time: string;
}
const NotificationItem: FC<INotificationItemProps> = ({
	image,
	name,
	icon,
	firstLine,
	secondLine,
	isUnread,
	time,
}) => {
	return (
		<div className='flex min-w-[24rem] gap-2'>
			<div className='relative flex-shrink-0'>
				<Avatar src={image} name={name} />
				{icon && (
					<span className='absolute start-3/4 top-3/4 flex rounded-full bg-blue-500/75 outline outline-2 outline-blue-500/75'>
						<Icon icon={icon} />
					</span>
				)}
			</div>
			<div className='grow'>
				<div className='flex gap-2'>{firstLine}</div>
				<div className='flex gap-2'>{secondLine}</div>
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
NotificationItem.defaultProps = {
	image: undefined,
	icon: undefined,
};

const NotificationPartial = () => {
	return (
		<div className='relative'>
			<Dropdown>
				<DropdownToggle hasIcon={false}>
					<Button icon='HeroBell' aria-label='Notification' />
				</DropdownToggle>
				<DropdownMenu
					placement='bottom-end'
					className='flex flex-col flex-wrap divide-y divide-dashed divide-zinc-500/50 p-4 [&>*]:py-4'>
					<NotificationItem
						image={''}
						name={`${'amir'} ${'khan'}`}
						icon='HeroBolt'
						firstLine={
							<>
								<b>{'ubaid'}</b>
								<span className='text-zinc-500'>@{'ubdus'}</span>
							</>
						}
						secondLine={
							<>
								Comment on <b>{'ubdus2'}</b>
							</>
						}
						isUnread
						time='1h'
					/>

					<NotificationItem
						image={''}
						name={`${'amir'} ${'khan'}`}
						icon='HeroBolt'
						firstLine={
							<>
								<b>{'ubaid'}</b>
								<span className='text-zinc-500'>@{'ubdus'}</span>
							</>
						}
						secondLine={
							<>
								Comment on <b>{'ubdus2'}</b>
							</>
						}
						isUnread
						time='1h'
					/>

					<NotificationItem
						image={''}
						name={`${'amir'} ${'khan'}`}
						icon='HeroBolt'
						firstLine={
							<>
								<b>{'ubaid'}</b>
								<span className='text-zinc-500'>@{'ubdus'}</span>
							</>
						}
						secondLine={
							<>
								Comment on <b>{'ubdus2'}</b>
							</>
						}
						isUnread
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

export default NotificationPartial;
