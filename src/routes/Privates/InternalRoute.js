import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const InternalRoute = ({ children, ...rest }) => {
    const isAdmin = useSelector(state => state.profile.data?.permissions?.includes("admin"));

    return (
        <Route
			{...rest}
			render={({ location }) =>
                isAdmin ? (
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

export default InternalRoute;