import React from 'react';

import { appPages, componentsPages } from '../../../../../config/pages.config';
import Nav, { NavItem } from '../../../../../components/layouts/Navigation/Nav';

const SettingAside = () => {
	return (
		<aside className='col-span-2 rounded-xl max-md:col-span-12'>
			<Nav>
				<NavItem {...appPages.settingAppPages.subPages.editProfileAppPages} />
				<NavItem {...appPages.settingAppPages.subPages.connectCRMAppPages} />
				<NavItem {...appPages.settingAppPages.subPages.subcriptionAppPages} />
			</Nav>
		</aside>
	);
};

export default SettingAside;
