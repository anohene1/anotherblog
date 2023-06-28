import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: any) {
    // getting stored value
    const saved = localStorage.getItem(key);
    let initial = null;
    if (typeof saved === 'string') {
        initial = JSON.parse(saved);
    }
    return initial || defaultValue;
}

export const deleteStorageValue = (key: string) =>{
    localStorage.removeItem(key);
}

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
