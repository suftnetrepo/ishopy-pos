/* eslint-disable prettier/prettier */
import React, { useState, ReactNode, useContext } from "react";
import { User, Shop } from '../model/types'

interface Actions {
    login: (params: { user: User, shop: Shop } ) => Promise<void>;
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

    const actions: Actions = {
        login: async (params: { user: User, shop: Shop }) => {          
            const { shop, user } = params ;
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
    };

    return (
        <AppContext.Provider value={{ ...state, ...actions }}>
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
