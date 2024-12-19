import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const Product = ({ product, isDetail }) => {
    const dispatch = useDispatch();
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleAddToCart = () => {
        if (!token) {
            window.location.href = '/login';
        } else {
            dispatch(addToCart(product));
            alert('Product added to cart!');
        }
    };

    return (
        <div className={`border p-4 ${isDetail ? 'grid grid-cols-2 gap-4' : ''}`}>
            <img
                src={product.image}
                alt={product.title}
                className={isDetail ? 'h-64 object-cover' : 'h-40 object-cover mb-4'}
            />
            <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                {isDetail && <p>{product.description}</p>}
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-600">Stock: {product.quantity}</p> {/* Add stock information */}
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white mt-2 py-1 px-4 rounded"
                >
                    Add to Cart
                </button>
            </div>
            {!isDetail && (
                <Link to={`/product/${product.id}`} className="mt-2 text-blue-500">
                    View Details
                </Link>
            )}
        </div>
    );
};

export default Product;
