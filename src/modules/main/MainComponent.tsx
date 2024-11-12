import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const MainComponent = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default MainComponent;
