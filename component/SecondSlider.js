import React from "react";
import dynamic from 'next/dynamic';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

import Image from "./custom-image"
import { imageNameToAltTag } from "../utils/helperFunctions";

function TopCarosel(props) {
    const data = props.templates.filter((value) => value.type === "feature_banner1");
    const responsive = {
        0: {
            items: 1,
        },
        450: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    };
    // console.log(data);
    return (
        <React.Fragment>
            <OwlCarousel
                className="owl-theme single owl-loaded owl-drag top-product"
                items={1}
                loop={props.loop}
                autoplay={true}
                autoplayHoverPause={true}
                autoplayTimeout={5000}
                margin={10}
                nav={true}
                dots={false}
                responsive={responsive}
            >
                {data.length ?
                    data[0].templateData.map((item, idx) => (
                        <div className="item" key={idx}>
                            { item.image ? <Image src={item.image} alt={imageNameToAltTag(item.image)} height={660} width={1500}/> :""}
                            <div className="caption text-center needleH">
                                <h2 className="mob-font-18">
                                    {item.title}
                                    {/* <span className="blockItem"></span> */}
                                </h2>
                                <p>{item.sub}</p>
                                {item.buttonLink.length > 0 ? (
                                    <a href={item.buttonLink} className="btn btn-primary kp-h-btn-col1">
                                        {item.buttonText}
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    )): null}
            </OwlCarousel>
        </React.Fragment>
    );
}

export default TopCarosel;
