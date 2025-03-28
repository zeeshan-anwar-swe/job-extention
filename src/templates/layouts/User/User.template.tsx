import React, { useEffect } from 'react';
import Icon from '../../../components/icon/Icon';
import Badge from '../../../components/ui/Badge';
import { NavButton, NavItem, NavSeparator } from '../../../components/layouts/Navigation/Nav';
import { appPages, authPages } from '../../../config/pages.config';
import User from '../../../components/layouts/User/User';
import { useAuth } from '../../../context/authContext';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { setUserProfileData } from '../../../store/slices/User.slice';

const UserTemplate = () => {
	const dispatch: AppDispatch = useDispatch();
	const { userProfile } = useSelector((state: RootState) => state.user);

	const { userStorage, onLogout } = useAuth();

	useEffect(() => {
		if (userStorage) {
			dispatch(setUserProfileData(userStorage));
		}
	}, [userStorage]);

	return (
		<User
			name={userProfile?.firstName}
			nameSuffix={<Icon icon='HeroCheckBadge' color='blue' />}
			position={userProfile?.role}
			src={profileImageUrlValidationCheck(userProfile?.image)}
			suffix={
				<Badge color='amber' variant='solid' className='text-xs font-bold'>
					Pro
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
