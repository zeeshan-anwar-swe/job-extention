import { Card } from 'antd';
import React from 'react';
import { CardBody, CardHeader } from '../../../../components/ui/Card';
import { useAuth } from '../../../../context/authContext';
import useImageValidation from '../../../../hooks/useImageValidation';
import Collapse from '../../../../components/utils/Collapse';
import { appPages } from '../../../../config/pages.config';
import { NavItem, NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import { cn } from '../../../../utils/cn';

export const AuthUserTemplate = () => {
	const { userStorage, onLogout } = useAuth();
	const [isOpen, setIsOpen] = React.useState(false);

	const { imageUrl } = useImageValidation(userStorage.image);

	return (
		<div className='relative h-12 w-44'>
			<div
				className={cn(
					'absolute z-50 bg-white !p-0',
					isOpen ? 'rounded-xl' : 'rounded-xl',
				)}>
				<div
					onClick={() => setIsOpen(!isOpen)}
					className='flex cursor-pointer items-center gap-4 rounded-full py-1  pl-1 pr-6'>
					<img className='h-9 w-9 rounded-full' src={imageUrl} alt='profile-image' />
					<h6>{userStorage.firstName}</h6>
				</div>
				<Collapse isOpen={isOpen}>
					<NavSeparator />
					<NavItem {...appPages[userStorage.role].dashboardAppPages} />
					<NavItem {...appPages[userStorage.role].settingAppPages} />
					<NavItem
						text='Logout'
						icon='HeroArrowRightOnRectangle'
						onClick={() => onLogout()}
					/>
				</Collapse>
			</div>
		</div>
	);
};
