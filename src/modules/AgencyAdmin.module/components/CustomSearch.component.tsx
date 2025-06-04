import { FC, useEffect, useState } from 'react';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import Input from '../../../components/form/Input';
import Icon from '../../../components/icon/Icon';
import FieldWrap from '../../../components/form/FieldWrap';
import Button from '../../../components/ui/Button';

interface CustomSearchComponentProps {
	searchListAction: (payload: { search?: string; limit: number; page: number }) => void;
	setSearchActionForPagination: (payload: any) => void;
	placeholder?: string;
	searchLimit?: number;
}

const CustomSearchComponent: FC<CustomSearchComponentProps> = ({
	searchListAction,
	setSearchActionForPagination,
	placeholder = 'Search...',
	searchLimit = 10,
}) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const dispatch: AppDispatch = useDispatch();

	const handleSearch = async (e: any) => {
		e.preventDefault();
		if (searchValue) {
			dispatch(searchListAction({ search: searchValue, limit: searchLimit, page: 1 }));
		}
	};

	const clearSearch = async () => {
		setSearchValue('');
		dispatch(searchListAction({ limit: searchLimit, page: 1 }));
	};

	const handleChange = (data: string) => {
		if (!data) {
			dispatch(searchListAction({ limit: searchLimit, page: 1 }));
		}
		dispatch(setSearchActionForPagination(data));
		setSearchValue(data);
	};

	useEffect(() => {
		return () => dispatch(setSearchActionForPagination(''));
	}, []);
	return (
		<form className='flex items-center gap-2' onSubmit={handleSearch}>
			<FieldWrap
				// firstSuffix={<Icon className='mx-2 rounded-full' onClick={handleSearch} icon='HeroMagnifyingGlass' />}
				lastSuffix={
					searchValue !== '' && (
						<Icon
							icon='HeroXMark'
							color='red'
							className='mx-2 cursor-pointer'
							onClick={() => clearSearch()}
						/>
					)
				}>
				<Input
					rounded='rounded-full'
					id='example'
					name='example'
					placeholder={placeholder}
					value={searchValue}
					className='px-4'
					onChange={(e: any) => handleChange(e.target.value as string)}
				/>
			</FieldWrap>
			<Button variant='solid' rightIcon='HeroMagnifyingGlass' type='submit'>
				Search
			</Button>
		</form>
	);
};

export default CustomSearchComponent;
