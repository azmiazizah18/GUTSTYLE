import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../redux/actions/cartActions'; // pastikan removeFromCart diimpor
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import Cart from '../components/Cart';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.items);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!token) {
            setToast({ message: 'Please login to checkout', type: 'error' });
            setTimeout(() => {
                setToast(null);
                navigate('/login');
            }, 2000);
            return;
        }

        dispatch(clearCart());
        setToast({ message: 'Checkout successful', type: 'success' });
        setTimeout(() => setToast(null), 2000);
    };

    // Fungsi untuk menghapus item dari keranjang
    const handleRemove = (id) => {
        dispatch(removeFromCart(id)); // Memanggil aksi removeFromCart dari Redux
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto flex-1 p-4">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-lg">Your cart is empty.</p>
                        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <Cart onRemove={handleRemove} /> {/* Kirim handleRemove ke Cart */}
                        <div className="text-center mt-6">
                            <h2 className="text-2xl font-bold">Total Price: ${total.toFixed(2)}</h2>
                            <button
                                onClick={handleCheckout}
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </main>
            <Footer />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default CartPage;
