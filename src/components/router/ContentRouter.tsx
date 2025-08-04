import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import contentRoutes from '../../routes/contentRoutes';
import ShimmerEffectPageLoader from '../layouts/PageLoader/ShimmerEffectPageLoader';
import { useAuth } from '../../context/authContext';
import { Roles } from '../../constants/role.enums';

const ContentRouter = () => {
    const { userStorage } = useAuth();
    
	
    // Determine the routes to use based on the user's role
    const routesToRender = userStorage.role 
        ? contentRoutes[userStorage.role] 
        : contentRoutes["default"];

    return (
        <Suspense fallback={<ShimmerEffectPageLoader />}>
            <Routes>
                {routesToRender.map((routeProps) => (
                    <Route key={routeProps.path} {...routeProps} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default ContentRouter;