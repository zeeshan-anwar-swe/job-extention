import React from 'react';
import { useNavigate } from 'react-router-dom';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import { appPages } from '../../../config/pages.config';
import Nav, {
	NavCollapse,
	NavItem,
	NavSeparator,
	NavTitle,
} from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';
import UserTemplate from '../User/User.template';

const DefaultAsideTemplate = () => {
	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					<NavItem {...appPages.AgencyAdmin.dashboardAppPages} />
					<NavItem {...appPages.AgencyAdmin.candidatesAppPages.subPages.candidatesPage} />
					<NavItem {...appPages.AgencyAdmin.jobsAppPages.subPages.jobsPage} />
					<NavItem {...appPages.AgencyAdmin.clientsAppPages.subPages.clientsPage} />
					<NavItem {...appPages.AgencyAdmin.taskBoardAppPages} />
					<NavItem {...appPages.AgencyAdmin.reportAndAnalyticsAppPages} />

					<NavTitle>Apps</NavTitle>
					<NavItem {...appPages.AgencyAdmin.aiInterviewAppPages}>
						<Badge
							variant='outline'
							color='amber'
							className='border-transparent leading-none'>
							NEW
						</Badge>
					</NavItem>
					<NavItem {...appPages.AgencyAdmin.KoalaByteAssistantAppPages} />
					<NavItem {...appPages.AgencyAdmin.customCVAppPages} />

					<NavItem {...appPages.AgencyAdmin.testForCadidateAppPages} />
					<NavItem {...appPages.AgencyAdmin.integrationsAppPages} />

					<NavSeparator />
					<NavTitle>Team</NavTitle>
					<NavItem {...appPages.AgencyAdmin.manageTeamAppPages.subPages.manageTeamPage} />
				</Nav>
			</AsideBody>
			<AsideFooter>
				<UserTemplate />
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default DefaultAsideTemplate;
