
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLoad from './HeaderLoad';
import Fotter from "../Fotter/Fotter";
import './Loading.css';

function Loading() {
    const navigate = useNavigate()
    const [removeLoading, setRemoveLoading] = useState(false);


    const handleClickFavorites = () => {
        navigate('/home')
    }


    useEffect(() => {
        const handleStateRedirect = async () => {
            try {
                setTimeout(() => {
                    return setRemoveLoading(true);
                }, 500);

            } catch (error) {
                console.log("Erro useEffect handleStateRedirect: ", error);
            }
        }
        handleStateRedirect();
    }, []);

    if (removeLoading) return handleClickFavorites();

    return (
        <div>
            <div className="lodad-main">
            <HeaderLoad />
            <Fotter />
            </div>
        </div>
    );
}

export default Loading;