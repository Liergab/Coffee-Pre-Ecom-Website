import { useCurrentUserApi } from "@/services/api/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AppContextType ={
   
    isLoggin: boolean;
    setIsLoggin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined)


export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
    const [isLoggin, setIsLoggin] = useState<boolean>(() => {
        return JSON.parse(localStorage.getItem('isLoggin') || 'false');
      });

      const {data, isLoading,isError} = useCurrentUserApi()
      useEffect(() => {
        if (!isLoading) {
          const loggedIn = !isError && !!data;
          setIsLoggin(loggedIn);
          localStorage.setItem('isLoggin', JSON.stringify(loggedIn));
        }
      }, [isLoading, isError, data]);

      
    
      return (
        <AppContext.Provider value={{ isLoggin, setIsLoggin}}>
          {children}
        </AppContext.Provider>
      );
    
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
  };