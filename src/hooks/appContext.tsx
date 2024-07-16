/* eslint-disable prettier/prettier */
import React, { useState, ReactNode, useContext } from "react";
import { User, Shop, CartItem } from '../model/types'
import { useCart } from "./useCart";

interface CartActions {
    addItem: (item: CartItem) => Promise<void>;
    updateItem: (item: CartItem) => void;
    deleteItem: (id: number) => void;
    setDiscount: (discount: number) => void;
    setTax: (tax: number) => void;
    getItemCount: () => number;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

interface Actions extends CartActions {
    login: (params: { user: User, shop: Shop }) => Promise<void>;
    logout: () => Promise<void>;
    updateCurrentUser: (user: User) => void;
    updateCurrentShop: (shop: Shop) => void
}

interface State {
    user: User | null;
    shop: Shop | null;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = React.createContext<Actions & State | undefined>(undefined);

const initialState: State = {
    user: null,
    shop: null,
};

const AppProvider = ({ children }: AppProviderProps) => {
    const [state, setState] = useState<State>(initialState);
    const {
        addItem,
        updateItem,
        deleteItem,
        setDiscount,
        setTax,
        getItemCount,
        getTotalItems,
        getTotalPrice } = useCart()

    const actions: Actions = {
        login: async (params: { user: User, shop: Shop }) => {
            const { shop, user } = params;
            setState((prevState) => ({
                ...prevState,
                shop,
                user,
            }));
        },

        logout: async () => {
            setState(initialState);
        },

        updateCurrentUser: (user) => {
            setState((prevState) => ({
                ...prevState,
                user,
            }));
        },

        updateCurrentShop: (shop) => {
            setState((prevState) => ({
                ...prevState,
                shop,
            }));
        },

        addItem,
        updateItem,
        deleteItem,
        setDiscount,
        setTax,
        getItemCount,
        getTotalItems,
        getTotalPrice,
    };

    return (
        <AppContext.Provider value={{
            ...state, ...actions,
            addItem,
            updateItem,
            deleteItem,
            setDiscount,
            setTax,
            getItemCount,
            getTotalItems,
            getTotalPrice,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

export const useAppContext = (): Actions & State => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
