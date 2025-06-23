import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatPage from './Chat.page';

 const ChatMain = () => {
	const { state } = useLocation();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (!state) {
			navigateTo(-1);
		}else{
            console.log(state);
        }
	}, []);

	return state && <ChatPage receiverName={state.userName} receiverId={state.userId} />;
};

export default ChatMain;
