import { FETCH_PRODUCTS_LOADING, FETCH_PRODUCTS_SUCCESS, FILTER_PRODUCT_TITLE } from '../actions/productActions';

const initialState = {
    items: [],
    isLoading: false,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            };
        case FILTER_PRODUCT_TITLE:
            return {
                ...state,
                items: state.items.filter(product => product.title.toLowerCase().includes(action.payload.toLowerCase())),
            };
        case 'UPDATE_PRODUCT_STOCK':
            return {
                ...state,
                items: state.items.map(product =>
                    product.id === action.payload.productId
                        ? { ...product, quantity: product.quantity + action.payload.quantity }
                        : product
                ),
            };
        default:
            return state;
    }
};

export default productReducer;
