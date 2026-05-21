

import { useContext, createContext } from "react";
import useSoftware from "../custom-hooks/useSoftware";

const GlobalContext = createContext()

export default function GlobalContextProvider({ children }) {
    const softData = useSoftware();
    return (
        <GlobalContext.Provider value={{ ...softData }}>
            {children}
        </GlobalContext.Provider>
    )
}


export function useGlobalContext() {
    return useContext(GlobalContext)
}