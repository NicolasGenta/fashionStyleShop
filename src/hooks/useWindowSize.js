import { useContext } from "react";
import { WindowsSizeContext } from "../context/windowsSize";

export function useWindowSize(){
    const { windowSize } = useContext(WindowsSizeContext);

    if(windowSize === undefined) throw new Error('useWindowSize must be used within a WindowSizeProvider');
    return { windowSize }
}