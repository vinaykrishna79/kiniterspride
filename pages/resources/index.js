import React, { Component } from "react";
import BrandLogoSlider from "../../component/BrandLogoSlider";
// import BrandImagesSlider from "../../Component/BrandImagesSlider";
// import KnitProImages from "../../Component/KnitProImages";
// import BrandVideoSlider from "../../Component/BrandVideoSlider";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getAPI } from "../../utils/api";
// import Footer from "../Footer/Footer";
import { withRouter } from "next/router";
// import { withTranslation } from "react-i18next";
import MetaDecorator from "../../utils/MetaDecorator";
import Link from "next/link";
import Image from "../../component/custom-image";
import { getCurrentLocaleFromUrl } from "../../utils/helperFunctions";
import LoadingSkeleton from "../../component/LoadingSkeleton";

class Resources extends Component {
    state = {
        resources: [],
        isLoading: true,
        language: "",
        langObj: {},
    };

    componentDidMount() {
        // window.scrollTo(0, 0);
        // // this.setState({ language: this.props.language })
        // let lang = this.props?.match?.params?.lang;
        // let langus = localStorage.getItem("languages")
        // if(langus && !langus.includes(lang)){
        //     this.props.history.push("/NotFound")
        // }
        const r = this.props.router;
        const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        if (lang) {
            this.setState({ language: lang }, () => {
                this.getResources();
            });
        }
    }

    onRefClick = () => {
        let id = this.props?.router?.query?.resorceId;
        if (id) {
            setTimeout(() => {
                let myRef = document.getElementById(id);
                // myRef.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }, 1000);
        }
    };

    // componentDidUpdate(prevProps) {
    //     // this.onRefClick();
    //     if (this.props.i18n.language.split("-")[0] !== prevProps.language && prevProps.language !== "") {
         
    //         this.setState(
    //             {
    //                 language: this.props.i18n.language.split("-")[0],
    //             },
    //             () => {
    //                 let { language } = this.state;
    //                 let oldroute = this.props.location.pathname;
    //                 let oldrouteSplit = oldroute.split("/");
    //                 oldrouteSplit.splice(oldrouteSplit.length - 1, 1, language);
    //                 let newroute = oldrouteSplit.join("/");
    //                 this.props.history.push(newroute);
    //                 this.getResources();
    //             }
    //         );
    //     }
    // }

    getResources = () => {
        // this.setState({ language: this.props.language, isLoading: true })
        let { language } = this.state;
        getAPI(`resource/resources?lang=${language}`)
            .then((res) => {
                const { status, data } = res.data;
                if (status === 1) {
                    this.setState({ resources: data, isLoading: false }, () => this.onRefClick());
                } else {
                    this.setState({ resources: [], isLoading: false });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const { isLoading, resources, language, langObj } = this.state;
        // const { t } = this.props;
        const r = this.props.router;
        const resourcesLangObj = require(`../../public/locales/${getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)}/common.json`)
        return (
            <React.Fragment>
                <MetaDecorator 
                    title={"Resources | Knitter's Pride"} 
                    description={""} 
                    keywords={""} 
                    ogTitle={"Resources | Knitter's Pride"}
                    ogDescription={""}
                    ogImage={""}
                />
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <div className="sets-container">
                            {/* Main Section End */}
                            <section className="inner position-relative">
                                <div className="header-overlay" />
                                <Image src={"https://knitterspride-prod.s3.amazonaws.com/static/resourcesbanner-knitterspride.jpg"} alt="Resources banner" className=" w-100" width={0} height={0} />
                            </section>
                            <section id="press">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <h2 className="wow fadeInUp">
                                                {/* {t(`languages.Download_Brand_Assets`)}Download_Brand_Assets */}
                                                {resourcesLangObj.languages.Download_Brand_Assets}
                                                </h2>
                                            <p className="wow fadeInUp">
                                                {/* {t(`languages.Gallery_to_download`)} Gallery_to_download */}
                                                {resourcesLangObj.languages.Gallery_to_download}
                                                </p>
                                        </div>
                                        {resources.map((item, idx) => (
                                            <div
                                                id={`${item.name[language]}`}
                                                className="col-12 col-md-12"
                                                key={idx}
                                                // onClick={() => this.typeIdentity(item.name.en)}
                                            >
                                                <h4 className="wow fadeInUp">{item.name[language]}</h4>
                                                <BrandLogoSlider
                                                    typeIdentity={item.name.en}
                                                    assets={item.resources}
                                                    hasSubtype={item.hasSubtype}
                                                    isLoading={isLoading}
                                                    lang={this.props.language}
                                                    langObj={langObj}
                                                ></BrandLogoSlider>
                                            </div>
                                        ))}
                                       
                                    </div>
                                </div>
                            </section>

                            {/* Main Section End */}
                        </div>
                        {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
                    </>
                )} 
            </React.Fragment>
        );
    }
}

// export default withTranslation()(withRouter(Resources));

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
// }

// export const getStaticPaths = async () => {
//     let paths = []
//     getAPI(`language/language?lang=en`)
//     .then((res) => {
//           data = res.data.data.map(lang => {
//             return {
//                 params: { lang: lang.shortName }
//             }
//         })
//       })
//       .catch((err) => console.log("Header lang error: ", err));

//     return {
//         paths,
//         fallback: false
//     }
// }

export default withRouter(Resources)