
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/ui/Button';
import MessageItem from './_partial/MessageItem.partial';
import { useSocket } from '../../../../../context/socketContext';
import { formatRelativeTime } from '../../../../../utils/formatRelativeTime';
import CircleLoader from '../../../../../components/layouts/PageLoader/CircleLoader';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../../../components/ui/Dropdown';



const MessagesPartial = () => {
	const { inbox, loading, onlineStatusMap } = useSocket();
	const navigate = useNavigate();
	const inboxMessages = Object.values(inbox).sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	const handleClick = (id: string, name: string) => {
		navigate(`/chat/${id}`, {
			state: { userName: name, userId: id },
		});
	};
	return (
		<div className='relative !z-30'>
			<Dropdown className='!z-30'>
				<DropdownToggle hasIcon={false}>
					<Button icon='HeroChatBubbleLeftEllipsis' aria-label='Messages' />
				</DropdownToggle>
				<DropdownMenu
					placement='bottom-end'
					className=' flex flex-col !z-50 flex-wrap divide-y divide-dashed divide-zinc-500/50 p-4 [&>*]:py-4'>
					{loading ? (
						<CircleLoader />
					) : inboxMessages.length > 0 ? (
						inboxMessages.map((item: any) => (
							<div
								className='cursor-pointer'
								key={item.userId}
								onClick={() => handleClick(item.userId, item.name)}>
								<MessageItem
									image={item.image}
									name={item.name}
									isOnline={onlineStatusMap.get(item.userId) ?? false}
									isUnread={item.unreadCount > 0}
									text={item.lastMessage}
									time={formatRelativeTime(item.createdAt).trim()}
								/>
							</div>
						))
					) : (
						<p>No Message</p>
					)}
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
