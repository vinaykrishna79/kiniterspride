import React from "react";
import dynamic from 'next/dynamic';
// import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useRouter } from "next/router";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../utils/helperFunctions";
import Image from "./custom-image";
import ScreenSizeDetector from 'screen-size-detector'

function TopCarosel(props) {
    const router = useRouter()
    const screen = new ScreenSizeDetector()
    const topBannerList = props.templates.filter((value) => value.type === "top_banner");
    // const [responsive, setResponsive] = useState({
    //     0: {
    //         items: 1,
    //     },
    //     450: {
    //         items: 1,
    //     },
    //     600: {
    //         items: 1,
    //     },
    //     1000: {
    //         items: 1,
    //     },
    // },)

    const sliderClick = item => {
        if(item && item.buttonLink && item.buttonLink.includes("https://")){
            window.open(item.buttonLink, "_blank");
        } else if(item && item.buttonLink){
            router.push(`/${item.buttonLink}/${getCurrentLocaleFromUrl(router.asPath)}`)
        }
    }

    return (
        <React.Fragment>
            <OwlCarousel
                className="owl-theme single owl-loaded owl-drag cs_btn_owl"
                items={1}
                loop
                margin={10}
                // dots={true}
                autoplay={true}
                autoplayHoverPause={true}
                autoplayTimeout={5000}
                nav={true}
                navText={["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]}
                // responsive={responsive}
            >
                {topBannerList.length ?
                    topBannerList[0].templateData.map((item, idx) => (
                        <div
                            className="item"
                            key={`${idx}`}
                            // onClick={() => sliderClick(item)} 
                            style={item.buttonLink.trim().length === 0 ? {} : { cursor: "pointer" }}
                        >
                            {/* {console.log("Item", item)} */}
                            <Image src={item.image} alt={imageNameToAltTag(item.image)} height={ screen.width<679 ? 220 : 642} width={screen.width} onClick={() => sliderClick(item)}/>
                            <div className="slidercaption">
                                {
                                        item.title.length>0 && 
                                <h1 className={idx === 0 ? "mobfont-24 wow fadeInUp" : ""} style={idx === 0 ? { animationDuration: "2s" } : {}}>
                                    {item.title}
                                </h1>
                                }
                                { 
                                        item.sub.length>0 && 
                                <p className={idx === 0 ? "wow fadeInUp" : ""} style={idx === 0 ? { animationDuration: "3s" } : {}}>
                                    {item.sub}
                                </p>
                                }
                                {
                                item.buttonText.trim().length>0 && 
                                <span
                                    style={
                                        idx === 0 && item.buttonText.trim().length > 0
                                            ? { animationDuration: "4s" }
                                            : item.buttonText.trim().length === 0
                                            ? { display: "none" }
                                            : {}
                                    }
                                >
                                    <a id={"linkClick" + idx} href={`/${item.buttonLink}/${props.language}`}>
                                        {item.buttonText}
                                        <i className="fa fa-caret-right" aria-hidden="true" />
                                    </a>
                                </span>
                                }
                            </div>
                        </div>
                    )): null }
                
            </OwlCarousel>
        </React.Fragment>
    );
}

export default TopCarosel;
