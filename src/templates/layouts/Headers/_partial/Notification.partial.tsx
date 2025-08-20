import React, { FC, ReactNode, useEffect, useState } from 'react';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../components/ui/Dropdown';
import Button from '../../../../components/ui/Button';
import Avatar from '../../../../components/Avatar';
import Icon from '../../../../components/icon/Icon';
import { TIcons } from '../../../../types/icons.type';
import { useSocket } from '../../../../context/socketContext';
import CircleLoader from '../../../../components/layouts/PageLoader/CircleLoader';
import { formatRelativeTime } from '../../../../utils/formatRelativeTime';
import NotificationItem from './NotificationItem.partial';




const NotificationPartial = () => {
	const { socket, notifications, loading, setNotifications } = useSocket();
	const [marking, setMarking] = useState(false);

	const unreadNotificationIds = notifications.filter((n) => !n.isRead).map((n) => n.id);

	const hasUnread = unreadNotificationIds.length > 0;
	useEffect(() => {
		if (!socket) return;

		const handler = ({ notificationIds }: { notificationIds: string[] }) => {
			setNotifications((prev) =>
				prev.map((n) => (notificationIds.includes(n.id) ? { ...n, isRead: true } : n)),
			);
			setMarking(false);
		};

		socket.on('notifications_seen_ack', handler);

		return () => {
			socket.off('notifications_seen_ack', handler);
		};
	}, [socket, setNotifications]);

	const handleMarkAllAsRead = () => {
		if (!socket || !hasUnread) return;
		setMarking(true);
		socket.emit('notifications_seen', { notificationIds: unreadNotificationIds });
	};

	const handleMarkOneAsRead = (id: string) => {
		socket?.emit('notifications_seen', { notificationIds: [id] });
	};


	
	
	

	return (
		<div className='relative'>
			<Dropdown>
				<DropdownToggle hasIcon={false}>
					<Button icon='HeroBell' aria-label='Notification' />
				</DropdownToggle>
				<DropdownMenu
					placement='bottom-end'
					className='flex flex-col flex-wrap divide-y divide-dashed divide-zinc-500/50 p-4 [&>*]:py-4'>
					{loading ? (
						<CircleLoader />
					) : (
						<>
							{hasUnread && (
								<Button
									size='sm'
									variant='solid'
									className='mb-2 ml-auto text-blue-500'
									onClick={handleMarkAllAsRead}
									isDisable={marking}>
									Mark all as read
								</Button>
							)}
							{notifications.map((item: any) => (
								<NotificationItem
									type={item.type}
									key={item.id}
									image={item.user.image}
									name={`${item.user.firstName} ${item.user.lastName}`}
									icon='HeroBolt'
									firstLine={
										<b>{`${item.user.firstName} ${item.user.lastName}`}</b>
									}
									secondLine={<>{item.notification}</>}
									isUnread={!item.isRead}
									time={formatRelativeTime(item.createdAt)}
									onMarkAsRead={
										!item.isRead
											? () => handleMarkOneAsRead(item.id)
											: undefined
									}
								/>
							))}
						</>
					)}
				</DropdownMenu>
			</Dropdown>
			{hasUnread && (
				<span className='absolute end-0 top-0 flex h-3 w-3'>
					<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75' />
					<span className='relative inline-flex h-3 w-3 rounded-full bg-red-500' />
				</span>
			)}
		</div>
	);
};

export default NotificationPartial;
