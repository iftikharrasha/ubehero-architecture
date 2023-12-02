import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const isLoggedIn = useSelector(state => state.profile.signed_in);
	const uid = useSelector(state => state.profile.data ? state.profile.data._id : null);
	console.log(isLoggedIn, uid)

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