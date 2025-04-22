import App from '../App/App';
import { Roles } from '../constants/role.enums';
import { useAuth } from '../context/authContext';
import LoginPage from '../pages/LoginPage/Login.page';

const RoleBasedRouter = () => {
	const { userStorage } = useAuth();

	if (!userStorage) return null;

	switch (userStorage.role) {
		case Roles.CLIENT:
			return <p>Client Module</p>;
		case Roles.ADMIN:
		case Roles.SUPER_ADMIN:
			return <p>Super Admin</p>;
		case Roles.AGENCY_ADMIN:
			return <App />;
		case Roles.TEAM:
			return <p>Team or Agency</p>;
		default:
			return <LoginPage />;
	}
};

export default RoleBasedRouter;
