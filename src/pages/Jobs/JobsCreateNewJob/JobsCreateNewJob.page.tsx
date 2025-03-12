import React, { useRef, useState } from 'react';
import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
	CardHeaderChild,
} from '../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { NavSeparator } from '../../../components/layouts/Navigation/Nav';
import ResultUserDataPartial from './_partial/ResultUserData.partial';
import SearchPartial from './_partial/Search.partial';
import CandidateCardPartial from './_partial/CandidateCard.partial';
import AssignJobModalPartial from '../_partial/AssignJob.partial';
import CreateJobLeftSidePartial from './_partial/CreateJobLeftSide.partial';
import CreateJobRightSidePartial from './_partial/CreateJobRightSide.partial';

const JobsCreateNewJobPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Jobs' currentPage='Create Job' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/jobs'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Jobs
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container className='grid grid-cols-12 gap-4'>
					<CreateJobLeftSidePartial />
					<CreateJobRightSidePartial />
				</Container>
			</PageWrapper>
		</>
	);
};

export default JobsCreateNewJobPage;
