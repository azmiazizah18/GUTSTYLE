export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CHECKOUT = 'CHECKOUT';
export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_PRODUCT_STOCK = 'UPDATE_PRODUCT_STOCK'; // Tambahkan action type untuk update stock produk

export const addToCart = (product) => (dispatch, getState) => {
    // Add product to the cart
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    });

    // Update the product stock in the product reducer
    dispatch({
        type: UPDATE_PRODUCT_STOCK,
        payload: {
            productId: product.id,
            quantity: -1, // Reduce stock by 1
        },
    });
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};

export const checkout = () => {
    return {
        type: CHECKOUT,
    };
};

export const updateCart = (product) => {
    return {
        type: UPDATE_CART,
        payload: product,
    };
};
