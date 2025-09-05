import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' Component={Dashboard} />
					<Route path='/users' Component={Users} />
					<Route path='/register' Component={Register} />
					<Route path='/login' Component={Login} />
				</Routes>
			</BrowserRouter>
		</div>

	);
}

export default App;
