"use client"
import { createContext, useState } from "react";

const DisplayContext = createContext({});

const DisplayContextProvider = ({children}:any)=>{
    let [display,setDisplay] = useState(false);
    let handledisplay = ()=>{
        setDisplay(!display)
    }


    return <DisplayContext.Provider value={{display,handledisplay}} >{children}</DisplayContext.Provider>

}

export {DisplayContext,DisplayContextProvider}