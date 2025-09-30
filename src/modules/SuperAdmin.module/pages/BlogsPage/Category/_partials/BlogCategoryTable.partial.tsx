import Table, { TBody, TFoot, Th, THead, Tr } from '../../../../../../components/ui/Table';
import { BlogCategoryTableRowPartial } from './BlogCategoryTableRow.partial';
import { useAppSelector } from '../../../../../../hooks/useReduxStore';

export const BlogCategoryTablePartial = () => {
	const { rows } = useAppSelector((state) => state.blog.blogCategoryList);
	return (
		<Table>
			<THead>
				<Tr>
					<Th>Name</Th>
					<Th>Order</Th>
					<Th>Blog Count</Th>
					<Th colSpan={2}>Actions</Th>
				</Tr>
			</THead>
			<TBody className='text-center'>
				{rows.map((category) => (
					<BlogCategoryTableRowPartial
						key={category.id}
						category={category}
					/>
				))}
			</TBody>
			<TFoot>
				<Tr>
					<Th>Name</Th>
					<Th>Order</Th>
					<Th>Blog Count</Th>
					<Th colSpan={2}>Actions</Th>
				</Tr>
			</TFoot>
		</Table>
	);
};
