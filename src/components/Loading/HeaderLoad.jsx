import './Loading.css';
import boy from '../../assets/boy.gif';

function HeaderLoad() {
    return (
        
            <div className='ct-oroganization'>
            <div><img src={boy} alt="logo Mettzer Boy" className='img-boy'/></div>
            <div><h3>Mettzer</h3></div>                        
            </div>
        
    );
}

export default HeaderLoad;