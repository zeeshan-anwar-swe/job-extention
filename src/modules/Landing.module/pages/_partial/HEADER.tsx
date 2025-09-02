import React, { useState, useEffect } from 'react';
import menu from '../../../../../public/assets/menu.png';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../../../public/assets/logo.png';
import { useAuth } from '../../../../context/authContext';
import UserTemplate from '../../../../templates/layouts/User/User.template';
import Card, { CardBody } from '../../../../components/ui/Card';
import { AuthUserTemplate } from './AuthUserTemplate';

function HEADER() {
	const {userStorage, userTokenStorage} = useAuth()
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isHomeActive = location.pathname === '/' || location.pathname === '/Home';

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<section
			id='header'
			className='sticky top-0 z-50 mx-auto w-full bg-[#E0E2F4] px-5 py-3 md:px-10 md:py-2 lg:px-14 lg:py-4'>
			<div className='mx-auto flex flex-col items-center justify-between md:flex-row'>
				{/* Logo and Menu Button */}
				<div className='flex w-full items-center justify-between md:w-auto'>
					<div className='mb-4 flex items-center md:mb-0'>
						<img src={logo} alt='Logo' className='h-8' />
					</div>

					<button className='p-2 md:hidden' onClick={toggleMenu} aria-label='Toggle menu'>
						<img src={menu} alt='Menu' className='h-6 w-6' />
					</button>
				</div>

				{/* Mobile Menu Overlay */}
				{isMenuOpen && (
					<div
						className='fixed inset-0 z-10 mt-16 bg-[#E0E2F4] bg-opacity-50 md:hidden'
						onClick={toggleMenu}></div>
				)}

				<nav
					className={`${
						isMenuOpen
							? 'fixed left-0 right-0 top-16 z-20 bg-[#E0E2F4] p-5 shadow-lg'
							: 'hidden'
					} mb-4 flex-col space-y-4 text-center md:mb-0 md:flex md:flex-row md:space-x-4 md:space-y-0 lg:space-x-6`}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive || isHomeActive
								? 'bg-white/27 block rounded-3xl border border-[#1384EA] px-8 py-2 text-center text-base font-medium text-[#010314]'
								: 'block border border-transparent py-2 text-base font-medium text-[#010314]'
						}
						onClick={() => setIsMenuOpen(false)}>
						Home
					</NavLink>

					<NavLink
						to='/blogs'
						className={({ isActive }) =>
							isActive
								? 'bg-white/27 block rounded-3xl border border-[#1384EA] px-8 py-2 text-center text-base font-medium text-[#010314]'
								: 'block border border-transparent py-2 text-base font-medium text-[#010314]'
						}
						onClick={() => setIsMenuOpen(false)}>
						Blog
					</NavLink>

					<NavLink
						to='/pricing'
						className={({ isActive }) =>
							isActive
								? 'bg-white/27 block rounded-3xl border border-[#1384EA] px-8 py-2 text-center text-base font-medium text-[#010314]'
								: 'block border border-transparent py-2 text-base font-medium text-[#010314]'
						}
						onClick={() => setIsMenuOpen(false)}>
						Pricing
					</NavLink>

					<NavLink
						to='/contact'
						className={({ isActive }) =>
							isActive
								? 'bg-white/27 block rounded-3xl border border-[#1384EA] px-8 py-2 text-center text-base font-medium text-[#010314]'
								: 'block border border-transparent py-2 text-base font-medium text-[#010314]'
						}
						onClick={() => setIsMenuOpen(false)}>
						Contact us
					</NavLink>
				</nav>

				{/* Sign In Button */}

				{
					userStorage && userTokenStorage ? (
						<AuthUserTemplate/>
					):
				
				<div
					className={`${
						isMenuOpen ? 'fixed bottom-5 left-5 right-5 z-20' : 'hidden'
					} md:block`}>
					<a
						href='/signin'
						className='w-full cursor-pointer rounded-xl border border-[linear-gradient(126.51deg,#1E2AE8_42.05%,#0BA5EC_100%)] bg-[linear-gradient(126.51deg,#1E51E8_42.05%,#0BA5EC_100%)] px-4 py-2 text-base font-medium text-white md:w-auto xl:px-6 xl:py-3'>
						Sign in
					</a>
				</div>
				}
			</div>
		</section>
	);
}

export default HEADER;
