import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clearCart } from '../redux/actions/cartActions';
import Toast from '../components/Toast';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.items);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const [toast, setToast] = useState(null);

    const handleConfirmOrder = () => {
        if (!token) {
            setToast({ message: 'Please login to confirm order', type: 'error' });
            setTimeout(() => {
                setToast(null);
            }, 2000);
            return;
        }

        // Implementasi logika konfirmasi pesanan di sini
        console.log('Confirm Order', cartItems);
        dispatch(clearCart());
        setToast({ message: 'Order confirmed successfully', type: 'success' });
        setTimeout(() => {
            setToast(null);
        }, 2000);
    };

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl mb-4">Checkout</h1>
                {cartItems.length === 0 ? (
                    <p>Keranjang belanja Anda kosong.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="border p-4 flex justify-between">
                                <img src={item.image} alt={item.title} className="h-20 object-cover" />
                                <div>
                                    <h2 className="text-xl">{item.title}</h2>
                                    <p>${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={handleConfirmOrder}
                    className="bg-blue-500 text-white mt-4 py-1 px-4 rounded"
                >
                    Confirm Order
                </button>
            </main>
            <Footer />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default CheckoutPage;
