import React from 'react';
import { useNavigate } from 'react-router-dom';
import Aside, {
	AsideBody,
	AsideFooter,
	AsideHead,
} from '../../../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import { appPages, componentsPages } from '../../../../../config/pages.config';
import Nav, {
	NavButton,
	NavCollapse,
	NavItem,
	NavSeparator,
	NavTitle,
	NavUser,
} from '../../../../../components/layouts/Navigation/Nav';
import Badge from '../../../../../components/ui/Badge';
import usersDb from '../../../../../mocks/db/users.db';

const SettingAside = () => {
	return (
		<aside className='col-span-2 rounded-xl  max-md:col-span-12'>
			<Nav>
				<NavItem {...appPages.settingAppPages.subPages.editProfileAppPages} />
				<NavItem {...appPages.settingAppPages.subPages.connectCRMAppPages} />
				<NavItem {...appPages.settingAppPages.subPages.subcriptionAppPages} />
			</Nav>
		</aside>
	);
};

export default SettingAside;
