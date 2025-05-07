import { useState } from 'react';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import Button from '../../../../../components/ui/Button';
import { CardFooterChild } from '../../../../../components/ui/Card';
import { useAuth } from '../../../../../context/authContext'; // Import useAuth
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '../../../../../store'; // Import RootState
import { io } from 'socket.io-client'; // Import io if not already in the parent
import { text } from 'd3-fetch';

const ChatInputPartial = ({ setChat }: any) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { userTokenStorage: token } = useAuth(); // Get the token
    const { data: receiverProfile } = useSelector( // Get the receiver's profile
        (state: RootState) => state.teamChat.recruiterProfile,
    );
    const { userStorage: senderProfile } = useAuth(); // Get the sender's profile
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Get the API base URL

    // Initialize socket here to ensure it's available in this component
    const socket = io(apiBaseUrl, {
        auth: {
            token: token || '',
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            const messagePayload = {
                senderId: senderProfile?.id,
                receiverId: receiverProfile?.id,
                text: searchValue,
				mediaType:"none",
				mediaUrl:null

            };
            socket.emit('send_message', messagePayload); // Emit the message to the server
            setChat((pre: any[]) => [...pre, searchValue]); // Optionally update local chat for immediate display
            setSearchValue('');
        }
    };

    return (
        <>
            <CardFooterChild className='flex-1'>
                <form onSubmit={handleSubmit} className="w-full">
                    <FieldWrap
                        className='w-full'
                        lastSuffix={
                            searchValue !== '' && (
                                <Icon
                                    className='hover:cursor-pointer'
                                    icon='HeroXMark'
                                    size='text-xl'
                                    color='red'
                                    onClick={() => {
                                        setSearchValue('');
                                    }}
                                />
                            )
                        }>
                        <Input
                            id='chatInput'
                            rounded='rounded-full'
                            name='chatInput'
                            placeholder='Enter your message...'
                            value={searchValue}
                            borderWidth='border-0'
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </FieldWrap>
                </form>
            </CardFooterChild>
            <CardFooterChild>
                <Button icon='HeroPaperClip'></Button>
                <Button icon='HeroMicrophone'></Button>
                <Button
                    type="submit" // Change to submit button to trigger form submission
                    variant='solid'
                    rounded='rounded-full'
                    rightIcon='HeroPaperAirplane'></Button>
            </CardFooterChild>
        </>
    );
};

export default ChatInputPartial;