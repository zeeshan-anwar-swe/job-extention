import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../../../components/ui/Button';
import Container from '../../../../../components/layouts/Container/Container';
import Card, { CardFooter, CardFooterChild } from '../../../../../components/ui/Card';
import LabelTitlepartial from './partial/LabelTitle.partial';
import { NavSeparator } from '../../../../../components/layouts/Navigation/Nav';
import SettingAside from '../partial/Asides/DefaultAside.template';

const ConnectCRMPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Setting' currentPage='Connect CRM' />
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
							<div className='flex w-full flex-col gap-4 p-4'>
								<div className='flex items-center gap-4 '>
									<LabelTitlepartial label='CRM Link' detail='Your CRM Link ' />
								</div>
								<div className='flex items-center gap-4 max-md:flex-col '>
									<LabelTitlepartial
										className='w-full'
										type='email'
										label='Email Address'
										detail='olivia@vaionex.com'
									/>
									<LabelTitlepartial
										className='w-full'
										type='password'
										label='Password'
									/>
								</div>
							</div>

							<div className='px-4 pb-2'>
								<NavSeparator />
							</div>
							<CardFooter>
								<CardFooterChild className='max-md:hidden'></CardFooterChild>
								<CardFooterChild className='w-full '>
									<Button
										className='max-md:w-full'
										variant='outline'
										color='zinc'>
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

export default ConnectCRMPage;
