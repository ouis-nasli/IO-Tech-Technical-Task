import { QueryClientProvider } from 'react-query';
import './App.css';
import AppRouting from './AppRouting';

import queryClient from './queryClient';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AppRouting />
				<ToastContainer
					position='bottom-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/>
			</QueryClientProvider>
		</>
	);
}

export default App;
