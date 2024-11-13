import { Route, Routes } from 'react-router-dom';
import PostIndex from './pages/PostIndex';
import PostComponent from './PostComponent';

const PostRouting = () => {
	return (
		<Routes>
			<Route path='/' element={<PostComponent></PostComponent>}>
				<Route path='/index' element={<PostIndex />} />
			</Route>

			<Route path='*' element={<p>not found 404</p>} />
		</Routes>
	);
};

export default PostRouting;
