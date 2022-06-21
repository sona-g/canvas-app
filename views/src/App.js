import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import Post from './pages/Post';
import './App.css';
import NewPost from './pages/NewPost';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/user" element={<Login />} />
					<Route path="/posts" element={<Main />} />
					<Route path="/posts/new" element={<NewPost />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
