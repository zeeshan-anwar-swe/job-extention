import useImageValidation from '../../hooks/useImageValidation';
import ImageLoaderWraper from '../ui/ImageLoaderWraper';
import Button from '../ui/Button';

import { useLocation, useNavigate } from 'react-router-dom';

interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	text: string;
	seen: boolean;
	createdAt: string; // Or Date if you plan to convert it
	updatedAt: string; // Or Date if you plan to convert it
	media: any[]; // Assuming an array of any for media, or define a specific interface if structure is known
	sender: {
		id: string;
		firstName: string;
		lastName: string;
		image: string;
	};
	receiver: {
		id: string;
		firstName: string;
		lastName: string;
		image: string;
	};
}

export const ToastMessage = ({ t, msg }: { t: any; msg: Message }) => {
	const {pathname} = useLocation()
    const navigateTo = useNavigate();
	const { loading, imageUrl } = useImageValidation(msg?.sender?.image);

    const handleClick = () => {
        // toast.dismiss(t.id)

		if(pathname !== `/dashboard/chat/${msg?.senderId}`){
			navigateTo(`/dashboard/chat/${msg?.senderId}`, {state: {userName: msg.sender.firstName+" "+msg.sender.lastName, userId: msg.senderId}});
		}
		
    }
	return (
		<div
			className={`${
				t.visible ? 'animate-enter' : 'animate-leave'
			} pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}>
			<div className='w-0 flex-1 p-4'>
				<div className='flex items-start'>
					<div className='flex-shrink-0 pt-0.5'>
						<ImageLoaderWraper loading={loading} height='h-10'>
							<img className='h-10 w-10 rounded-full' src={imageUrl} alt='' />
						</ImageLoaderWraper>
					</div>
					<div className='ml-3 flex-1'>
						<p className='text-sm font-medium text-gray-900'>{msg?.sender?.firstName + ' ' + msg?.sender?.lastName}</p>
						<p className='mt-1 text-sm text-gray-500'>{msg?.text.length > 15 ? msg?.text.slice(0, 15) + '...' : msg.text}</p>
					</div>
				</div>
			</div>
            
			<div className='flex border-l items-center border-gray-200 px-4'>
                <Button onClick={handleClick} icon='HeroChatBubbleLeft'/>
			</div>
		</div>
	);
};
