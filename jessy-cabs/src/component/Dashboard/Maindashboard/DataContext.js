// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState('');

    return (
        <DataContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </DataContext.Provider>
    );
};
