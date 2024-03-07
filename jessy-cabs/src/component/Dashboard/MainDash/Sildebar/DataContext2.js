import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider2 = ({ children }) => {
    const [sharedData, setSharedData] = useState('');

    return (
        <DataContext.Provider value={{ sharedData, setSharedData }}>
            {children}
        </DataContext.Provider>
    );
};