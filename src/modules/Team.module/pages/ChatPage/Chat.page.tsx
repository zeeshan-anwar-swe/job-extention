import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { getRecruiter } from '../../../../store/slices/Team/TeamChat.slice';
import { useNavigate } from 'react-router-dom';

const ChatWithRecruiterPage = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigateTo = useNavigate();

	const { loading, data, error } = useSelector(
		(state: RootState) => state.teamChat.recruiterProfile,
	);

	if (data) {
		navigateTo(`/chat/${data.id}`, {
			state: { userName: data.firstName + ' ' + data.lastName, userId: data.id },
		});
	}

	useEffect(() => {
		dispatch(getRecruiter());
	}, []);

	if (loading) {
		return <div>Loading.....</div>;
	}
};

export default ChatWithRecruiterPage;
