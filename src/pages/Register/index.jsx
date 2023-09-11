import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import '../../App.css'

function Register() {

    const navigate  = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://auth-server-fmp.vercel.app/auth/register', formData);
            //console.log('Đăng ký thành công', response.data);
            alert("Đăng ký thành công");
            navigate('/');
        } catch (error) {
            alert("Đăng ký thất bại");
            //console.error('Đăng ký thất bại', error);
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
                    <div className="heading1">Register</div>
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
                        <label htmlFor="fullName">Fullname:</label>
                        </div>
                        <p>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
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

                        <div><button className='btn' onClick={handleSubmit}>Đăng ký</button></div>
                    </>
                </div>
            </div>;
}

export default Register;