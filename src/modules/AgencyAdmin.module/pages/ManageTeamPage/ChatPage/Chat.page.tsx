import Container from '../../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../../../components/ui/Button';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';

import SearchPartial from '../_partial/Search.partial';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import ChatInputPartial from '../_partial/ChatInput.partial';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { textValidationCheck } from '../../../../../utils/validationCheck';
import { io } from 'socket.io-client';
import { useAuth } from '../../../../../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { getChatData } from '../../../../../store/slices/Chat.slice';
import ReusableChatPage from '../../../../Shared/pages/ChatPage/Chat.page';

const ChatPage = () => {

	const navigateTo = useNavigate()

	const { state } = useLocation();



	if (state) {
		
		return (
			<ReusableChatPage receiverName={state.user.name} receiverId={state.user.id} />
		);
	}else{
		navigateTo('/manage-team')
	}
	

};

export default ChatPage;
