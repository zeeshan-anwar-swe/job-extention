import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../Header/Header';
import PageWrapper from '../PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../Subheader/Subheader';
import Container from '../Container/Container';
import Card from '../../ui/Card';

const ShimmerEffectPageLoader = () => {
	return (
		<>
			<Header>
				<HeaderLeft>
					<div className='h-10 w-40 animate-pulse rounded-full bg-zinc-800/25 dark:bg-zinc-200/25' />
				</HeaderLeft>
				<HeaderRight>
					<div className='flex gap-4'>
						<div className='h-10 w-10 animate-pulse rounded-full bg-zinc-800/25 dark:bg-zinc-200/25' />
						<div className='h-10 w-10 animate-pulse rounded-full bg-zinc-800/25 dark:bg-zinc-200/25' />
						<div className='h-10 w-10 animate-pulse rounded-full bg-zinc-800/25 dark:bg-zinc-200/25' />
					</div>
				</HeaderRight>
			</Header>
			<PageWrapper>
				<Subheader>
					<SubheaderLeft>
						<div className='h-10 w-40 animate-pulse rounded-full bg-zinc-800/25 dark:bg-zinc-200/25' />
					</SubheaderLeft>
					<SubheaderRight>
						<div className='h-10 w-40 animate-pulse rounded-full bg-zinc-800/25 dark:bg-zinc-200/25' />
					</SubheaderRight>
				</Subheader>
				<Container>
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-3'>
							<Card className='h-[15vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>
						<div className='col-span-3 '>
							<Card className='h-[15vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>
						<div className='col-span-3'>
							<Card className='h-[15vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>
						<div className='col-span-3'>
							<Card className='h-[15vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>

						<div className='col-span-6'>
							<Card className='h-[50vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>
						<div className='col-span-6'>
							<Card className='h-[50vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>

						<div className='col-span-12'>
							<Card className='h-[15vh] animate-pulse'>
								<div className='invisible'>Loading...</div>
							</Card>
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default ShimmerEffectPageLoader;
