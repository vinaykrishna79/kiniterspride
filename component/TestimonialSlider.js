import React from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactHtmlParser from "react-html-parser";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

function TestimonialSlider(props) {
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
    const { testmonials } = props;
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
                {testmonials.length > 0 &&
                    testmonials.map((ele, index) => (
                        <div className="item  text-center" key={index}>
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-sm-12">
                                    <p className="text-center">{ReactHtmlParser(ele.content)}</p>
                                    <p className="author mt-4 text-center">
                                        {`${ele.name ? ele.name + "," : ""}`} {ele.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </OwlCarousel>
        </React.Fragment>
    );
}

export default TestimonialSlider;
