import { appPages } from '../../../../../../config/pages.config';
import Nav, { NavItem } from '../../../../../../components/layouts/Navigation/Nav';

const SettingAside = () => {
	return (
		<aside className='col-span-2 rounded-xl max-md:col-span-12'>
			<Nav ulClassName='max-md:!flex'>
				<NavItem
					className='max-md:!w-fit'
					{...appPages.Admin.settingAppPages.subPages.editProfileAppPages}
				/>

				<NavItem
					className='max-md:!w-fit'
					{...appPages.Admin.settingAppPages.subPages.subcriptionAppPages}
				/>
				<NavItem
					className='max-md:!w-fit'
					{...appPages.Admin.settingAppPages.subPages.deleteAppPages}
				/>
			</Nav>
		</aside>
	);
};

export default SettingAside;
