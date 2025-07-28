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

const SocialCardPartial = () => {
	return (
		<Card>
			<CardHeader className='flex-col !items-start !gap-2'>
				<CardTitle>Social Profile</CardTitle>
				<CardHeaderChild>Social profile insights</CardHeaderChild>
			</CardHeader>
			<CardBody className='flex flex-col gap-4'>
				<Link
					target='_blank'
					to={'#'}
					className='flex h-fit items-center justify-between rounded-xl border border-zinc-100 p-0  pr-4'>
					<Button className='h-fit gap-2' icon='HeroLinkedIn' color='zinc'>
						Linked In
					</Button>
					<Alert iconSize='text-lg' className='!p-0' icon='HeroArrowUpRight' />
				</Link>
				<Link
					target='_blank'
					to={'#'}
					className='flex h-fit items-center justify-between rounded-xl border border-zinc-100 p-0  pr-4'>
					<Button className='h-fit gap-2' icon='HeroGitHub' color='zinc'>
						GitHub
					</Button>
					<Alert iconSize='text-lg' className='!p-0' icon='HeroArrowUpRight' />
				</Link>
				<Link
					target='_blank'
					to={'#'}
					className='flex h-fit items-center justify-between rounded-xl border border-zinc-100 p-0  pr-4'>
					<Button className='h-fit gap-2' icon='HeroTwitterX' color='zinc'>
						Twitter
					</Button>
					<Alert iconSize='text-lg' className='!p-0' icon='HeroArrowUpRight' />
				</Link>
			</CardBody>
		</Card>
	);
};

export default SocialCardPartial;
