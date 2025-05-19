import { FC } from 'react';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import Pagination from '../../../../../components/ui/Pagination';
import { getClientsMetrics } from '../../../../../store/slices/Agency/ReportsAndAnalytics.slice';
import { ClientMetricsItem } from './ClientMetricsItem.partial';



const ClientMetricsPartial = () => {
	const { loading, rows, count, error } = useSelector(
		(state: RootState) => state.reportsAndAnalytics.clientMetrics,
	);


	return (
		<Card className='h-full'>
			<CardHeader>
				<CardHeaderChild>
					<div>
						<CardTitle>Clients Metrics</CardTitle>
						<p>Review your Clients hiring rate.</p>
					</div>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='flex max-h-96 overflow-y-scroll flex-col gap-4'>
				{
					rows.map((client: any) => (
						<ClientMetricsItem client={client} key={client.id} />
					))
				}
			</CardBody>
			<CardFooter>
				<Pagination limit={10} count={count} getListAction={getClientsMetrics} />
			</CardFooter>
		</Card>
	);
};

export default ClientMetricsPartial;
