import React from "react";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import TopSlider from "../component/TopSlider";
import Secondslider from "../component/SecondSlider";
import ProductSlider from "../component/ProductSlider";
import TextSlider from "../component/TextSlider";
import { getAPI, postAPI } from "../utils/api";
// import Footer from "../Footer/Footer";
// import { Link } from "react-router-dom";
import Select from "react-select";
import { withRouter } from "next/router";

import MetaDecorator from "../utils/MetaDecorator";
// import Modal_bg from '../../Assets/img/knitandsip.jpg';
// import { Languages } from "../../Page/Header/Language";
// import { withTranslation } from "react-i18next";
import { storageUrl } from '../utils/BaseUrl';
import Image from "./custom-image";
import axios from "axios";
import Link from "next/link";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../utils/helperFunctions";
import LoadingSkeleton from "./LoadingSkeleton";
import ScreenSizeDetector from 'screen-size-detector'

class Home extends React.Component {
    state = {
        templates: [],
        isLoading: true,
        featureBanner2: [],
        featureBanner4: [],
        featureBanner5: [],
        socialBanner: [],
        bestSeller: [],
        promoBannerDetail: {},
        newsletterModal: false,
        language: {},
        languages: [],
        email: "",
        errorMessage: "",
        langObj: {},
        instaFeeds: [],
        allLanguages: [],
    };

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps);
        // if (this.props.language !== prevProps.language && prevProps.language !== "") {
         
        //     this.setState({ isLoading: true, language: this.props.language }, () => {
        //         this.loadData();
        //     });
        // }
        if(prevProps.router.asPath !== this.props.router.asPath){
            this.getDataForTheComponent()
        }
    }

    componentDidMount() {
        this.getDataForTheComponent()
        this.setState({screen: new ScreenSizeDetector()})
    }

    getDataForTheComponent = () => {
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        if (r) {
            this.setState(
                {
                    language: language,
                },
                () => {
                    this.loadData();
                    this.getInstaFeed();
                }
            );
        }
    }


    loadData = () => {
        const { language } = this.state;
        // const wow = new WOW.WOW();
        // wow.init();
  
        getAPI(`template/getMenuTemplates/1?lang=${language}`)
            .then((res) => {
                // console.log(res, language);
                const allData = res.data.data;
                this.setState({
                    isLoading: false,
                    templates: allData,
                    featureBanner2: allData.filter((value) => value.type === "feature_banner2"),
                    featureBanner4: allData.filter((value) => value.type === "feature_banner4"),
                    featureBanner5: allData.filter((value) => value.type === "feature_banner5"),
                    socialBanner: allData.filter((value) => value.type === "socialBanner"),
                });
            })
            .catch((err) => console.log(err));

        // getting bestseller product

        getAPI(`product/bestSeller?lang=${language}`)
            .then((res) => {
                let { data, status } = res.data;
                if (status === 1) {
                    this.setState({ bestSeller: data });
                }
            })
            .catch((err) => console.log(err));

        // promo banner image and link

        getAPI(`promoImage/promoImage/${language}`)
            .then((res) => {
                let { data, status } = res.data;
                if (status === 1) {
                    this.getLanguages();
                    if (data.type === "0") {
                        this.setState({ promoBannerDetail: data }, () => {
                            this.setState({ initialModal: true })
                        }
                            );
                    } else if (data.type === "1") {
                        this.setState({ newsletterModal: true, promoBannerDetail: data }, () => {
                            if (this.state.allLanguages.length > 0) {
                                let languages = this.state.allLanguages.map((lang, index) => {
                                    return {
                                        label: lang["name"],
                                        value: lang["shortName"],
                                    };
                                });
                                this.setState({ languages: languages }, () => {
                                    // let currentLang = localStorage.getItem('KP-web-lang')
                                    let currentLang = language;
                                    if (currentLang) {
                                        if (this.state.languages.length > 0) {
                                            let langFilter = this.state.languages.filter((short) => short.value === currentLang);
                                            if (langFilter.length > 0) {
                                                this.setState({ language: langFilter[0] });
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                } else {
                    this.setState({ initialModal: false });
                }
            })
            .catch((err) => console.log(err));
    };

    getLanguages = () => {
        getAPI(`language/language?lang=en`)
            .then((res) => {
                this.setState({ allLanguage: res.data.data }, () => {
                    let languages = this.state.allLanguage.map((lang, index) => {
                        return {
                            label: lang["name"],
                            value: lang["shortName"],
                        };
                    });
                    this.setState({ languages: languages }, () => {
                        this.getAllLanguages(this.state.languages);
                        // let ids = this.props.match.params;
                        // if (ids) {
                        //     let currentLang = ids.lang;
                        //     if (currentLang) {
                        //         if (this.state.languages.length > 0) {
                        //             let langFilter = this.state.languages.filter((short) => short.value === currentLang);
                        //             if (langFilter.length > 0) {
                        //                 this.setState({ language: langFilter[0] });
                        //             }
                        //         }
                        //     }
                        // }
                    });
                });
            })
            .catch((err) => console.log("Header lang error: ", err));
    };

    getAllLanguages = (allLanguages) => {
        this.setState({
            allLanguages: allLanguages,
        });
    };

    handleChange = (e) => {
        if (e?.target) {
            this.setState({ email: e.target.value });
        } else {
            this.setState({ language: e });
        }
    };

    submitNews = (e) => {
        e.preventDefault();
        let { email, language } = this.state;
        if (email !== "" && language?.value) {
            postAPI("newsletter/subscribe", { email: email, language: language.value, type: "promo" })
                .then((res) => {
                    let { /*data,*/ message, status } = res.data;
                    if (status === 1) {
                        this.setState({
                            email: "",
                            language: "",
                            newsletterModal: false,
                            // errorMessage: this.props.t('languages.Check Your Inbox')
                            errorMessage: homeLangObj.languages["Check Your Inbox"]
                        }, () => {
                            setTimeout(() => {
                                this.setState({ errorMessage: "" })
                            }, 2000)
                        });
                    } else if (status === 2) {
                        this.setState({
                            errorMessage: message,
                            newsletterModal: false
                        });
                        setTimeout(() => {
                            this.setState({ errorMessage: "" });
                        }, 2000);
                    }else{
                        this.setState({ newsletterModal: false })
                    }
                })
                .catch((error) => {
                    this.setState({ errorMessage: "Something Went Wrong!" }, () => {
                        setTimeout(() => {
                            this.setState({
                                newsletterModal: false,
                                errorMessage: ""
                            })
                        }, 2000)
                    })
                    console.log(error)
                });
                
        }
    };

    toggleModal = () => {
        this.setState({ initialModal: !this.state.initialModal });
    };

    bestSellerFunc = (best) => {
        if (best.brand) {
            this.props.router.push(`/d/${best.brand.slug}/${best.slug}/${this.state.language}`);
        } else if (best.productType) {
            this.props.router.push(`/e/${best.productType.slug}/${best.slug}/${this.state.language}`);
        }
    };

    getInstaFeed = () => {
        getAPI("template/instaposts")
            .then((res) => {
                let { data, status } = res.data;
                if (status === 1) {
                    this.setState({ instaFeeds: data.feeds });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    postInstaFeed = () => {
        postAPI("template/instaposts")
            .then((res) => {
              console.log(res,'instapost')
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        const { isLoading, templates, featureBanner2, /*featureBanner4,*/ featureBanner5, socialBanner, instaFeeds, promoBannerDetail, initialModal, screen } = this.state;
        // const { initialModal, t } = this.props;
        // console.log("allLanguage   ", this.props)
        // const { /*languages, langObj,*/  allLanguages } = this.state;
        // console.log(this.props);
        const suc_msg_box = {
            display: "block",
            margin: "0 auto",
            color: "#ffffff",
            minWidth: "250px",
          // color: "#fff",
          transform: "translate(-50%,-50%)",
          backgroundColor: "rgb(17 175 41)",
          padding: "20px 20px",
          borderRadius: "5px"
        }

        const card_center_msg =  {
            position: "absolute",
            top: "42px",
            left: "50%",
            zIndex: "9"
          }

        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        const homeLangObj = require(`../public/locales/${language}/common.json`)

        return (
        isLoading ? (
            <LoadingSkeleton />
        ) : (
            <React.Fragment>
                {/* <MetaDecorator 
                    title={t("languages.title")} 
                    description={t("languages.description")} 
                    keywords={t("languages.keywords")} 
                    ogTitle={t("languages.title")}
                    ogUrl=""
                    ogDescription={t("languages.description")}
                    ogImage=""
                /> */}
                <MetaDecorator 
                    title={homeLangObj.languages.title} 
                    description={homeLangObj.languages.description} 
                    keywords={homeLangObj.languages.keywords} 
                    ogTitle={homeLangObj.languages.title}
                    ogUrl=""
                    ogDescription={homeLangObj.languages.description}
                    ogImage=""
                />
                <div className="sm_modile_alert" style={card_center_msg}>
                {
                        this.state.errorMessage !== ""
                        ?
                    <div className="animate__animated animate__fadeIn text-center" style={suc_msg_box} role="alert">
                        {this.state.errorMessage}
                    </div>
                        :
                        null
                    }
                    </div>

                {/* Top Slider */}
                <section className="homeSlider wow fadeInUp">
                    <TopSlider templates={templates} language={'language'} />
                </section>

                {/* End Top Slider */}

                {/* Second Slider */}
                <section className="productSlider mt-5 wow fadeInUp" data-wow-offset={300}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Secondslider templates={templates} loop={false}/>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Second Slider */}

                {/* Product Grid */}
                <section className="productGrid product-size">
               
                    <div className="container">
                        <div className="row m-0 gridCol gridCol1">
                            {featureBanner2.length ?
                                featureBanner2[0].templateData.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="productColumn wow fadeInUp"
                                        data-wow-offset={300}
                                        style={{ visibility: "visible", animationName: "fadeInUp" }}
                                    >
                                        {item.image ?  <Image src={item.image} alt={imageNameToAltTag(item.image)} height={screen.width>1199?420 : screen.width>991?332 : screen.width>767?245 : screen.width>678?277: 200} /> : null}
                                        <div className="caption kpbg-dark mob-text-left">
                                            <h3 className="text-white mob-font-18">{item.title}</h3>
                                            <p className="text-white ">{item.sub}</p>
                                            <a href={`${item.buttonLink}/${this.state.language}`} className="btn btn-primary kp-h-btn-col2">
                                                {item.buttonText}
                                            </a>
                                        </div>
                                    </div>
                                )):null}
                        </div>
                    </div>
                </section>
                {/* End Product Grid */}

                {/* Product Slider */}
                {this.state.bestSeller.length > 0 ? (
                    <section className="productSlider Bestsellers-slider mt-5 wow fadeInUp f20">
                        <h2 className="section-heading  mb-4 mob-font-18">
                            {/* {t(`languages.Featured_Bestsellers`)} */}
                            {homeLangObj.languages.Featured_Bestsellers}
                            </h2>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <ProductSlider bestSeller={this.state.bestSeller} bestSellerFunc={this.bestSellerFunc} loop={true}/>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* community Section  */}
                {featureBanner5.length  ?
                    featureBanner5[0].templateData.map((item, idx) => (
                        <section className="communitySection mt-5 wow fadeInUp" key={idx}>
                            <div className="container">
                                <div className="inner">
                                    { item.image ? <Image src={item.image} alt={imageNameToAltTag(item.image)} height={650} width={(screen.width)*0.84}/>  : "" }
                                    <div className="caption text-center">
                                        <div className="title mob-font-18">{item.title}</div>
                                        <p className="mob-font-14 mob-text-center">{item.sub}</p>
                                        <a href={`${item.buttonLink}/${this.state.language}`} className="btn btn-primary">
                                            {item.buttonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )) : null}
                {/* community Section End */}

                {/* Follow Community */}
                {socialBanner.length ?
                    socialBanner[0].templateData.map((item, idx) => (
                        <section className="followCommunity mt-5 wow fadeInUp" key={idx}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 col-xs-12">
                                        <div className="pl-3 pr-6">
                                            <div className="title wow mob-font-18">{item.title}</div>
                                            <p className="mob-font-14">{item.sub}</p>
                                            <ul className="social-icons">
                                                <li className="facebook">
                                                    <a href={item.facebook} target="_blank" rel="noreferrer">
                                                        <i className="fab fa-facebook-f" />{" "}
                                                    </a>
                                                </li>
                                                <li className="instagram">
                                                    <a href={item.instagram} target="_blank" rel="noreferrer">
                                                        <i className="fab fa-instagram" />
                                                    </a>
                                                </li>
                                                {/* <li>
                                                <a href={item.twitter} target="_blank"><i className="fab fa-twitter" /></a>
                                            </li> */}
                                                <li className="ravelry">
                                                    <a href={item.ravelry} target="_blank" rel="noreferrer">
                                                        <i className="fab fa-ravelry" />
                                                    </a>
                                                </li>
                                                {/* <li>
                                                <a href={item.pinterest} target="_blank"><i className="fab fa-pinterest" /></a>
                                            </li> */}
                                                <li className="youtube">
                                                    <a href={item.youTube} target="_blank" rel="noreferrer">
                                                        <i className="fab fa-youtube" />
                                                    </a>
                                                </li>
                                                <li className="blogspot">
                                                    <a href={`/blog/${this.state.language}`} target="_blank" rel="noreferrer">
                                                        <i className="far fa-edit"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                            <p className="mob-font-14">
                                                {/* {t(`languages.Follow_our_community`)} */}
                                                {homeLangObj.languages.Follow_our_community}
                                                </p>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6 col-xs-12">
                                        <img src={item.image} className="img-fluid" alt="" />
                                    </div> */}
                                    <div className="col-lg-6 col-xs-12">
                                        <div className="row">
                                            <div className="col-sm-4  mb-4 mb-lg-0">
                                                {/* <div className="w-100 rounded mb-4 height-200 m-h-auto"> */}
                                                <Image src={`${storageUrl}${instaFeeds[0]}`} className="w-100 rounded mb-4 height-200 m-h-auto" alt={imageNameToAltTag(storageUrl + instaFeeds[0])} />
                                                {/* </div> */}
                                                {/* <div className="w-100 shadow-1-strong rounded height-200 m-h-auto"> */}
                                                <Image src={storageUrl+instaFeeds[1]} className="w-100 shadow-1-strong rounded height-200 m-h-auto" alt={imageNameToAltTag(storageUrl + instaFeeds[1])} />
                                                {/* </div> */}
                                            </div>
                                            <div className="col-sm-4  mb-4 mb-lg-0">
                                                {/* <div className="w-100 shadow-1-strong rounded mb-4 h-300 m-h-auto"> */}
                                                    <Image src={storageUrl+instaFeeds[2]} className="w-100 shadow-1-strong rounded mb-4 h-300 m-h-auto" className="w-100 shadow-1-strong rounded mb-4 h-300 m-h-auto" alt={imageNameToAltTag(storageUrl + instaFeeds[2])} />
                                                {/* </div> */}
                                                {/* <div className="w-100 shadow-1-strong rounded height-100 m-h-auto"> */}
                                                <Image src={storageUrl+instaFeeds[3]} className="w-100 shadow-1-strong rounded height-100 m-h-auto" alt={imageNameToAltTag(storageUrl + instaFeeds[3])} />
                                                {/* </div> */}
                                            </div>
                                            <div className="col-sm-4  mb-4 mb-lg-0">
                                                {/* <div className="w-100 shadow-1-strong rounded mb-4 height-100 m-h-auto"> */}
                                                <Image src={storageUrl+instaFeeds[4]} className="w-100 shadow-1-strong rounded mb-4 height-100 m-h-auto" alt={imageNameToAltTag(storageUrl + instaFeeds[4])} />
                                                {/* </div> */}
                                                {/* <div className="w-100 shadow-1-strong rounded h-300 m-h-auto"> */}
                                                <Image src={storageUrl+instaFeeds[5]} className="w-100 shadow-1-strong rounded h-300 m-h-auto" alt={imageNameToAltTag(storageUrl + instaFeeds[5])} />
                                                {/* </div> */}
                                            </div>
                                            <button onClick={()=>this.postInstaFeed()} hidden>Refetch insta</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )) : null}

                {/* Follow Community End */}

                {/* Text Slider */}
                {
                    templates && templates.length > 0
                    ?
                    <section className="textSlider wow fadeInUp">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="textSlider-title mob-font-18" style={{ textAlign: "center", marginTop: "35px" }}>
                                        {/* {t(`languages.Customer_Testimonials`)} */}
                                        {homeLangObj.languages.Customer_Testimonials}
                                    </div>
                                    <TextSlider templates={templates} />
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    null
                }

                {/* Text Slider End */}

                {/* <Footer /> */}
                {/* =================================Onloading modal show============================== */}
                {initialModal ? (
                    <div id="Onloadingmodal" className="modal Onloadingmodal z-index99999" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content wow fadeInUp">
                                <button onClick={this.toggleModal} className="close" data-dismiss="modal">
                                    &times;
                                </button>
                                <div className="modal-body">
                                    <div className="bg-img-model ">
                                        <a href={promoBannerDetail.link} className="d-block">
                                            {promoBannerDetail.type === "0" ? (
                                                <div className="Onloading-img">
                                                    <Image src={promoBannerDetail.image} alt={imageNameToAltTag(promoBannerDetail.image)} height={100} width={100}/>
                                                </div>
                                            ) : null}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {/* =============================Onloading modal close================================= */}

                {/* =================Newsletter modal =================================*/}
                {this.state.newsletterModal ? (
                    <div id="Newsletter" className="modal Newsletter z-index99999" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered max-w">
                            <div className="modal-content wow fadeInUp">
                                <button
                                    type="button"
                                    className="close letterclose"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => this.setState({ newsletterModal: false })}
                                >
                                    <span aria-hidden="true" className="close-relative">
                                        &times;
                                    </span>
                                </button>
                                <div className="modal-body">
                                    <div className="news-bg-img ">
                                        <div className="img-fluid">
                                        <Image src={promoBannerDetail.image} alt={imageNameToAltTag(promoBannerDetail.image)} height={100} width={100}/>
                                        </div>
                                        <div className="lewsletterform">
                                            <h3 className="letter-title text-center">{promoBannerDetail?.content.title}</h3>
                                            <form>
                                                <div className="form-group">
                                                    <label className="emailaddress">
                                                        {/* {this.props.t(`languages.Your Email address`)} */}
                                                        {homeLangObj.languages["Your Email address"]}
                                                        </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                 
                                                    <label className="emailaddress">
                                                        {/* {this.props.t(`languages.Select your preferred language`)} */}
                                                        {homeLangObj.languages["Select your preferred language"]}
                                                        </label>
                                                    <Select
                                                        value={this.state.language}
                                                        onChange={this.handleChange}
                                                        options={allLanguages}
                                                        // isDisabled={brandLoading}
                                                        // isLoading={brandLoading}
                                                        placeholder=""
                                                        className="selct-language"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary join-btn w-100" onClick={(e) => this.submitNews(e)}>
                                                        {/* {this.props.t(`languages.Join Now`)} */}
                                                        {homeLangObj.languages["Join Now"]}
                                                    </button>
                                                </div>
                                                {/* <span className="text-danger position-absolute">{this.state.errorMessage}</span> */}
                                                <p className="letter-subtitle">No Thank you</p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
   {/* <Link href="/" locale="de">
                                                        <a>german</a>
                                                    </Link> */}
                {/* =============================Newsletter modal close================================= */}
            </React.Fragment>
        )
        )
    }
}

// export default withTranslation()(withRouter(Home));
export async function getStaticProps  ({ locale }){
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }

export default withRouter(Home)