import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/MainLayout';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<MainLayout />} > */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    {/* Perbaiki penggunaan PrivateRoute untuk halaman yang memerlukan autentikasi */}
                    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                    <Route path="/order-history" element={<PrivateRoute><OrderHistoryPage /></PrivateRoute>} />
                    <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                    <Route path="/register" element={<RegisterPage />} /> {/* Tambahkan rute registrasi */}
                    <Route path="*" element={<NotFoundPage />} />
                    {/* </Route> */}
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
