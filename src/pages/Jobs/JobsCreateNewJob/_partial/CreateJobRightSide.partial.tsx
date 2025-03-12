import Card, { CardBody, CardHeader, CardHeaderChild } from '../../../../components/ui/Card';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import Button from '../../../../components/ui/Button';
import SearchPartial from './Search.partial';
import CandidateCardPartial from './CandidateCard.partial';

const CreateJobRightSidePartial = () => {
	return (
		<Card className='col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild>
					<div>
						<h1>Assign Candidates</h1>
						<p className='mb-0 mt-2'>Add Candidates to the Job</p>
					</div>
				</CardHeaderChild>
				<CardHeaderChild>
					<SearchPartial />
					<Button
						rounded='rounded-full'
						variant='outline'
						color='zinc'
						icon='HeroBarFilter'>
						Filter
					</Button>
				</CardHeaderChild>
			</CardHeader>

			<CardBody>
				<NavSeparator className='mb-8' />
				<div className='flex flex-col gap-4'>
					<CandidateCardPartial
						name='Alena Holmes'
						profession='Web Designer'
						experience='3 Years'
						location='Miami'
						availability='Yes'
						profileImageUrl=''
						linkedIn='https://linkedin.com/alena-holmes'
					/>

					<CandidateCardPartial
						name='Alena Holmes'
						profession='Web Designer'
						experience='3 Years'
						location='Miami'
						availability='Yes'
						profileImageUrl=''
						linkedIn='https://linkedin.com/alena-holmes'
						gitHub='https://github.com/alena-holmes'
					/>
					<CandidateCardPartial
						name='Alena Holmes'
						profession='Web Designer'
						experience='3 Years'
						location='Miami'
						availability='Yes'
						profileImageUrl=''
						linkedIn='https://linkedin.com/alena-holmes'
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default CreateJobRightSidePartial;
