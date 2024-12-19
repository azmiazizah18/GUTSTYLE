import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart, updateCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../redux/actions/productActions';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items || []);
    const products = useSelector(state => state.products.items || []);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        if (!token) {
            navigate('/login');
            return;
        }
        dispatch(clearCart());
        navigate('/checkout');
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0 && newQuantity <= 20) {  // Ensure quantity cannot exceed 20
            dispatch(updateCart({ id, qty: newQuantity }));
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="container mx-auto p-4">
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg">Your cart is currently empty.</p>
                    <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="border p-4 flex flex-col">
                                <img src={item.image} alt={item.title} className="h-40 object-cover mb-4" />
                                <div className="flex-1">
                                    <h2 className="text-xl mb-2">{item.title}</h2>
                                    <p className="mb-2">${item.price}</p>
                                    <p className="mb-4">
                                        Quantity:
                                        <div className="flex items-center">
                                            <button
                                                className="bg-gray-200 px-2 py-1"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={item.quantity}
                                                readOnly
                                                className="w-12 text-center mx-2"
                                            />
                                            <button
                                                className="bg-gray-200 px-2 py-1"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </p>
                                    <p className="mb-4">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded mt-auto"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
