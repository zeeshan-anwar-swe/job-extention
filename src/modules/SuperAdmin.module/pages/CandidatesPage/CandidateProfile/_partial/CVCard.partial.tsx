import React from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../../components/ui/Card';
import { Link } from 'react-router-dom';
import Button from '../../../../../../components/ui/Button';
import Alert from '../../../../../../components/ui/Alert';

const CVCardPartial = () => {
	return (
		<Card>
			<CardHeader className='flex-col !items-start !gap-2'>
				<CardTitle>CV</CardTitle>
				<CardHeaderChild>Download or view Candidate CV</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<Link
					target='_blank'
					to={'#'}
					className='flex h-fit items-center justify-between rounded-xl border border-zinc-100 p-0  pr-4'>
					<Button className='h-fit' icon='HeroPdf' color='zinc'>
						FluerCook.pdf
					</Button>
					<Alert iconSize='text-lg' className='!p-0' icon='HeroArrowDown' />
				</Link>
			</CardBody>
		</Card>
	);
};

export default CVCardPartial;
