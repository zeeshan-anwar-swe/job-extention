import { Roles } from '../constants/role.enums';
import { useAuth } from '../context/authContext';

const RoleBasedRouter = () => {
	const { userStorage } = useAuth();

	if (!userStorage) return null;

	switch (userStorage.role) {
		case Roles.CLIENT:
			return <p>Client Module</p>;
		case Roles.ADMIN:
		case Roles.SUPER_ADMIN:
			return <p>Admin or Super Admin</p>;
		case Roles.AGENCY_ADMIN:
		case Roles.TEAM:
			return <p>Team or Agency</p>;
		default:
			return <div>Unauthorized</div>;
	}
};

export default RoleBasedRouter;
