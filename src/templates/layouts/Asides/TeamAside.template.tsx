import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import { appPages } from '../../../config/pages.config';
import Nav, {
	NavItem,
} from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';
import UserTemplate from '../User/User.template';

export const TeamAsideTemplate = () => {

	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					<NavItem {...appPages.Team.dashboardAppPages} />
					<NavItem {...appPages.Team.candidatesPage} />
					<NavItem {...appPages.Team.jobsPages} />
					<NavItem {...appPages.Team.clientsAppPages} />
					<NavItem {...appPages.Team.taskBoardAppPages} />
					<NavItem {...appPages.Team.customCVAppPages} />
					<NavItem {...appPages.Team.recruiterAppPages.subPages.recruiterPage} />
					<NavItem {...appPages.Team.chatPage} />


				</Nav>
			</AsideBody>
			<AsideFooter>
				<UserTemplate />
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

