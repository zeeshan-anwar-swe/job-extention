import { FC, useEffect, useState } from 'react';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import Input from '../../../components/form/Input';
import Icon from '../../../components/icon/Icon';
import FieldWrap from '../../../components/form/FieldWrap';
import Button from '../../../components/ui/Button';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../components/ui/Dropdown';

interface CustomSearchComponentProps {
    searchListAction: (payload: {
        search?: string;
        limit: number;
        page: number;
        searchBy?: string;
    }) => void;
    setSearchActionForPagination: (payload: any) => void;
    searchByFilterOptions?: string[];
    placeholder?: string;
    searchLimit?: number;
}

const CustomSearchComponent: FC<CustomSearchComponentProps> = ({
    searchListAction,
    setSearchActionForPagination,
    placeholder = 'Search...',
    searchLimit = 10,
    searchByFilterOptions,
}) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();

    const handleSearch = async (e: any) => {
        e.preventDefault();
        const trimmedSearchValue = searchValue.trimEnd(); // Trim trailing whitespace
        if (trimmedSearchValue) {
            dispatch(
                searchListAction({
                    search: encodeURIComponent(trimmedSearchValue),
                    limit: searchLimit,
                    page: 1,
                    searchBy,
                }),
            );
        }
    };

    const clearSearch = async () => {
        setSearchValue('');
        setSearchBy('');
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
                    searchValue || searchBy ? (
                        <Icon
                            icon='HeroXMark'
                            color='red'
                            className='mx-2 cursor-pointer'
                            onClick={() => clearSearch()}
                        />
                    ) : null
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
            {searchByFilterOptions && (
                <Dropdown>
                    <DropdownToggle hasIcon={false}>
                        <Button
                            rounded='rounded-full'
                            variant='outline'
                            color='zinc'
                            icon='HeroBarFilter'>
                            {searchBy ? searchBy : 'Search By'}
                        </Button>
                    </DropdownToggle>
                    <DropdownMenu>
                        {searchByFilterOptions.map((item, index) => (
                            <DropdownItem
                                onClick={() => setSearchBy(item)}
                                icon='HeroChevronRight'
                                key={index}>
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            )}

            <Button rounded='rounded-full' variant='solid' type='submit'>
                Search
            </Button>
        </form>
    );
};

export default CustomSearchComponent;