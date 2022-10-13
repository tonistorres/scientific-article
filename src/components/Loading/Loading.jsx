import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaConfluence } from 'react-icons/fa';
// import '../../index.css';
import './Loading.css';
// import './LoadingIPhoneSE.css';
import boy from '../../assets/loading.gif';

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
                }, 5000);
            } catch (error) {
                console.log('Erro useEffect handleStateRedirect: ', error);
            }
        };
        handleStateRedirect();
    }, []);

    if (removeLoading) return handleClickFavorites();

    return (

        <div className='ct-main-background'>
            <div className='sub-lodad-main'>
                <div className='ct-oroganization'>
                    <div>
                        <img
                            src={boy}
                            alt='logo Mettzer Boy'
                            className='img-logo'
                        />
                        <h3><FaConfluence size={52} color="#66B175" /><strong>Dev:T</strong></h3>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Loading;
