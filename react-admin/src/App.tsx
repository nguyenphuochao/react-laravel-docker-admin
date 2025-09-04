import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' Component={Dashboard} />
					<Route path='/users' Component={Users} />
					<Route path='/register' Component={Register} />
				</Routes>
			</BrowserRouter>
		</div>

	);
}

export default App;
