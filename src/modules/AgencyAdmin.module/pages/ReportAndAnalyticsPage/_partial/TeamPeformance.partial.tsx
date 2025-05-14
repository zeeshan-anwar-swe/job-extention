import { useSelector } from 'react-redux';
import Card, {
	CardBody,
	CardFooter,
	CardHeader,
	CardHeaderChild,
	CardTitle,
} from '../../../../../components/ui/Card';
import { TeamPerformanceItem } from './TeamPerformanceItem.partial';
import { RootState } from '../../../../../store';
import Pagination from '../../../../../components/ui/Pagination';
import { getTeamPerformance } from '../../../../../store/slices/Agency/ReportsAndAnalytics.slice';
import PartialLoader from '../../../../../templates/layouts/main/PartialLoader';

const TeamPeformancePartial = () => {
	const { loading, rows, count, error } = useSelector(
		(state: RootState) => state.reportsAndAnalytics.teamPerformance,
	);


	return (
		<Card>
			<CardHeader>
				<CardHeaderChild>
					<div>
						<CardTitle>Team Performance</CardTitle>
						<p>Jobs percentage closed by team.</p>
					</div>
				</CardHeaderChild>
			</CardHeader>
			<CardBody className='flex overflow-y-scroll flex-col gap-4'>
				<PartialLoader loading={loading} error={error} data={rows}>
					{rows.map((team: any) => (
						<TeamPerformanceItem team={team} key={team.teamUser.id} />
					))}
				</PartialLoader>
			</CardBody>
			<CardFooter>
				<Pagination limit={10} count={count} getListAction={getTeamPerformance} />
			</CardFooter>
		</Card>
	);
};

export default TeamPeformancePartial;
