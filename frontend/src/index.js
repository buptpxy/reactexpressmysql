import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap/css/bootstrap.css';
import './bootstrap/css/bootstrap-theme.css';


import Admin from './components/user/admin.js';


import {BrowserRouter,Route} from 'react-router-dom';

// const Admin = () => (
// 		<div>Admin
// 			<Link to='/Admin'> Admin </Link>
// 		</div>
// 	)
// const Register = () => (
// 		<div>Register
// 			<Link to='/Register'> Register </Link>
// 		</div>
// 	)

ReactDOM.render(
	<BrowserRouter>
		<div>
			
			<Route server_url="http://localhost:4000" path="/Admin" component={Admin} />
		</div>
	</BrowserRouter>,
	document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
