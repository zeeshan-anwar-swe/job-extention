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
import { getMyProfile, setUserProfileData } from '../../../store/slices/User.slice';

const UserTemplate = () => {
	const { onLogout, userTokenStorage } = useAuth();
	const dispatch: AppDispatch = useDispatch();
	const { userProfile, loading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (userProfile.email === '') {
			if (userTokenStorage) {
				dispatch(getMyProfile());
			}
		}
	}, []);

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
			<NavItem {...appPages.AgencyAdmin.settingAppPages.subPages.settingPage} />

			<NavItem text='Logout' icon='HeroArrowRightOnRectangle' onClick={() => onLogout()} />
		</User>
	);
};

export default UserTemplate;
