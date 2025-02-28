import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../components/layouts/Subheader/Subheader';
import Button from '../../components/ui/Button';
import Container from '../../components/layouts/Container/Container';
import Card, { CardBody, CardFooter, CardFooterChild } from '../../components/ui/Card';
import SettingAside from './partial/Asides/DefaultAside.template';
import { profileImageUrlValidationCheck } from '../../utils/validationCheck';
import Icon from '../../components/icon/Icon';
import LabelTitleTextAreapartial from './partial/LabelTitleTextArea.partial';
import LabelTitlepartial from './partial/LabelTitle.partial';
import { NavSeparator } from '../../components/layouts/Navigation/Nav';

const SettingPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Setting' currentPage='Setting' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Container className='!grid flex-1 !grid-cols-12 !gap-4'>
					<Card className='col-span-12 !grid flex-1 !grid-cols-10 gap-4 overflow-hidden p-4'>
						<SettingAside />
						<Card className='col-span-8 !bg-zinc-100  dark:!bg-zinc-950 max-md:col-span-12 '>
							<CardBody className='!flex gap-4 max-md:!flex-col'>
								<div className='group relative h-fit w-fit max-md:mx-auto'>
									<img
										className=' aspect-square w-52 rounded-full'
										src={profileImageUrlValidationCheck('')}
										alt='profile'
									/>

									<Icon
										color='zinc'
										size='text-5xl'
										className='absolute left-1/2 top-1/2 -translate-x-1/2 rounded-xl bg-zinc-100/50 p-2  opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100'
										icon='HeroCamera'
									/>
								</div>
								<div className='flex flex-1 flex-col gap-4'>
									<div className='flex items-center gap-4 max-md:flex-col'>
										<LabelTitlepartial
											className='max-md:w-full'
											label='First Name'
											detail='Mishal '
										/>
										<LabelTitlepartial
											className='max-md:w-full'
											label='Last Name'
											detail='Olive'
										/>
									</div>
									<div className='flex items-center gap-4 max-md:flex-col '>
										<LabelTitlepartial
											className='max-md:w-full'
											inputType='email'
											label='Email Address'
											detail='olivia@vaionex.com'
										/>
										<LabelTitlepartial
											className='max-md:w-full'
											label='Industry'
											detail='IT / Finance'
										/>
									</div>
									<div className='flex items-center gap-4  max-md:flex-col'>
										<LabelTitleTextAreapartial
											className='w-full max-md:!p-0'
											label='About'
											detail='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
										/>
									</div>
									<div className='flex items-center gap-4 max-md:flex-col '>
										<LabelTitlepartial
											className='max-md:w-full'
											inputType='password'
											label='New password'
										/>
										<LabelTitlepartial
											className='max-md:w-full'
											inputType='password'
											label='Confirm Password'
										/>
									</div>
								</div>
							</CardBody>
							<NavSeparator />
							<CardFooter className='max-md:flex-col-reverse'>
								<CardFooterChild className=' max-md:w-full'>
									<Button
										className='max-md:!w-full'
										variant='outline'
										color='zinc'
										borderWidth='border'
										icon='HeroArrowRightOnRectangle'>
										Log Out
									</Button>
								</CardFooterChild>
								<CardFooterChild className='max-md:w-full max-md:!flex-col'>
									<Button
										className='max-md:w-full'
										variant='outline'
										color='zinc'
										borderWidth='border'>
										Cancel
									</Button>
									<Button className='max-md:w-full' variant='solid'>
										Save changes
									</Button>
								</CardFooterChild>
							</CardFooter>
						</Card>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SettingPage;
