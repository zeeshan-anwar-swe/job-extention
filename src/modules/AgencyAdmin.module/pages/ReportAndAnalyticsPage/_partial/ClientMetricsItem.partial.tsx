import useImageValidation from '../../../../../hooks/useImageValidation';
import ImageLoaderWraper from '../../../../../components/ui/ImageLoaderWraper';
import CircularProgressBar from '../../../../../components/ui/CircleProgressBar';
import { ClientMetricsType } from '../../../../../types/slices.type/agency/reportsAndAnalytics.slice.type';

export const ClientMetricsItem = ({ client }: { client: ClientMetricsType }) => {
	const { loading, imageUrl } = useImageValidation(client.image);

	return (
		<div className='flex w-full items-center gap-4'>
			<div className='flex-shrink-0'>
				<ImageLoaderWraper loading={loading} height='h-16'>
					<img src={imageUrl} alt={client?.name} className='h-16 w-16 rounded-full' />
				</ImageLoaderWraper>
			</div>
			<div className='flex flex-grow items-center justify-between'>
				<div>
					<b>{client.name}</b>
				</div>
				<CircularProgressBar
					color='stroke-red-500'
					sqSize={50}
					strokeWidth={5}
					percentage={+client.hiringRate}
				/>
			</div>
		</div>
	);
};
