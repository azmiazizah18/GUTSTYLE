import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { searchProducts } from '../redux/actions/productActions';

const Header = () => {
    const token = useSelector(state => state.users.token);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleSearch = (text) => {
        dispatch(searchProducts(text));
    }

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Bagian Kiri dengan Pencarian */}
                <div className="flex items-center">
                    <FaSearch className="mr-2 text-white" />
                    <input
                        type="text"
                        placeholder="Search"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
                        className="p-2 bg-gray-700 rounded border-none text-white placeholder-gray-400"
                    />
                </div>

                {/* Logo Tengah */}
                <Link to="/" className="text-3xl font-bold">GUTSYLE</Link>

                {/* Bagian Kanan dengan Ikon Pengguna dan Keranjang */}
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link to="/cart" className="flex items-center relative">
                            <FaShoppingCart className="text-2xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="flex items-center">
                            <FaUser className="text-2xl" />
                        </Link>
                    </li>
                    {token && (
                        <li>
                            <button onClick={handleLogout} className="text-white">Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
