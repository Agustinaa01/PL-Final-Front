import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        if(theme ==="dark"){
            setTheme("light")     
        } else {
            setTheme("dark")
        }
    };
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider