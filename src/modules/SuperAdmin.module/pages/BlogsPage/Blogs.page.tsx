import Button from '../../../../components/ui/Button';
import { BlogPostCardPartial } from './_partials/BlogPostCard.partial';
import Container from '../../../../components/layouts/Container/Container';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '../../../../components/layouts/Subheader/Subheader';
import Header, { HeaderLeft, HeaderRight } from '../../../../components/layouts/Header/Header';
import DefaultHeaderRightCommon from '../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useReduxStore';
import Footer from '../../../../components/layouts/Footer/Footer';
import Pagination from '../../../../components/ui/Pagination';
import {
	getBlogCategoryList,
	getBlogPosts,
	setBlogSearch,
} from '../../../../store/slices/Blog.slice';
import PageLoader from '../../../../templates/layouts/main/PageLoader';
import SearchPartial from '../../../Shared/components/CustomSearch.component';
import { useEffect, useState } from 'react';
import SelectReact from '../../../../components/form/SelectReact';
import { useNavigate } from 'react-router-dom';

type FilterOption = {
	label: string;
	value: string;
};

const BlogsPage = () => {
    const navigateTo = useNavigate();
	const dispatch = useAppDispatch();
	const [category, setCategory] = useState<FilterOption | null>(null);
	const { rows, count, search, error, loading } = useAppSelector(
		(state) => state.blog.blogPosts,
	);
	const { rows: categoryList, loading: categoryLoading } = useAppSelector(
		(state) => state.blog.blogCategoryList,
	);

	useEffect(() => {
		dispatch(getBlogCategoryList({}));
	}, []);

	return (
		<>
			<Header>
				<HeaderLeft>
					<Breadcrumb
						path='Pages / Blogs'
						currentPage='Manage Posts'
					/>
				</HeaderLeft>
				<HeaderRight>
					<DefaultHeaderRightCommon />
				</HeaderRight>
			</Header>
			<PageWrapper name='Blogs Posts'>
				<Subheader>
					<SubheaderLeft>
						<SearchPartial
							setSearchActionForPagination={
								setBlogSearch
							}
							idForList={
								category?.value ??
								undefined
							}
							searchListAction={
								getBlogPosts
							}
							searchLimit={9}
						/>
						<SelectReact
							isClearable
							className='!w-52'
							rounded='rounded-full'
							isLoading={categoryLoading}
							variant='solid'
							placeholder='Select Category'
							name='blogCategory'
							value={category as any}
							onChange={(option: any) => {
								setCategory(option);
							}}
							options={categoryList.map(
								(category) => {
									return {
										label: category.name,
										value: category.id,
									};
								},
							)}
						/>
					</SubheaderLeft>
                    <SubheaderRight>
                        <Button onClick={()=> navigateTo("/dashboard/blog/create")} rightIcon='HeroPlus' variant='solid'>
                            Create Blog Post
                        </Button>
                    </SubheaderRight>
				</Subheader>
				<PageLoader
					messageForEmptyData={
						category
							? search
								? `No blog found for keyword: "${search}" category: "${category.label}"`
								: 'No blog found for category: ' +
									category.label
							: search
								? `No blog found for keyword: "${search}"`
								: 'No blog found'
					}
                    emptyDataIcon='HeroRectangleStack'
					error={error}
					data={rows}
					loading={loading}>
					<Container className='grid grid-cols-3 gap-4'>
						{rows.map((post) => (
							<BlogPostCardPartial
								key={post.id}
								post={post}
							/>
						))}
					</Container>
				</PageLoader>
				<Footer>
					<Pagination
						count={count}
						limit={9}
						search={search}
						idForList={category?.value}
						getListAction={getBlogPosts}
					/>
				</Footer>
			</PageWrapper>
		</>
	);
};

export default BlogsPage;
