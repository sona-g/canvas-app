import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import Post from './pages/Post';
import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/user" element={<Login />} />
					<Route path="/posts" element={<Main />} />
					<Route path="/posts/:id" element={<Post />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
