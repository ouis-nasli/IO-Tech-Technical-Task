import { Route, Routes } from 'react-router-dom';

import MainComponent from './MainComponent';
import PostRouting from '../post/PostRouting';

const MainRouting = () => {
	return (
		<Routes>
			<Route element={<MainComponent />}>
				<Route path='/posts/*' element={<PostRouting />} />
			</Route>
		</Routes>
	);
};

export default MainRouting;
