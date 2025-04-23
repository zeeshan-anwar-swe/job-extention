import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import { DeliveryMan5WithDog } from '../../../assets/images';
import Container from '../../../components/layouts/Container/Container';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<PageWrapper isProtectedRoute={false} title='404' name='Not valid page'>
			<Subheader>
				<SubheaderLeft>
					<Button
						onClick={() => navigate(-1)}
						rounded='rounded-full'
						icon='HeroArrowLeft'>
						Back To Previous Page
					</Button>
				</SubheaderLeft>
			</Subheader>
			<Container className='flex h-full items-center justify-center'>
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-12 mb-16 flex flex-wrap justify-center gap-4'>
						<div className='flex basis-full justify-center'>
							<span className='text-5xl font-semibold'>404</span>
						</div>
						<div className='flex basis-full justify-center'>
							<span className='text-zinc-500'>This page could not be found.</span>
						</div>
					</div>
					<div className='col-span-3' />
					<div className='col-span-6 flex justify-center'>
						<img src={DeliveryMan5WithDog as string} alt='' className='max-h-[32rem]' />
					</div>
				</div>
			</Container>
		</PageWrapper>
	);
};

export default NotFoundPage;
