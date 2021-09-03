import React from "react";
// import OwlCarousel from "react-owl-carousel";
import dynamic from 'next/dynamic';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

function TextSlider(props) {
    const data = props.templates.filter((value) => value.type === "textBanner");
    const responsive = {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    };
    return (
        <React.Fragment>
            <OwlCarousel
                className="owl-carousel single owl-theme"
                items={1}
                loop
                autoplay={true}
                autoplayHoverPause={true}
                autoplayTimeout={20000}
                margin={30}
                nav={false}
                dots={true}
                responsive={responsive}
            >
                {data.length ?
                    data[0].templateData.map((item, idx) => (
                        <div className="item text-center" key={idx}>
                            <div className="row justify-content-center">
                                <div className="col-lg-8 col-12">
                                    {/* <h2>{item.title}</h2> */}
                                    <p className="mob-center mob-font-14">{item.sub}</p>
                                    <p className="author mt-4 mob-center mob-font-14">
                                        {item.name.length > 0 ? `${item.name},` : ""} {item.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )): null}
            </OwlCarousel>
        </React.Fragment>
    );
}

export default TextSlider;
