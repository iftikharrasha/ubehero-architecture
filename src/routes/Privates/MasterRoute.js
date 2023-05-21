import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const MasterRoute = ({ children, ...rest }) => {
    const isMaster = useSelector(state => state.profile.data?.permissions?.includes("master"));

    return (
        <Route
			{...rest}
			render={({ location }) =>
                isMaster ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)}
		/>
    );
};

export default MasterRoute;