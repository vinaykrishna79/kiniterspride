import React from "react"
import Skeleton from 'react-loading-skeleton'

const LoadingSkeleton = () => {
    return (
        <div className="text-center">
                <Skeleton count={1} height={500} width={1000} />
            <div className="m-4 p-4">
                <Skeleton count={1} height={50} width={500} />
            </div>
            <div className="m-4 p-4 text-center">
                <Skeleton count={8} width={1000} />
            </div>
        </div>
    )
}

export default LoadingSkeleton