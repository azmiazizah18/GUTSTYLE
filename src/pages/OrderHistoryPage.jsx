import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const token = useSelector(state => state.users.token);

    useEffect(() => {
        if (token) {
            fetch('https://fakestoreapi.com/carts/user/1', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(json => setOrders(json));
        }
    }, [token]);

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl mb-4">Order History</h1>
                {orders.length === 0 ? (
                    <p>You have no order history.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {orders.map(order => (
                            <div key={order.id} className="border p-4">
                                <h2 className="text-xl">Order ID: {order.id}</h2>
                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                <div className="grid grid-cols-1 gap-4">
                                    {order.products.map(product => (
                                        <div key={product.productId} className="border p-4 flex justify-between">
                                            <p>Product ID: {product.productId}</p>
                                            <p>Quantity: {product.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default OrderHistoryPage;
