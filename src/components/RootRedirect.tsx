import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRedirect: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/posts/index');
	}, [navigate]);

	return null; // Render nothing because we're redirecting
};

export default RootRedirect;
