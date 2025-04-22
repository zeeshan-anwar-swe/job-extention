import React from 'react';
import { appPages } from '../../../../config/pages.config';
import Nav, { NavItem } from '../../../../components/layouts/Navigation/Nav';

const SettingAside = () => {
	return (
		<aside className='col-span-2 rounded-xl max-md:col-span-12'>
			<Nav ulClassName='max-md:!flex'>
				<NavItem
					className='max-md:!w-fit'
					{...appPages.AgencyAdmin.settingAppPages.subPages.editProfileAppPages}
				/>
				<NavItem
					className='max-md:!w-fit'
					{...appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages}
				/>
				<NavItem
					className='max-md:!w-fit'
					{...appPages.AgencyAdmin.settingAppPages.subPages.subcriptionAppPages}
				/>
			</Nav>
		</aside>
	);
};

export default SettingAside;
