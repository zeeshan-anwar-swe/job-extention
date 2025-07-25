import { useState } from 'react';
import { useFormik } from 'formik';
import FieldWrap from '../../../../../components/form/FieldWrap';
import Icon from '../../../../../components/icon/Icon';
import Input from '../../../../../components/form/Input';
import axiosInstance from '../../../../../utils/axiosInstance';
import toast from 'react-hot-toast';

const SearchPartial = ({ setChat, receiverId, setIsSearched }: { setChat: any; receiverId: string; setIsSearched:any  }) => {
	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: async (values) => {
			try {
				const seachedChatResponse = await axiosInstance.get(
					`/chat/messages/${receiverId}/search?query=${values.search}`,
				);
				if (seachedChatResponse.data.data.length === 0) {
					toast.error('No chat found');
					setChat([]);
				} else {
					setChat(seachedChatResponse.data.data);
					setIsSearched(true);
				}
			} catch (error) {
			} finally {
			}
		},
	});

	const getChat = async () => {
		try {
			const seachedChatResponse = await axiosInstance.get(
				`/chat/messages/${receiverId}?limit=10`,
			);
			setChat(seachedChatResponse.data.data);
			setIsSearched(false);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const handleClearSearch = () => {
		formik.setFieldValue('search', '');
		getChat();
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<FieldWrap
				firstSuffix={<Icon className='mx-2 rounded-full' icon='HeroMagnifyingGlass' />}
				lastSuffix={
					formik.values.search !== '' && (
						<Icon
							icon='HeroXMark'
							color='red'
							className='mx-2 cursor-pointer'
							onClick={handleClearSearch}
						/>
					)
				}>
				<Input
					id='search'
					name='search'
					placeholder='Search...'
					value={formik.values.search}
					className='rounded-full'
					onChange={formik.handleChange}
				/>
			</FieldWrap>
		</form>
	);
};

export default SearchPartial;
