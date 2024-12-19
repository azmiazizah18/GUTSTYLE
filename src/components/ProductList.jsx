import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import Product from './Product';
import ProductFilterSort from './ProductFilterSort';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const isLoading = useSelector(state => state.products.isLoading);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('asc');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        let updatedProducts = [...products];
        if (filter) {
            updatedProducts = updatedProducts.filter(product => product.category === filter);
        }
        if (sort === 'asc') {
            updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
        } else {
            updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(updatedProducts);
    }, [products, filter, sort]);

    return (
        <div>
            <ProductFilterSort setFilter={setFilter} setSort={setSort} />
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                        <Product key={product.id} product={product} isDetail={false} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
