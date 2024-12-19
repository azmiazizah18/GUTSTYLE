import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [toast, setToast] = useState(null);
    const token = useSelector(state => state.users.token);

    useEffect(() => {
        if (token) {
            fetch('https://fakestoreapi.com/users/1', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(json => setUser(json));
        }
    }, [token]);

    if (!user) return <div>Loading...</div>;

    const initialValues = {
        firstname: user.name.firstname,
        lastname: user.name.lastname,
        email: user.email,
        city: user.address.city,
        street: user.address.street,
        number: user.address.number,
        zipcode: user.address.zipcode,
        phone: user.phone,
    };

    const validationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        city: Yup.string().required('City is required'),
        street: Yup.string().required('Street is required'),
        number: Yup.number().required('Number is required'),
        zipcode: Yup.string().required('Zipcode is required'),
        phone: Yup.string().required('Phone is required'),
    });

    const handleUpdateProfile = (values, { setSubmitting }) => {
        fetch(`https://fakestoreapi.com/users/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: values.email,
                username: user.username,
                name: {
                    firstname: values.firstname,
                    lastname: values.lastname
                },
                address: {
                    city: values.city,
                    street: values.street,
                    number: values.number,
                    zipcode: values.zipcode,
                    geolocation: user.address.geolocation,
                },
                phone: values.phone
            })
        })
        .then(res => res.json())
        .then(() => {
            setToast({ message: 'Profile updated successfully', type: 'success' });
            setSubmitting(false);
            setTimeout(() => {
                setToast(null);
            }, 2000);
        })
        .catch(() => {
            setToast({ message: 'Profile update failed', type: 'error' });
            setSubmitting(false);
            setTimeout(() => {
                setToast(null);
            }, 2000);
        });
    };

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl mb-4">Profile</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdateProfile}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label>First Name:</label>
                                <Field type="text" name="firstname" className="border p-2" />
                                <ErrorMessage name="firstname" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>Last Name:</label>
                                <Field type="text" name="lastname" className="border p-2" />
                                <ErrorMessage name="lastname" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>Email:</label>
                                <Field type="email" name="email" className="border p-2" />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>City:</label>
                                <Field type="text" name="city" className="border p-2" />
                                <ErrorMessage name="city" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>Street:</label>
                                <Field type="text" name="street" className="border p-2" />
                                <ErrorMessage name="street" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>Number:</label>
                                <Field type="number" name="number" className="border p-2" />
                                <ErrorMessage name="number" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>Zipcode:</label>
                                <Field type="text" name="zipcode" className="border p-2" />
                                <ErrorMessage name="zipcode" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label>Phone:</label>
                                <Field type="text" name="phone" className="border p-2" />
                                <ErrorMessage name="phone" component="div" className="text-red-500" />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4" disabled={isSubmitting}>
                                Update Profile
                            </button>
                        </Form>
                    )}
                </Formik>
            </main>
            <Footer />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default ProfilePage;
