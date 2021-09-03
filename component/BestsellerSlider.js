import React, { useState } from 'react'
import dynamic from "next/dynamic";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image from './custom-image';
import { storageUrl } from '../utils/BaseUrl';
import { imageNameToAltTag } from '../utils/helperFunctions';
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});


function BestsellersSlider(props) {
    const [responsive, setResponsive] = useState({
        0: {
            items: props.similarProductData.length < 2 ? props.similarProductData.length : 2,
        },
        600: {
            items: props.similarProductData.length < 3 ? props.similarProductData.length : 3,
        },
        1000: {
            items: props.similarProductData.length < 3 ? props.similarProductData.length : 3,
        },

    })

    const { similarProductData } = props
    return (
        <React.Fragment>
            <OwlCarousel
                className="owl-carousel single owl-theme fourColumn"
                items={similarProductData.length}
                loop={true}
                // center={similarProductData.length === 2 ? false : true}
                // center={true}
                autoplay={true}
                autoplayHoverPause={true}
                autoplayTimeout={5000}
                margin={30} nav={true} dots={false}
                responsive={responsive}>
                {
                    similarProductData.length > 0 && similarProductData.map((ele, index) => (
                        <div className="item text-center" key={index} style={{ "cursor": "pointer" }} onClick={() => props.getDetailsthroughSimilarProducts(ele)}>
                            <span className="Similar-Products-list">
                                <Image src={storageUrl + ele.thumbnailImage} alt={imageNameToAltTag(storageUrl + ele.thumbnailImage)} className="h-100" height={450} width={450}/>
                            </span>
                            <p>{ele.tagline}</p>
                        </div>
                    ))
                }
            </OwlCarousel>
        </React.Fragment>
    )
}

export default BestsellersSlider;