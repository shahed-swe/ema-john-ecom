import * as firebase from 'firebase/app';
import 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import firebaseConfig from '../../firebase.config';

// add firebase credentials
firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

// provide component that wraps app & makes auth object available to any child component that calls useAuth()
export const AuthProvider = (props) => {
	const auth = Auth();
	return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
};

// Hook for child components to get the auth object & re0render when it changes
export const useAuth = () => useContext(AuthContext); // return

export const PrivateRoute = ({ children, ...rest }) => {
	// Private Routing
	const auth = useAuth(); // call hook

	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user || sessionStorage.getItem('token') ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { form: location }
						}}
					/>
				)}
		/>
	);
};

const getUser = (user) => {
	const { displayName, email, photoURL } = user;
	return { name: displayName, email, photo: photoURL };
};

// Provide hook that creates auth object and handles state
const Auth = () => {
	const [ user, setUser ] = useState(null);

	const setUserToken = () => {
		firebase
			.auth()
			.currentUser.getIdToken(/* forceRefresh */ true)
			.then(function(idToken) {
				// Send token to your backend via HTTPS
				sessionStorage.setItem('token', idToken);
			})
			.catch(function(error) {
				// Handle error
			});
	};

	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		return firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				// console.log(result);
				const signedInUser = getUser(result.user);
				setUser(signedInUser);
				setUserToken();
				return result.user;
			})
			.catch((error) => {
				console.log(error);
				setUser(null);
				return error.message;
			});
	};

	const signOut = () => {
		return firebase
			.auth()
			.signOut()
			.then((result) => {
				setUser(null);
				return true;
			})
			.catch((error) => {
				console.log(error);
				return error.message;
			});
	};

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const currentUser = getUser(user);
				// console.log(currentUser)
				setUser(currentUser);
			} else {
				// no user is signed in
			}
		});
	}, []);

	return {
		user,
		signInWithGoogle,
		signOut
	};
};

export default Auth;
