import React from "react";
import dynamic from 'next/dynamic';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
import { storageUrl } from "../utils/BaseUrl";

import Image from './custom-image';
import { imageNameToAltTag } from "../utils/helperFunctions";
// import Link from 'next/link';

function ProductSlider(props) {
    const responsive = {
        0: {
            items: props.bestSeller.length < 2 ? props.bestSeller.length : 2,
        },
        600: {
            items: props.bestSeller.length < 3 ? props.bestSeller.length : 3,
        },
        1000: {
            items: props.bestSeller.length < 5 ? props.bestSeller.length : 5,
        },
    };

    const { bestSeller,loop } = props;
    return (
        <React.Fragment>
            <OwlCarousel
                className="owl-theme fourColumn owl-loaded owl-drag"
                items={4}
                margin={30}
                nav={true}
                loop={loop}
                dots={false}
                autoplay={true}
                autoplayHoverPause={true}
                autoplayTimeout={4000}
                responsive={responsive}
            >
                {bestSeller.length > 0 ?
                    bestSeller.map((best, index) => (
                        <div className="item text-center" key={index}>
                            <a onClick={() => props.bestSellerFunc(best)}>
                                <Image src={storageUrl + best.thumbnailImage} height={250} width={250} alt={imageNameToAltTag(storageUrl + best.thumbnailImage)} />
                                <p>
                                    <a>{best.tagline}</a>
                                </p>
                            </a>
                        </div>
                    )): null}
            </OwlCarousel>
        </React.Fragment>
    );
}

export default ProductSlider;
