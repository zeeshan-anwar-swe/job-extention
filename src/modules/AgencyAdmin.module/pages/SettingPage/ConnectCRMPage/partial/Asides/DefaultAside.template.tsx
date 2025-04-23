import { appPages } from '../../../../../../../config/pages.config';
import Nav, { NavItem } from '../../../../../../../components/layouts/Navigation/Nav';

const SettingAside = () => {
	return (
		<aside className='col-span-2 rounded-xl max-md:col-span-12'>
			<Nav>
				<NavItem {...appPages.AgencyAdmin.settingAppPages.subPages.editProfileAppPages} />
				<NavItem {...appPages.AgencyAdmin.settingAppPages.subPages.connectCRMAppPages} />
				<NavItem {...appPages.AgencyAdmin.settingAppPages.subPages.subcriptionAppPages} />
			</Nav>
		</aside>
	);
};

export default SettingAside;
