import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardSubTitle,
	CardTitle,
} from '../../../../components/ui/Card';
import { NavSeparator } from '../../../../components/layouts/Navigation/Nav';
import Button from '../../../../components/ui/Button';
import SearchPartial from './Search.partial';
import CandidateCardPartial from './CandidateCard.partial';

import JobFilterDropdownPartial from './JobFilterDropdown.partial';

const CreateJobRightSidePartial = () => {
	return (
		<Card className='relative col-span-4 flex flex-col gap-2 max-lg:col-span-12'>
			<CardHeader>
				<CardHeaderChild className='!block'>
					<CardTitle>Assign Candidates</CardTitle>
					<CardSubTitle>Add Candidates to the Job</CardSubTitle>
				</CardHeaderChild>
				<CardHeaderChild className='!flex w-full !justify-between'>
					<SearchPartial />
					<JobFilterDropdownPartial />
				</CardHeaderChild>
			</CardHeader>

			<NavSeparator className='!mx-4 mb-4' />
			<CardBody>
				<div className='flex max-h-[600px] flex-col gap-4 overflow-y-scroll'>
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
					/>
				</div>
			</CardBody>
		</Card>
	);
};

export default CreateJobRightSidePartial;
