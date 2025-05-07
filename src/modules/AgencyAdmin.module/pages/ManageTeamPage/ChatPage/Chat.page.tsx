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

const ChatPage = () => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	const navigateTo = useNavigate();
	const location = useLocation();
	const { state } = location;

	const [chat, setChat] = useState<any>([]);

	console.log('chat', chat);

	console.log('state', state);
	
	

	const { userTokenStorage: token, userStorage } = useAuth();

	const socket = io(apiBaseUrl, {
		auth: {
			token: token || '',
		},
	});

	useEffect(() => {
		if (!state) {
			navigateTo('/manage-team');
		} else {
			socket.on('receive_message', (message) => {
				
					setChat((prev: any[]) => [...prev, message]);
				
			});

			return () => {
				socket.off('receive_message');
			};
		}
	}, [state?.user.id, userStorage.id]);

	return (
		<PageWrapper name='Chat'>
			<Container className='!grid h-full !grid-cols-12 !gap-4 '>
				<Card className='col-span-12 flex flex-col gap-2'>
					<CardHeader>
						<CardHeaderChild className='!flex w-full !items-center !justify-between'>
							<CardTitle>{textValidationCheck(state?.user.name)}</CardTitle>
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

					<CardBody className='flex flex-1 flex-col gap-4'>
						{chat.map((item: any, index: number) => (
							<h1 key={index}>{item?.text}</h1>
						))}
					</CardBody>
					<CardFooter className='rounded-full border !px-4 !py-1'>
						<CardFooterChild className='flex-1'>
							<ChatInputPartial />
						</CardFooterChild>
						<CardFooterChild>
							<Button icon='HeroPaperClip'></Button>
							<Button icon='HeroMicrophone'></Button>
							<Button
								variant='solid'
								rounded='rounded-full'
								rightIcon='HeroPaperAirplane'></Button>
						</CardFooterChild>
					</CardFooter>
				</Card>
			</Container>
		</PageWrapper>
	);
};

export default ChatPage;
