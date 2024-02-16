import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();
export function ThemeContextProvider({children}){
    const [theme,setTheme] = useState('dark');

    useEffect(()=>{
            const gettheme = JSON.parse(localStorage.getItem('theme'))
            console.log(gettheme);
            if(gettheme=='dark'){
                setTheme(gettheme)
            } else {
                localStorage.setItem('theme',JSON.stringify(theme));
            }           
    },[theme])
    return(
        <themeContext.Provider value={{theme,setTheme}}>
            {children}
        </themeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(themeContext)
  
    if(!context) {
      throw Error('useAuthContext must be used inside an Theme')
    }
  
    return context
}