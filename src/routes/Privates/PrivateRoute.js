import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const isLoggedIn = useSelector(state => state.profile.signed_in);

    return (
        <Route
			{...rest}
			render={({ location }) =>
                isLoggedIn ? (
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

export default PrivateRoute;