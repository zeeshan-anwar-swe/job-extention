import React from 'react';
import { useNavigate } from 'react-router-dom';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import { appPages, componentsPages } from '../../../config/pages.config';
import Nav, {
	NavButton,
	NavCollapse,
	NavItem,
	NavSeparator,
	NavTitle,
	NavUser,
} from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';
import UserTemplate from '../User/User.template';
import usersDb from '../../../mocks/db/users.db';
import Alert from '../../../components/ui/Alert';

const DefaultAsideTemplate = () => {
	const navigate = useNavigate();

	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					<NavItem {...appPages.dashboardAppPages} />
					<NavItem {...appPages.candidatesAppPages.subPages.candidatesPage} />
					<NavItem {...appPages.jobsAppPages.subPages.jobsPage} />
					<NavItem {...appPages.clientsAppPages.subPages.clientsPage} />
					<NavItem {...appPages.taskBoardAppPages} />
					<NavItem {...appPages.reportAndAnalyticsAppPages} />

					<NavTitle>Apps</NavTitle>
					<NavItem {...appPages.aiInterviewAppPages}>
						<Badge
							variant='outline'
							color='amber'
							className='border-transparent leading-none'>
							NEW
						</Badge>
					</NavItem>
					<NavItem {...appPages.KoalaByteAssistantAppPages} />
					<NavItem {...appPages.settingAppPages.subPages.settingPage} />

					<NavSeparator />
					<NavTitle>Team</NavTitle>
					<NavItem {...appPages.manageTeamAppPages.subPages.manageTeamPage} />

					<NavUser
						text={`${usersDb[0].firstName} ${usersDb[0].lastName}`}
						image={usersDb[0].image?.thumb}
						to={`${appPages.chatAppPages.to}/${usersDb[0].username}`}
					/>
					<NavUser
						text={`${usersDb[1].firstName} ${usersDb[1].lastName}`}
						image={usersDb[1].image?.thumb}
						to={`${appPages.chatAppPages.to}/${usersDb[1].username}`}>
						<NavButton
							title='New Message'
							icon='HeroChatBubbleLeftEllipsis'
							iconColor='emerald'
							onClick={() => {}}
						/>
					</NavUser>
					<NavUser
						text={`${usersDb[2].firstName} ${usersDb[2].lastName}`}
						image={usersDb[2].image?.thumb}
						to={`${appPages.chatAppPages.to}/${usersDb[2].username}`}
					/>
					<NavUser
						text={`${usersDb[3].firstName} ${usersDb[3].lastName}`}
						image={usersDb[3].image?.thumb}
						to={`${appPages.chatAppPages.to}/${usersDb[3].username}`}>
						<NavButton
							title='New Message'
							icon='HeroChatBubbleLeftEllipsis'
							iconColor='emerald'
							onClick={() => {}}
						/>
					</NavUser>
					<NavUser
						text={`${usersDb[4].firstName} ${usersDb[4].lastName}`}
						image={usersDb[4].image?.thumb}
						to={`${appPages.chatAppPages.to}/${usersDb[4].username}`}>
						<NavButton
							title='New Message'
							icon='HeroChatBubbleLeftEllipsis'
							iconColor='emerald'
							onClick={() => {}}
						/>
					</NavUser>
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
