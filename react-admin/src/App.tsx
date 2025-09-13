import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/users/Users';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import Roles from './pages/roles/Roles';
import RoleCreate from './pages/roles/RoleCreate';
import RoleEdit from './pages/roles/RoleEdit';
import Products from './pages/products/Products';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import Orders from './pages/orders/Orders';
import PrivateRoute from './components/PrivateRoute';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './components/Loading';

function App() {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(
			async () => {
				try {
					await axios.get<any>(`user`);
					setIsAuthenticated(true);
					setLoading(false);
				} catch (error) {
					setIsAuthenticated(false);
					setLoading(false);
				}
			}
		)();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="App">
			<BrowserRouter>

				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />

				<PrivateRoute isAuthenticated={isAuthenticated}>
					<Route path='/' exact component={Dashboard} />
					<Route path='/users' exact component={Users} />
					<Route path='/users/create' component={UserCreate} />
					<Route path='/users/:id/edit' component={UserEdit} />
					<Route path='/roles' exact component={Roles} />
					<Route path='/roles/create' exact component={RoleCreate} />
					<Route path='/roles/:id/edit' exact component={RoleEdit} />
					<Route path='/products' exact component={Products} />
					<Route path='/products/create' component={ProductCreate} />
					<Route path='/products/:id/edit' component={ProductEdit} />
					<Route path='/orders' component={Orders} />
				</PrivateRoute>

			</BrowserRouter>
		</div>

	);
}

export default App;
