import Container from '../../../components/layouts/Container/Container';
import PageWrapper from '../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft } from '../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../components/ui/Button';
import Breadcrumb from '../../../components/layouts/Breadcrumb/Breadcrumb';
import Card, {
	CardBody,
	CardFooter,
	CardFooterChild,
	CardHeader,
} from '../../../components/ui/Card';
import { Link } from 'react-router-dom';
import LabelTitlepartial from './_partial/LabelTitle.partial';
import { profileImageUrlValidationCheck } from '../../../utils/validationCheck';

import RichTextPartial from './_partial/RichText.partial';

const CandidateCVEditPage = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Candidates' currentPage='Edit Candidate CV' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Candidates'>
				<Subheader>
					<SubheaderLeft>
						<Link to='/candidates'>
							<Button rounded='rounded-full' icon='HeroArrowLeft'>
								Back To Candidates
							</Button>
						</Link>
					</SubheaderLeft>
				</Subheader>
				<Container className='grid grid-cols-12 gap-4'>
					<Card className='col-span-9 flex flex-col gap-2 max-lg:col-span-12'>
						<CardHeader>
							<h1>Edit CV</h1>
							<p className='font-light'>Edit and Update Candidate CV</p>
						</CardHeader>
						<CardBody className='flex flex-col gap-4'>
							<div className='flex items-center gap-4 '>
								<LabelTitlepartial label='Name' detail='Fleur Cook' />
								<LabelTitlepartial
									label='Role'
									detail='Product Designer, UI/UX Designer'
								/>
							</div>
							<div className='flex items-center gap-4 '>
								<LabelTitlepartial label='Experience' detail='3 Years' />
								<LabelTitlepartial
									label='Education'
									detail='BS in Product Design'
								/>
							</div>
							<RichTextPartial />
						</CardBody>
					</Card>

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
								<Button variant='outline' color='zinc'>
									Cancel
								</Button>
								<Button className='flex-1' variant='solid'>
									Save and Update CV
								</Button>
							</CardFooterChild>
						</CardFooter>
					</Card>
				</Container>
			</PageWrapper>
		</>
	);
};

export default CandidateCVEditPage;
