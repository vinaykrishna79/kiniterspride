import React from "react"
const CustomImage = ({ src,
    alt,
    className,
    height,
    width,
onClick}) => {
    return (
        <img src={src}
            alt={alt}
            className={className}
            onClick={onClick}
            // height={height}
            // width={width} 
            />
    )
}
export default CustomImage;