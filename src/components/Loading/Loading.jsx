import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaConfluence } from 'react-icons/fa';
import './Loading.css';
import boy from '../../assets/boy.gif';

function Loading() {
	const navigate = useNavigate();
	const [removeLoading, setRemoveLoading] = useState(false);

	const handleClickFavorites = () => {
		navigate('/home');
	};

	useEffect(() => {
		const handleStateRedirect = async () => {
			try {
				setTimeout(() => {
					return setRemoveLoading(true);
				}, 3000);
			} catch (error) {
				console.log('Erro useEffect handleStateRedirect: ', error);
			}
		};
		handleStateRedirect();
	}, []);

	if (removeLoading) return handleClickFavorites();

	return (
		<div>
			<div className='lodad-main'>
				<div className='ct-oroganization'>
					<div>
						<img
							src={boy}
							alt='logo Mettzer Boy'
							className='img-boy'
						/>
					</div>
					<div>
						<h3><FaConfluence size={28} color="white"/><strong>Dev:T</strong></h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Loading;
