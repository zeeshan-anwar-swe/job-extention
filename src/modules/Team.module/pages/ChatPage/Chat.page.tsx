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
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { textValidationCheck } from '../../../../utils/validationCheck';
import { io } from 'socket.io-client';
import { useAuth } from '../../../../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getRecruiter } from '../../../../store/slices/Team/Chat.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import PartialLoader from '../../../../templates/layouts/main/PartialLoader';

const ChatWithRecruiterPage = () => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	const dispatch: AppDispatch = useDispatch();

	const { loading, data, error } = useSelector(
		(state: RootState) => state.teamChat.recruiterProfile,
	);

	const [chat, setChat] = useState<any>([]);

	const { userTokenStorage: token, userStorage } = useAuth();

	const socket = io(apiBaseUrl, {
		auth: {
			token: token || '',
		},
	});

	useEffect(() => {
		if (data) {
			socket.on('receive_message', (message) => {
				if (
					(message.senderId === data.id && message.receiverId === userStorage.id) ||
					(message.senderId === userStorage.id && message.receiverId === data.id)
				) {
					setChat((prev: any[]) => [...prev, message]);
				}
			});

			return () => {
				socket.off('receive_message');
			};
		}
	}, [userStorage.id]);

	useEffect(() => {
		dispatch(getRecruiter());
	}, []);

	return (
		<PageWrapper name='Chat'>
			<Container className='!grid !grid-cols-12 !gap-4  '>
				<Card className='col-span-12 flex flex-col gap-2'>
					<CardHeader>
						<CardHeaderChild className='!flex w-full !items-center !justify-between'>
							<CardTitle>
								<PartialLoader loading={loading} error={error} data={data}>
									{textValidationCheck(data?.firstName + ' ' + data?.lastName)}
								</PartialLoader>
							</CardTitle>
							<div className='flex items-center gap-2'>
								<SearchPartial />
								<Button
									className='max-sm:text-nowrap  max-sm:text-sm'
									variant='outline'
									color='zinc'
									rounded='rounded-full'
									borderWidth='border'>
									Clear Chat
								</Button>
							</div>
						</CardHeaderChild>
					</CardHeader>

					<NavSeparator />

					<CardBody className='flex flex-col justify-end gap-2 !h-[420px] overflow-y-scroll'>
							{chat.reverse().map((message: any, index: number) => (
								<h1 key={index}>{message}</h1>
							))}
					</CardBody>
					<CardFooter className='rounded-full border !px-2 !py-1'>
						<ChatInputPartial setChat={setChat} />
					</CardFooter>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ChatWithRecruiterPage;
