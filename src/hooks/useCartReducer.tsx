/* eslint-disable prettier/prettier */
import { useReducer, useCallback } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    discount: number;
    tax: number;
}

type Action =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'UPDATE_ITEM'; payload: CartItem }
    | { type: 'DELETE_ITEM'; payload: { id: number } }
    | { type: 'SET_DISCOUNT'; payload: number }
    | { type: 'SET_TAX'; payload: number };

const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                )
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            };
        case 'SET_DISCOUNT':
            return { ...state, discount: action.payload };
        case 'SET_TAX':
            return { ...state, tax: action.payload };
        default:
            return state;
    }
};

const useCartReducer = () => {
    const [cartState, dispatch] = useReducer(cartReducer, {
        items: [],
        discount: 0,
        tax: 0,
    });

    const addItem = useCallback((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    }, []);

    const updateItem = useCallback((item: CartItem) => {
        dispatch({ type: 'UPDATE_ITEM', payload: item });
    }, []);

    const deleteItem = useCallback((id: number) => {
        dispatch({ type: 'DELETE_ITEM', payload: { id } });
    }, []);

    const setDiscount = useCallback((discount: number) => {
        dispatch({ type: 'SET_DISCOUNT', payload: discount });
    }, []);

    const setTax = useCallback((tax: number) => {
        dispatch({ type: 'SET_TAX', payload: tax });
    }, []);

    const getItemCount = useCallback(() => {
        return cartState.items.reduce((count, item) => count + item.quantity, 0);
    }, [cartState.items]);

    const getTotalItems = useCallback(() => {
        return cartState.items.length;
    }, [cartState.items]);

    const getTotalPrice = useCallback(() => {
        const total = cartState.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const discount = (total * cartState.discount) / 100;
        const tax = (total * cartState.tax) / 100;
        return total - discount + tax;
    }, [cartState.items, cartState.discount, cartState.tax]);

    return {
        cartState,
        addItem,
        updateItem,
        deleteItem,
        setDiscount,
        setTax,
        getItemCount,
        getTotalItems,
        getTotalPrice
    };
};

export { useCartReducer };
