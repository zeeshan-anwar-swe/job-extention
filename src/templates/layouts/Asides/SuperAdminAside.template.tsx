import Badge from '../../../components/ui/Badge';
import { appPages } from '../../../config/pages.config';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import Nav, { NavItem, NavTitle } from '../../../components/layouts/Navigation/Nav';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import UserTemplate from '../User/User.template';

const SuperAdminAsideTemplate = () => {
	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					<NavItem {...appPages.SuperAdmin.dashboardAppPages} />
					<NavItem {...appPages.SuperAdmin.recruiterAppPages.subPages.recruiterPage} />
					<NavItem {...appPages.SuperAdmin.candidatesAppPages} />
					<NavItem {...appPages.SuperAdmin.jobsAppPages} />
					<NavItem {...appPages.SuperAdmin.clientsAppPages} />
					<NavItem {...appPages.SuperAdmin.adminAppPages.subPages.rootPage} />

					<NavTitle>Apps</NavTitle>
					<NavItem {...appPages.SuperAdmin.aiInterviewAppPages}>
						<Badge
							variant='outline'
							color='amber'
							className='border-transparent leading-none'>
							NEW
						</Badge>
					</NavItem>
					<NavItem {...appPages.SuperAdmin.KoalaByteAssistantAppPages} />
				</Nav>
			</AsideBody>
			<AsideFooter>
				<UserTemplate />
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default SuperAdminAsideTemplate;
