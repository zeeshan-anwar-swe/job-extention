import Container from '../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import TablePartial from './_partial/Table.partial';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
} from '../../../../components/layouts/Subheader/Subheader';
import { useNavigate } from 'react-router-dom';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Button from '../../../../components/ui/Button';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import { CardSubTitle, CardTitle } from '../../../../components/ui/Card';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import Pagination from '../../../../components/ui/Pagination';
import CustomSearchComponent from '../../components/CustomSearch.component';
import { getCustomCVList, setCustomCVSearch } from '../../../../store/slices/Agency/CustomCV.slice';

const CustomCVPage = () => {
	const { loading, rows, error, count, search } = useSelector(
		(state: RootState) => state.customCV.list,
	);
	const navigateTo = useNavigate();

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb path='Pages / Custom CV' currentPage='List' />
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>

			<PageWrapper name='Custom CV'>
				<Subheader>
					<SubheaderLeft>
						<CustomSearchComponent
							searchLimit={10}
							placeholder='Search cv...'
							searchListAction={getCustomCVList}
							setSearchActionForPagination={setCustomCVSearch}
						/>
					</SubheaderLeft>
					<SubheaderRight>
						<div></div>
					</SubheaderRight>
				</Subheader>

				<Subheader className='!-z-0'>
					<SubheaderLeft className='!block'>
						<CardTitle>Custom CV</CardTitle>
						<CardSubTitle>View, manage, and track CV.</CardSubTitle>
					</SubheaderLeft>
					<SubheaderRight>
						<Button
							variant='solid'
							rightIcon='HeroPlus'
							onClick={() => navigateTo('/dashboard/custom-cv/create')}>
							Create Custom CV
						</Button>
					</SubheaderRight>
				</Subheader>

				<PageLoader
					data={rows}
					error={error}
					loading={loading}
					messageForEmptyData='No Custom CV data found'>
					<Container>
						<TablePartial />
					</Container>
				</PageLoader>

				<Pagination
					limit={10}
					count={count}
					search={search}
					getListAction={getCustomCVList}
				/>
			</PageWrapper>
		</>
	);
};

export default CustomCVPage;
