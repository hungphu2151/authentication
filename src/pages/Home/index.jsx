import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { sendAccessToken } from '../../services/Api.jsx'
import AuthService from '../../services/AuthService.jsx';


function Home() {
    const navigate  = useNavigate();
    const { state } = useLocation();
    const [responseMessage, setResponseMessage] = useState('');
    const [token, setToken] = useState(state.data.token);

    const handleTest = async (e) => {
        e.preventDefault();
        try {
            //console.log(state.data);
            const response = await sendAccessToken(token);
            setResponseMessage(`API Response: ${response.data.message}`);
            console.log(token)
        } catch (error) {
            console.error('Error sending AccessToken:', error);
            setResponseMessage('Error sending AccessToken');
             
        }
      };

      const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://auth-server-fmp.vercel.app/auth/logout', token);
            alert("Đăng xuất thành công");
            if(response.data.success){
                AuthService.logout();
                navigate('/');
            }
        } catch (error) {
            alert("Đăng xuất thất bại");
            //console.log('Đăng xuất thất bại');             
        }
      };

      const refreshToken = async () => {
        //e.preventDefault();
        try {
            const response = await axios.post('https://auth-server-fmp.vercel.app/auth/refresh-token', {}, {withCredentials: true});
            console.log('Refresh thành công', response.data);
            setToken(response.data.data.token);
        } catch (error) {
            console.error('Lỗi khi làm mới token:', error);            
        }
      };

      useEffect(() => {
        window.addEventListener('beforeunload', refreshToken());
    
        return () => {
          window.removeEventListener('beforeunload', refreshToken());
        };
      }, []);

    return <div className='card'>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <hr/>
                <div style={{padding:20}}>
                    <div className="heading1">Home</div>
                    <br />
                        <p>
                            <button className="btn" onClick={handleTest}>Test api</button>
                            <div>{responseMessage}</div>
                            <button className="btn" onClick={refreshToken}>Refresh</button>
                            <br />
                            <p><button className='btn_logout' onClick={handleLogout}>Đăng xuất</button></p>
                        </p>
                </div>
            </div>;
}

export default Home;
