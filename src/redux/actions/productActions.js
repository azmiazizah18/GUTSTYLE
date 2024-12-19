import axios from 'axios';

export const FETCH_PRODUCTS_LOADING = 'FETCH_PRODUCTS_LOADING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FILTER_PRODUCT_TITLE = 'FILTER_PRODUCT_TITLE';

export const fetchProducts = () => async (dispatch) => {
    dispatch({
        type: FETCH_PRODUCTS_LOADING,
    });
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data.map(product => ({ ...product, quantity: 20 })); // Set default quantity
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const searchProducts = (query) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCT_TITLE,
        payload: query,
    });
};
