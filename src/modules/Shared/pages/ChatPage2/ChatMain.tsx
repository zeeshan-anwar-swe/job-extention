import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatPage from './Chat.page';
import { useAuth } from '../../../../context/authContext';

const ChatMain = () => {
	const { userStorage } = useAuth();
	const { state } = useLocation();
	const navigateTo = useNavigate();

	useLayoutEffect(() => {
		if (!state) {
			navigateTo(-1);
		} else {
			if (state.userId === userStorage.id) {
				navigateTo(-1);
			}
			console.log(state);
		}
	}, [state]);

	return state && state.userId !== userStorage.id &&  <ChatPage receiverName={state.userName} receiverId={state.userId} />;
};

export default ChatMain;
