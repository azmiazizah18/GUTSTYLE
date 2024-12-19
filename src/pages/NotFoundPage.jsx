import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl mb-4">404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
