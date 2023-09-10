import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import '../../App.css'
import AuthService from '../../services/AuthService.jsx';
//import Cookies from 'js-cookie';

function Login() {
    const navigate  = useNavigate();
    //const [islogin, setIslogin] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://auth-server-fmp.vercel.app/auth/login', formData);
            alert('Đăng nhập thành công');
            //console.log('Đăng nhập thành công', response.data);
            //console.log(formData)
            //const cookieValue = Cookies.get();
            //console.log('CookieValue:', cookieValue);
            AuthService.login();
            if(response.data.success)
            {navigate('/home', { state: { data: response.data.data  } });}
        } catch (error) {
            alert("Đăng nhập thất bại");
            //console.error('Đăng nhập thất bại', error);
             
        }
      };

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
                    <div className="heading1">Login</div>
                    <br />
                    <>
                        <div>
                        <label htmlFor="email">Email:</label>
                        </div>
                        <p>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </p>

                        <div>
                        <label htmlFor="password">Password:</label>
                        </div>
                        <p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        </p>
                        <p><button className='btn' onClick={handleSubmit}>Đăng nhập</button></p>
                    </>
                </div>
            </div>;
}

export default Login;