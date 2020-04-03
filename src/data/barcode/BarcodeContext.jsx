import React from 'react';
import { createContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { createBarcodeStore } from "./BarcodeStore";

export const barcodeStoreContext = createContext(null);

export const BarcodeStoreProvider = props => {
    const store = useLocalStore(createBarcodeStore)

    return (
        <barcodeStoreContext.Provider value={store}>
            {children}
        </barcodeStoreContext.Provider>
    )
}

export default BarcodeStoreProvider