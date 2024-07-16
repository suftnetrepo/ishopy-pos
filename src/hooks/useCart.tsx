/* eslint-disable prettier/prettier */
import { useState, useCallback } from 'react';

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
const useCart = () => {
    const [cart, setCart] = useState<CartState>({
        items: [],
        discount: 0,
        tax: 0,
    });

    const addItem = async (item: CartItem) => {    
        setCart({...cart, items : [ ...cart.items, item ]});
    };

    const updateItem = useCallback((updatedItem: CartItem) => {
        setCart((cart) => {
            return {
                ...cart,
                items: cart.items.map(item =>
                    item.id === item.id ? item : updatedItem
                )
            }
        })
    }, []);

    const deleteItem = useCallback((id: number) => {
        setCart((cart) => {
            return {
                ...cart,
                items: cart.items.filter(item => item.id !== id)
            }
        })
    }, []);

    const setDiscount = useCallback((discount: number) => {
        setCart((cart) => {
            return {
                ...cart,
                discount
            }
        })
    }, []);

    const setTax = useCallback((tax: number) => {
        setCart((cart) => {
            return {
                ...cart,
                tax
            }
        })
    }, []);

    const getItemCount = useCallback(() => {
        return cart.items.reduce((count, item) => count + item.quantity, 0);
    }, [cart.items]);

    const getTotalItems = useCallback(() => {
        return cart.items.length;
    }, [cart.items]);

    const getTotalPrice = useCallback(() => {
        const total = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const discount = (total * cart.discount) / 100;
        const tax = (total * cart.tax) / 100;
        return total - discount + tax;
    }, [cart.items, cart.discount, cart.tax]);

    return {
        cart,
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

export { useCart };
