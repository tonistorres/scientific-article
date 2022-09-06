import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GoMarkGithub } from "react-icons/go";
import './Fotter.css';

// Explicação: Responsividade com BootStrap Footer 
// https://www.youtube.com/watch?v=5VFlZpgfu48&list=PLR8OzKI52ppXaPGdUUQGOGKeXSGbChIbc&index=4
function Footer() {
    
    return (
        <div className='container col-12 pt-3 text-light  footer text-center fotter bg-color-person'>
            <div className='d-flex  justify-content-around align-items-center'>
                <span>
                    <a href="https://www.facebook.com/datorres.ferreira/">
                        <FaFacebook size={30} color="black" />
                    </a>
                </span>
                <span>
                    <a href="https://www.instagram.com/tonistorresferreira/">
                        <FaInstagram size={30} color="black" />
                    </a>
                </span>
                <span>
                    <a href="https://github.com/tonistorres">
                        <GoMarkGithub size={30} color="black"/>
                    </a>
                </span>
                <span>
                    <a href="https://www.linkedin.com/in/tonistorres/">
                        <FaLinkedin size={30} color="black"/>
                    </a>
                </span>
            </div>

        </div>
    );
}

export default Footer;