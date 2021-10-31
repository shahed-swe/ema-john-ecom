import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import { AuthProvider, PrivateRoute } from './components/Login/useAuth';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

// export const UserContext = createContext();

function App() {
	const [ loggedInUser, setLoggedInUser ] = useState({});

	return (
		<div>
			{/* <UserContext.Provider value={[loggedInUser, setLoggedInUser]} > */}
			<AuthProvider>
				<Router>
					<Header />
					<Switch>
						<Route path="/review">
							<Review />
						</Route>
						<Route path="/inventory">
							<Inventory />
						</Route>
						<Route exact path="/">
							<Shop />
						</Route>
						<Route path="/product/:productKey">
							<ProductDetail />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<PrivateRoute path="/shipment">
							<Shipment />
						</PrivateRoute>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</AuthProvider>
			{/* </UserContext.Provider> */}
		</div>
	);
}

export default App;
