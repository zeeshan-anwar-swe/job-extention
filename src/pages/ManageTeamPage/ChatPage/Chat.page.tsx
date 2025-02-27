import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../components/ui/Button';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../components/ui/Card';

import SearchPartial from '../_partial/Search.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import ChatInputPartial from '../_partial/ChatInput.partial';

const ChatPage = () => {
	return (
		<PageWrapper name='Chat'>
			<Container className='!grid h-full !grid-cols-12 !gap-4 '>
				<Card className='col-span-12 flex flex-col gap-2'>
					<CardHeader>
						<CardHeaderChild className='!flex w-full !items-center !justify-between'>
							<h1>Kai Ashworth</h1>
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

					<CardBody className='flex flex-1 flex-col gap-4'></CardBody>
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
