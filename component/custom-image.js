import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"

let i = 0
const CustomImage = ({ src, alt, className, height, width, onClick, noSkeleton}) => {

    const [loading, setLoading] = useState(true)

    const onLoad = () => {
        setLoading(false)
    }
    
    return (
        <>
            {
                noSkeleton
                ?
                <img src={src} alt={alt} className={className} onClick={onClick} />
                :
                <>
                    {/* <div className="d-none"><img src={src} alt={alt} className={className} onClick={onClick} onLoad={onLoad}/></div> */}
                
                        {loading ? <span className={className} style={{overflow: "hidden"}}><Skeleton height={height} width={width} /></span> : null}
                       
                        <img src={src} alt={alt} className={loading ? `d-none ${className}` : className} onClick={onClick} onLoad={onLoad}/>
                 
                </>   
            }
            
            
        </> 
    )
}
export default CustomImage;