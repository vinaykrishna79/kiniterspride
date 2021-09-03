import React, { useEffect, useState } from "react"

const ScrollButton = () => {

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    // const scrollToBottom = () => {
    //     window.scrollTo({
    //         top: 1000000,
    //         left: 0,
    //         behavior: 'smooth'
    //     })
    // }
    return(
        <span className="scrollButtonBox">
            {
                scrollPosition > 50
                ?
                <span className="scrollButton" onClick={scrollToTop}><i className="fa fa-arrow-up" aria-hidden="true"></i></span>
                :
                ""
            }
        {/* <span className="scrollButton"  onClick={scrollToBottom}><i class="fa fa-arrow-down" aria-hidden="true"></i></span> */}
        </span>
    )
}

export default ScrollButton