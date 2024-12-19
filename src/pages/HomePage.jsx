import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>GUTSYLE</title>
                <meta name="description" content="Welcome to GUTSYLE, your one-stop shop for the latest fashion trends." />
            </Helmet>
            <Header />
            <main>
                <Banner />
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
                    <ProductList />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
