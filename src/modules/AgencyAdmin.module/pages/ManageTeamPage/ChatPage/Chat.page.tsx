import { useLocation, useNavigate } from 'react-router-dom';
import ReusableChatPage from '../../../../Shared/pages/ChatPage2/Chat.page';

const ChatPage = () => {
	const navigateTo = useNavigate();
	const { state } = useLocation();
	if (state) {
		return <ReusableChatPage receiverName={state.user.name} receiverId={state.user.id} />;
	} else {
		navigateTo('/manage-team');
	}
};

export default ChatPage;
