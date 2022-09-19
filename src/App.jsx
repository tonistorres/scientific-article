//https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/095ebb0d-1932-4d37-933b-9e1d721646fb/section/94fad02a-cf1d-4277-871d-1553af1aded4/day/29da2fd9-c891-4b67-8d97-635c748f4e2a/lesson/413c7955-497d-44ce-af8e-d046fa74bc94
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Home from './pages/Home/Home';
import Favorite from './pages/Favorite/Favorite';
import ProviderHome from '../src/components/ContexMetzzer/ProviderHome';

function App() {
	return (
		<div className='ct-main-home'>
<<<<<<< HEAD
			<ProviderHome>
				<BrowserRouter>
					<Routes>
						<Route path='/home' element={<Home />} />
						<Route path='/favorite' element={<Favorite />} />
						<Route exact path='/' element={<Loading />} />
					</Routes>
				</BrowserRouter>
			</ProviderHome>
=======
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/favorite' element={<Favorite />} />
				<Route exact path='/' element={<Loading />} />
			</Routes>
>>>>>>> master
		</div>
	);
}

export default App;
