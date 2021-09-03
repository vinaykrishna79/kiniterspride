import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });
import router, { useRouter, withRouter } from "next/router";
import { storageUrl } from "../utils/BaseUrl";
// import { withTranslation } from "react-i18next";

import Link from "next/link";
import Image from "./custom-image";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../utils/helperFunctions";

function BrandLogoSlider(props) {
    const r = useRouter()
    const responsive = {
        0: {
            items: 2,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 6,
        },
    };

    const lang = getCurrentLocaleFromUrl(r.asPath)

    return (
        <React.Fragment>
            <OwlCarousel
                className="owl-carousel brandlogo wow fadeInUp owl-theme"
                items={6}
                margin={10}
                nav={true}
                dots={false}
                responsive={responsive}
            >

                {props.assets.map((item, idx) => (
                    <div className="item" key={idx}>
                        {console.log("item1",item)}
                        <div className="barandlogoiner" 
                        // onClick={
                        //     () => router.push({ 
                        //     pathname: `/resourcesinner/[lang]`, 
                        //     query:{ lang:lang, itemUid: item.uid , hasSubtype: props.hasSubtype, typeIdentity: props.typeIdentity },
                        //     asPath: `/resourcesinner/${lang}`
                        // })}
                        >
                            <Link 
                            href={{
                                pathname: `/resourcesinner/${lang}`,
                                query: { itemUid: item.uid, hasSubtype: props.hasSubtype, typeIdentity: props.typeIdentity },
                            }}
                            // as={`/resourcesinner/${lang}`} 
                            >
                                <a>
                            <Image src={storageUrl + item.logo} alt={imageNameToAltTag(storageUrl + item.logo)} height={100} width={100} />
                                </a>   
                                </Link>  
                                </div>


                    </div>
                ))}
            </OwlCarousel>
        </React.Fragment>
    );
}

export default withRouter(BrandLogoSlider);
