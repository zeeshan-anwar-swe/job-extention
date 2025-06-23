import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../../components/ui/Button';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../components/ui/Card';

import SearchPartial from './_partial/Search.partial';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import ChatInputPartial from './_partial/ChatInput.partial';
import { useEffect, useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import { io } from 'socket.io-client';
import { useAuth } from '../../../../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getRecruiter } from '../../../../store/slices/Team/TeamChat.slice';
import PartialLoader from '../../../../templates/layouts/main/PartialLoader';
import { getChatData } from '../../../../store/slices/Chat.slice';
import ReusableChatPage from '../../../Shared/pages/ChatPage2/Chat.page';
import { useNavigate } from 'react-router-dom';

const ChatWithRecruiterPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigateTo = useNavigate();

	const { loading, data, error } = useSelector(
		(state: RootState) => state.teamChat.recruiterProfile,
	);

	if(data){
		navigateTo(`/chat/${data.id}`, { state: {userName: data.firstName+" "+data.lastName, userId: data.id} })
	}

	

	useEffect(() => {
		dispatch(getRecruiter());
	}, []);

	if (loading) {
		return <div>Loading.....</div>;
	}
};

export default ChatWithRecruiterPage;
