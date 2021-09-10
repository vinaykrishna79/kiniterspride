import React, { useEffect, useState } from "react"
import Skeleton from 'react-loading-skeleton'
import ScreenSizeDetector from 'screen-size-detector'
const LoadingSkeleton = () => {

    const [screen, setScreen ]= useState()
    useEffect(() => {
        const screen = new ScreenSizeDetector(); // Default options
        setScreen(screen)
    },[])
    const width = screen?.width ? screen?.width : 0
    return (        
        <div className="text-center" style={{opacity:0}}>
                <Skeleton count={1} height={width > 767 ? 500 : 250} width={width/2 || 0 } />
            <div className="m-4 p-4">
                <Skeleton count={1} height={width > 767 ? 50 : 25} width={width/4 || 0} />
            </div>
            <div className="m-4 p-4 text-center">
                <Skeleton count={8} width={width/2 || 0} />
            </div>
        </div>
    )
}

export default LoadingSkeleton