import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, CHECKOUT, UPDATE_CART } from '../actions/cartActions';

const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || [], // Ambil data dari localStorage saat inisialisasi
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
            return {
                ...state,
                items: [...state.items]
            };
        case REMOVE_FROM_CART:
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(filteredItems));
            return {
                ...state,
                items: filteredItems
            };
        case CLEAR_CART:
            localStorage.removeItem("cart");
            return {
                ...state,
                items: []
            };
        case CHECKOUT:
            // Tampilkan alert "Checkout successful"
            alert("Checkout successful");
            localStorage.removeItem("cart");
            return {
                ...state,
                items: []
            };
        case UPDATE_CART:
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.qty } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedItems));
            return {
                ...state,
                items: updatedItems
            };
        default:
            return state;
    }
};

export default cartReducer;
