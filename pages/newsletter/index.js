import React from "react";
// import Footer from "./Footer/Footer";
import Select from "react-select";
import { getAPI, postAPI } from "../../utils/api";
import moment from "moment";
import { withRouter } from "next/router";
// import { withTranslation } from "react-i18next";
import MetaDecorator from "../../utils/MetaDecorator";
import Image from "../../component/custom-image";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../../utils/helperFunctions";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class Newsletter extends React.Component {
    state = {
        languages: [],
        email: "",
        language: {},
        errorMessage: "",
        successMessage: "",
        newsletter: [],
        langObj: {},
        count: 0,
        lang_i: "",
        allLanguage: [],
    };

    async componentDidMount() {
        window.scrollTo(0, 0);
        const r = this.props.router;
        await this.getLanguages();
        await this.setState(
            {
                lang_i: getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
            },
            () => {
                // let langus = localStorage.getItem("languages")
                // if(langus && !langus.includes(this.state.lang_i)){
                //     this.props.history.push("/NotFound")
                // }
                this.getNewsletter(1);
            }
        );
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split("-")[0] !== prevProps.language && prevProps.language !== "") {
        
    //         this.setState(
    //             {
    //                 lang_i: this.props.i18n.language.split("-")[0],
    //             },
    //             () => {
    //                 let { lang_i } = this.state;
    //                 let oldroute = this.props.location.pathname;
    //                 let oldrouteSplit = oldroute.split("/");
    //                 oldrouteSplit.splice(oldrouteSplit.length - 1, 1, lang_i);
    //                 let newroute = oldrouteSplit.join("/");
    //                 this.props.history.push(newroute);
    //                 this.getNewsletter(1);
    //             }
    //         );
    //     }
    // }

    getLanguages = () => {
        getAPI(`language/language?lang=en`)
            .then((res) => {
                this.setState({ allLanguage: res.data.data }, () => {
                    if (this.state.allLanguage?.length > 0) {
                        let languages = this.state.allLanguage.map((lang, index) => {
                            return {
                                label: lang["name"],
                                value: lang["shortName"],
                            };
                        });
                        this.setState({ languages: languages }, () => {
                            // let currentLang = this.props.match.params.lang;
                            let currentLang = 'en'
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
            })
            .catch((err) => console.log("Header lang error: ", err));
    };


    getNewsletter = (page) => {
        getAPI(`newsletters/newsletters/${this.state.lang_i}?limit=5&page=${page}`)
            .then((res) => {
                let { data, status, count } = res.data;
                if (status === 1) {
                    this.setState(
                        {
                            newsletter: data,
                            count: count,
                        },
                        () => {
                            for (let i = 1; i <= Math.ceil(count / 5); i++) {
                                if (page === i) {
                                    document.getElementById(`newsletter${i}`).className = "active";
                                } else {
                                    document.getElementById(`newsletter${i}`).className = "";
                                }
                            }
                        }
                    );
                }
            })
            .catch((err) => console.log(err));
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
        const r = this.props.router;
        const newsletterLangObj = require(`../../public/locales/${getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)}/common.json`)
        let { email, language } = this.state;
        if (email !== "" && language?.value) {
            postAPI("newsletter/subscribe", { email: email, language: language.value })
                .then((res) => {
                    let { data, message, status } = res.data;
                    if (status === 1) {
                        this.setState({
                            email: "",
                            language: "",
                            // successMessage: `${this.props.t(`languages.Successfully submitted`)}`
                            successMessage: newsletterLangObj.languages["Successfully submitted"]
                        }, () => {
                            setTimeout(() => {
                                this.setState({ successMessage: "" })
                            }, 3000);   
                        });
                        
                    } else if (status === 2) {
                        this.setState({
                            errorMessage: message,
                        });
                        setTimeout(() => {
                            this.setState({ errorMessage: "" });
                        }, 3000);
                    }
                })
                .catch((error) => {
                    this.setState({
                        errorMessage: 'Something Went Wrong!'
                    }, () => {
                        setTimeout(() => {
                            this.setState({ errorMessage: "" })
                        }, 3000);   
                    });
                    console.log(error)
                });
        }
    };

    render() {
        const { allLanguage, t } = this.props;
        const { languages, newsletter, count } = this.state;
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        const newsletterLangObj = require(`../../public/locales/${language}/common.json`)

        const err_msg_box = {
            minWidth: "200px",
            width: "250px",
            display: "block",
            margin: "0 auto",
            color: "#ffffff",
        //     minWidth: "250px",
        // color: "#fff",
        transform: "translate(-50%,-50%)",
        backgroundColor: "rgb(17 175 41)",
        padding: "20px 20px",
        borderRadius: "5px"
        }
      
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

        return (
            <React.Fragment>
                <MetaDecorator 
                    title={"Newsletter | Knitter's Pride"} 
                    description={""} 
                    keywords={""} 
                    ogTitle={"Newsletter | Knitter's Pride"}
                    ogDescription={""}
                    ogImage={""}
                />
                <section className="inner-banner kp-mid_banner">
                    <Image src={"/images/newsletternanner.jpg"} style={{ "background-size": "cover" }} alt="Newsletter banner" />
                </section>
                {/* <div className="sm_modile_alert" style={card_center_msg}>
                {
                        this.state.successMessage !== ""
                        ?
                    <div className="animate__animated animate__fadeIn text-center" style={suc_msg_box} role="alert">
                        {this.state.successMessage}
                    </div>
                        :
                        null
                    }
                     {
                        this.state.errorMessage !== ""
                        ?
                    <div className="animate__animated animate__fadeIn text-center" style={err_msg_box} role="alert">
                        {this.state.errorMessage}
                    </div>
                        :
                        null
                    }
                </div> */}
                <section className="newsletter">
                    <div className="newsletterinnerwrapper">
                        <h3 className="text-center font-25">
                            {/* {t(`languages.KNITPRO_NEWSLETTER`)} */}
                            {newsletterLangObj.languages.KNITPRO_NEWSLETTER}
                            </h3>
                        <form className="letter-form">
                            <h4 className="font-18 title">
                                {/* {t(`languages.SIGN UP FOR UPDTAES`)} */}
                                {newsletterLangObj.languages["SIGN UP FOR UPDTAES"]}
                                </h4>
                            <p className="subtitle">
                                {/* {t(`languages.Get news from Knitpro in your inbox`)} */}
                                {newsletterLangObj.languages["Get news from Knitpro in your inbox"]}
                                </p>
                            <div className="form-group">
                                <label className="emailaddress">
                                    <span className="text-danger abbr-star">*</span>
                                    {/* {t(`languages.Your_Email_address`)} */}
                                    {newsletterLangObj.languages.Your_Email_address}
                                </label>
                                <input type="email" className="form-control rounded-0" id="email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label className="emailaddress">
                                    <span className="text-danger abbr-star">*</span>
                                    {/* {t(`languages.Select_your_preferred_language`)} */}
                                    {newsletterLangObj.languages.Select_your_preferred_language}
                                </label>
                                <Select value={this.state.language} onChange={this.handleChange} options={languages} placeholder="Select Language" />
                            </div>
                            <button className="btn btn-primary bg-blue w-100" onClick={(e) => this.submitNews(e)}>
                           {/* {t(`languages.Sign_Up`)} */}
                           {newsletterLangObj.languages.Sign_Up}
                            </button>
                            <div className="form-group text-center">
                                <span className="text-danger text-center">{this.state.errorMessage}</span>
                            </div>
                            <div className="form-group text-center">
                                <span className="text-success text-center">{this.state.successMessage}</span>
                            </div>
                        </form>
                        <div className="newsletter-grid mt-5">
                            <h3 className="text-center font-25">
                                {/* {t(`languages.PREVIOUS NEWSLETTER`)} */}
                                {newsletterLangObj.languages["PREVIOUS NEWSLETTER"]}
                                </h3>
                            <div className="productGrid position-static">
                                <div className="gridCol">
                                    {newsletter.length > 0 &&
                                        newsletter.map((ele, index) => {
                                            return(
                                            <div className="grid-item" key={index}>
                                                <a className="img-list d-block" href={ele.content.link} target="_blank" rel="noreferrer">
                                                    <Image src={ele.content.image} height={500} width={500} className="img-fluid" alt={imageNameToAltTag(ele.content.image)} />
                                                </a>

                                                <p className="mb-0 grid-title p-2">
                                                    <a href="#">{moment(ele.publishedOn).format("DD MMMM")}</a>
                                                </p>
                                            </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="pagination page-space">
                                <ul>
                                    {count > 5 ? (
                                        Array.from({ length: Math.ceil(count / 5) }).map((item, index) => (
                                            <li
                                                className=""
                                                id={"newsletter" + (index + 1)}
                                                key={index}
                                                onClick={() => this.getNewsletter(index + 1)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span>{index + 1}</span>
                                            </li>
                                        ))
                                    ) : count === 0 ? null : (
                                        <li className="" id={"newsletter" + 1} style={{ cursor: "pointer" }}>
                                            <span>{1}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Footer allLanguage={allLanguage} langObj={this.state.langObj} /> */}
            </React.Fragment>
        );
    }
}

// export default withRouter(withTranslation()(Newsletter));

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(Newsletter)