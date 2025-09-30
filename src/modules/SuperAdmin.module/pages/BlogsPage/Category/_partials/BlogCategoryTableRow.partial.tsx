import { FC, useState } from 'react';
import { Td, Tr } from '../../../../../../components/ui/Table';
import { TBlogCategory } from '../../../../../../types/slices.type/blog.slice.type';
import Button from '../../../../../../components/ui/Button';
import ConfirmationModal from '../../../../../../components/modal/ConfirmationModal';
import { deleteBlogCategory, setBlogCategoryDetails } from '../../../../../../store/slices/Blog.slice';
import { useAppDispatch } from '../../../../../../hooks/useReduxStore';

interface Props {
	category: TBlogCategory;
}

export const BlogCategoryTableRowPartial: FC<Props> = ({ category }) => {
	const dispatch = useAppDispatch();
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	return (
		<Tr>
			<Td>{category.name}</Td>
			<Td>{category.order}</Td>
			<Td>{category.blogCount}</Td>
			<Td colSpan={2}>
				<Button onClick={()=> dispatch(setBlogCategoryDetails(category))}>
					Edit
				</Button>
				<Button onClick={() => setDeleteModal(true)} color='red'>
					Delete
				</Button>
				<ConfirmationModal modal={deleteModal} setModal={setDeleteModal} title='Delete Category' action={deleteBlogCategory(category.id)}/>
			</Td>
		</Tr>
	);
};
