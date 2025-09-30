import Container from '../../../../../components/layouts/Container/Container';
import PageWrapper from '../../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import Breadcrumb from '../../../../../components/layouts/Breadcrumb/Breadcrumb';
import { BlogCategoryTablePartial } from './_partials/BlogCategoryTable.partial';
import Footer from '../../../../../components/layouts/Footer/Footer';
import Pagination from '../../../../../components/ui/Pagination';
import { useAppSelector } from '../../../../../hooks/useReduxStore';
import { getBlogCategoryList, setBlogCategorySearch } from '../../../../../store/slices/Blog.slice';
import PageLoader from '../../../../../templates/layouts/main/PageLoader';
import SearchPartial from '../../../../Shared/components/CustomSearch.component';
import { BlogCategoryFormPartial } from './_partials/CategoryForm.partial';

const BlogsCategoryPage = () => {
	const { rows, loading, error, search, count } = useAppSelector(
		(state) => state.blog.blogCategoryList,
	);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb
						path='Pages / Blogs'
						currentPage='Category'
					/>
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Blogs Category'>
				<Subheader>
					<SubheaderLeft>
						<SearchPartial
							setSearchActionForPagination={
								setBlogCategorySearch
							}
							searchLimit={10}
							searchListAction={
								getBlogCategoryList
							}
						/>
					</SubheaderLeft>
                    <SubheaderRight>
                        <BlogCategoryFormPartial/>
                    </SubheaderRight>
				</Subheader>
				<PageLoader loading={loading} error={error} data={rows}>
					<Container>
						<BlogCategoryTablePartial />
					</Container>
				</PageLoader>
				<Footer>
					<Pagination
						limit={10}
						getListAction={getBlogCategoryList}
						search={search}
						count={count}
					/>
				</Footer>
			</PageWrapper>
		</>
	);
};

export default BlogsCategoryPage;
