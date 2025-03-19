import React from 'react';
import Icon from '../../../components/icon/Icon';
import Badge from '../../../components/ui/Badge';
import { NavButton, NavItem, NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { appPages, authPages } from '../../../config/pages.config';
import User from '../../../components/layouts/User/User';
import { useAuth } from '../../../context/authContext';

const UserTemplate = () => {
	const { userStorage, onLogout } = useAuth();

	return (
		<User
			name={userStorage?.firstName}
			nameSuffix={userStorage?.isVerified && <Icon icon='HeroCheckBadge' color='blue' />}
			position={userStorage?.role}
			src={userStorage?.image}
			suffix={
				<Badge color='amber' variant='solid' className='text-xs font-bold'>
					PRO
				</Badge>
			}>
			<NavSeparator />
			<NavItem {...appPages.settingAppPages.subPages.settingPage} />

			<NavItem {...appPages.mailAppPages.subPages.inboxPages}>
				<Badge variant='solid' className='leading-none'>
					3
				</Badge>
				<NavButton icon='HeroPlusCircle' title='New Mail' onClick={() => {}} />
			</NavItem>
			<NavItem text='Logout' icon='HeroArrowRightOnRectangle' onClick={() => onLogout()} />
		</User>
	);
};

export default UserTemplate;
