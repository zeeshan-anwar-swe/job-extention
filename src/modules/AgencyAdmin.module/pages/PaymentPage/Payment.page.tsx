import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../../../components/ui/Button';
import Container from '../../../../components/layouts/Container/Container';
import Card, { CardBody, CardHeader } from '../../../../components/ui/Card';
import LogoTemplate from '../../../../templates/layouts/Logo/Logo.template';
import { Link } from 'react-router-dom';
import DoubleLabeledInputPartial from './partial/DoubleLabeledInput.partial';
import Label from '../../../../components/form/Label';
import InputWithIconPartial from './partial/InputWithIcon.partial';

const PaymentPage = () => {
	return (
		<PageWrapper name='Payment'>
			<Container className='!grid !w-full flex-1 !grid-cols-12 gap-4 py-16'>
				{/* Left Side start */}
				<Card className=' col-span-6 px-16 max-md:col-span-12 max-md:px-10 max-sm:px-4'>
					<CardHeader>
						<Link to='/'>
							<Button className='!px-0' icon='HeroArrowLeft'>
								<LogoTemplate style={{ width: '30px' }} />
							</Button>
						</Link>
					</CardHeader>

					<CardBody className='flex flex-col gap-2 '>
						<h6>Subscribe Legaliser Business Plan</h6>
						<h1 className='text-5xl font-semibold'>
							$50 <sub className='text-sm font-normal'>per month</sub>
						</h1>

						<DoubleLabeledInputPartial
							label='Pro Plan'
							placeholder='Billed Monthly'
							price='US$220.00'
						/>
						<DoubleLabeledInputPartial
							label='Sub Total'
							placeholder='Add promotion code'
							price='US$20.00'
						/>
						<section className='flex items-center justify-between'>
							<Label htmlFor='urlAddress'>Grand Total</Label>
							<h5>US$240.00</h5>
						</section>
					</CardBody>
				</Card>
				{/* Left Side End */}
				{/* Right Side start */}
				<Card className='col-span-6 !justify-center !rounded-none px-40 max-xl:px-20 max-md:col-span-12 max-md:px-10 max-sm:px-4'>
					<CardHeader className='flex h-fit items-center justify-center'>
						<Button
							className='flex-1'
							icon='CustomApple'
							variant='solid'
							color='zinc'
							colorIntensity='900'>
							Pay
						</Button>
					</CardHeader>
					<CardBody className='flex flex-col gap-2  py-4'>
						<InputWithIconPartial placeholder='Email' />
						<div className='w-full '>
							<Label htmlFor='payment-method'>Payment Method</Label>
							<section className='flex items-center gap-2 max-sm:flex-col'>
								<InputWithIconPartial icon='HeroCreditCard' placeholder='Card' />
								<InputWithIconPartial
									icon='HeroBuildingLibrary'
									placeholder='Account'
								/>
							</section>
						</div>
						<div className='w-full'>
							<Label htmlFor='payment-method'>Card Information</Label>
							<InputWithIconPartial
								iconSize='text-5xl'
								rightIcon='CustomCards'
								placeholder='1122 3344 5566 7788'
							/>
						</div>
						<section className='flex items-center gap-2 max-sm:flex-col'>
							<InputWithIconPartial placeholder='MM/YY' />
							<InputWithIconPartial placeholder='CVV' />
						</section>
						<div className='w-full'>
							<Label htmlFor='payment-method'>Cardholder name</Label>
							<InputWithIconPartial
								iconSize='text-5xl'
								placeholder='Full name on card'
							/>
						</div>
						<div className='w-full'>
							<Label htmlFor='payment-method'>Billing Address</Label>
							<InputWithIconPartial placeholder='United Kingdom' />
						</div>
						<Button variant='solid'>Subscribe</Button>
						<p>
							By confirming your subscription, you allow Vaionex Corporation to charge
							you for future payments in accordance with their terms. You can always
							cancel your subscription.
						</p>
					</CardBody>
				</Card>
				{/* Right Side end */}
			</Container>
		</PageWrapper>
	);
};

export default PaymentPage;
