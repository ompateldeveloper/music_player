import { createContext, useContext, useState } from "react";

const themeContext = createContext();
export function ThemeContextProvider({children}){
    const [theme,setTheme] = useState(false);
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