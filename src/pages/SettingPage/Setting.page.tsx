import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../components/layouts/Header/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb/Breadcrumb';
import DefaultHeaderRightCommon from '../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../components/layouts/Subheader/Subheader';
import Button from '../../components/ui/Button';
import Container from '../../components/layouts/Container/Container';
import Card from '../../components/ui/Card';

const SettingPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Manage Team' currentPage='Manage Your Team' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Container className='!grid !grid-cols-12 !gap-4'>
					<Card className='h-full'>
						<h1>Setting</h1>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default SettingPage;
