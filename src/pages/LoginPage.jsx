import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/userActions';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.users.token);
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) {
            dispatch(loginUser(username, password));
        } else {
            setError('Please fill out both fields');
        }
    };

    if (token) {
        navigate('/');
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <Link to="/" className="text-3xl mb-6 font-bold text-gray-700">GUTSTYLE</Link>  {/* Ubah ke Link */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Login
                    </button>
                </div>
            </form>
            <p>Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
        </div>
    );
};

export default LoginPage;
