import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Product from '../components/Product';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state =>
        state.products.items.find(item => item.id === parseInt(id))
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Helmet>
                <title>{product.title} - GUTSYLE </title>
                <meta name="description" content={product.description} />
            </Helmet>
            <Header />
            <main className="container mx-auto p-4">
                <Product product={product} isDetail={true} />
            </main>
            <Footer />
        </div>
    );
};

export default ProductPage;
