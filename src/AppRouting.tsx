import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RootRedirect from './components/RootRedirect';
import MainRouting from './modules/main/MainRouting';

const AppRouting = () => {
	return (
		<Routes>
			<Route path='/' element={<RootRedirect />} />

			<Route
				path='/*'
				element={
					<React.Suspense fallback={<p>Loading</p>}>
						<MainRouting />
					</React.Suspense>
				}
			/>
		</Routes>
	);
};

export default AppRouting;
