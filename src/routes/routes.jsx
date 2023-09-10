//Pages
import Home from '../pages/Home';
import Register from '../pages/Register'
import Login from '../pages/Login'

const publicRoutes = [
    
    { path: '/register', component: Register },
    { path: '/', component: Login },
    { path: '/home', component: Home },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
