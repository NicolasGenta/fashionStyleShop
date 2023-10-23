import { createContext, useState, useEffect } from "react";

export const WindowsSizeContext = createContext();

export const WindowsSizeProvider = ({children})=>{
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const updateWindowSize = ()=>{
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(()=>{
        window.addEventListener('resize', updateWindowSize);
        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

    return(
        <WindowsSizeContext.Provider value={{
            windowSize
        }}
        >
            {children}
        </WindowsSizeContext.Provider>
    )
}