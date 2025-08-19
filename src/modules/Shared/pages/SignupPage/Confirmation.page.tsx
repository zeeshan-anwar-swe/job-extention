import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card, {
	CardBody,
	CardHeader,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/icon/Icon';

export default function ConfirmationPage() {
	return (
		<div className='flex min-h-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950'>
			<Card className='w-full max-w-lg text-center p-8'>
				<CardHeader>
					<CardTitle className='!mx-auto text-3xl font-bold'>Check Your Email</CardTitle>
				</CardHeader>
				<CardBody className='space-y-4'>
					<div className='flex justify-center'>
						<Icon className='text-7xl ' color='blue' icon='HeroCheckCircle' />
					</div>
					<CardSubTitle>
						A verification link has been sent to Please check your inbox (and spam
						folder) to verify your account.
					</CardSubTitle>
					<Button className='w-full'>
						<Link className='font-semibold' to='/signin'>
							Go to Login
						</Link>
					</Button>
				</CardBody>
			</Card>
		</div>
	);
}
