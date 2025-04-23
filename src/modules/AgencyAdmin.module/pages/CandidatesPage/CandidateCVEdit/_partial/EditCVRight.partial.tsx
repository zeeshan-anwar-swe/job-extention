import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
} from '../../../../../../components/ui/Card';
import { FormikProps } from 'formik';
import Button from '../../../../../../components/ui/Button';
import { profileImageUrlValidationCheck } from '../../../../../../utils/validationCheck';
import { EditCVFormValues } from '../CandidateCVEdit.page';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';

export const EditCVRightPartial = ({ formik }: { formik: FormikProps<EditCVFormValues> }) => {
	const { componentLoading } = useSelector((state: RootState) => state.candidates);
	return (
		<Card className='col-span-3 h-full w-full max-lg:col-span-12 '>
			<CardHeader>
				<div>
					<h1>Preview</h1>
					<p className='font-light'>Download and Preview CV.</p>
				</div>
			</CardHeader>
			<CardBody>
				<img
					className='aspect-square w-full rounded-xl object-cover'
					src={profileImageUrlValidationCheck(
						'https://www.w3schools.com/html/img_girl.jpg',
					)}
					alt=''
				/>
				<div>
					<h3>Fleur Cook</h3>
					<p className='font-light'>fleur.cook@example.com</p>
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterChild className='flex w-full items-center'>
					<Link to='/candidates'>
						<Button variant='outline' color='zinc'>
							Cancel
						</Button>
					</Link>
					<Button
						isLoading={componentLoading}
						onClick={() => formik.handleSubmit()}
						className='flex-1'
						variant='solid'>
						Save and Update CV
					</Button>
				</CardFooterChild>
			</CardFooter>
		</Card>
	);
};
