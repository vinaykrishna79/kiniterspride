import React, { Component } from "react";
import { postAPI, getAPI } from "../../utils/api";
// import Footer from "../Footer/Footer";
// import { withTranslation } from "react-i18next";
import { withRouter } from "next/router";
import MetaDecorator from "../../utils/MetaDecorator";
import Recaptcha from 'react-recaptcha';
import Image from "../../component/custom-image";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../../utils/helperFunctions";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


class StoreLocator extends Component {
    state = {
        Payload: {
            name: "",
            email: "",
            message: "",
            query: "",
            country: ""
        },
        langObj: {},
        errorMessage: "",
        successMessage: "",
        isVerfiy: false,
        verifyMessage: "",
        validateMessageField: "",
        countries: []
    };

    componentDidMount() {
        // window.scrollTo(0, 0);
        // let lang = this.props.i18n.langauge
        // let langus = localStorage.getItem("languages")
        // if(langus && !langus.includes(lang)){
        //     this.props.history.push("/NotFound")
        // }
        this.getCountries()
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath)
        const contactLangObj = require(`../../public/locales/${language}/common.json`)
        this.setState({
            Payload: {
                ...this.state.Payload,
                query: contactLangObj.languages.General_Enquiry,
            },
        })
        // this.staticMultilingual(this.props.language)
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split("-")[0] !== prevProps.language && prevProps.language !== "") {
    //         // this.staticMultilingual(this.props.language)
    //         let oldroute = this.props.location.pathname;
    //         let oldrouteSplit = oldroute.split("/");
    //         oldrouteSplit.splice(oldrouteSplit.length - 1, 1, this.props.i18n.language.split("-")[0]);
    //         let newroute = oldrouteSplit.join("/");
    //         this.props.history.push(newroute);
    //     }
    // }


    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            Payload: {
                ...this.state.Payload,
                [name]: value,
            },
        });
    };

    getCountries = () => {
        getAPI("review/countries")
          .then((res) => {
            // console.log(res);
            let { data, status } = res.data;
            if (status === 1) {
              let countries = data.map((ele) => {
                return { value: ele.name, label: ele.name };
              });
              this.setState({ countries: countries });
            }
          })
          .catch((error) => console.log(error));
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        const contactLangObj = require(`../../public/locales/${language}/common.json`)
        let { name, email, message, query } = this.state.Payload
        if(name !== "" && email !== "" && message !== "" && query !== ""){
            if(this.state.isVerfiy){
                postAPI("contact/contact", this.state.Payload)
                    .then((res) => {
                        for (const key in this.state.Payload) {
                            this.setState({
                                Payload: {
                                    ...this.state.Payload,
                                    [key]: "",
                                },
                            });
                        }
                        this.setState({
                            // successMessage: `${this.props.t(`languages.Successfully submitted`)}`,
                            successMessage: contactLangObj.languages["Successfully submitted"]
                        }, () => {
                            setTimeout(() => {
                                this.setState({ successMessage: "" })
                            }, 3000);   
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            errorMessage: "Something Went Wrong!"
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    errorMessage: ""
                                })
                            }, 3000)
                        })
                    });
            }else{
                this.setState({
                    verifyMessage: "Verify you are a human!"
                })
            }
        }else{
            this.setState({
                validateMessageField: "Required field"
            })
        }
    };

    captchaLoad = () => {
        // console.log("captcha loadeddddddddddddddddddd!");
      }

      verify = (response) => {
        if(response){
          this.setState({
            isVerfiy: true,
            verifyMessage: ""
          })
        }
      }

    render() {
        let { langObj, Payload } = this.state;
        // const { t } = this.props;
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        const contactLangObj = require(`../../public/locales/${language}/common.json`)
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
                    title={"Contact Us | Knitter's Pride"} 
                    description={"If you need help or have any questions about our products, please don’t hesitate to get in touch"} 
                    keywords={""} 
                    ogTitle="Contact Us | Knitter's Pride"
                    ogDescription="If you need help or have any questions about our products, please don’t hesitate to get in touch"
                    ogImage=""/>
                <div className="sets-container">
                    {/* Main Section End */}
                    {/* <div className="sm_modile_alert" style={card_center_msg}>
                        {
                            this.state.errorMessage !== ""
                                ?
                                <div className="animate__animated animate__fadeIn text-center" style={err_msg_box} role="alert">
                                    {this.state.errorMessage}
                                </div>
                                :
                                null
                        }
                        {
                            this.state.successMessage !== ""
                                ?
                                <div className="animate__animated animate__fadeIn text-center" style={suc_msg_box} role="alert">
                                    {this.state.successMessage}
                                </div>
                                :
                                null
                        }
                    </div> */}

                    <section className="inner-banner kp-mid_banner">
                        <Image src={"/images/contactbanner.png"} alt="Contact us banner" />
                    </section>
                    <section id="contactusmain">
                        <div className="contactinnerwrap">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <h2>
                                        {/* {t(`languages.Having_trouble_finding_what_youre_looking_for`)}? ? */}
                                        {contactLangObj.languages.Having_trouble_finding_what_youre_looking_for}? ?
                                        </h2>
                                    <p>
                                        {/* {t(`languages.need_help`)} */}
                                        {contactLangObj.languages.need_help}
                                        </p>
                                </div>
                                <div className="col-sm-12 col-md-5" style={{ display: "flex", "align-items": "center", "justify-content": "center" }}>
                                    <div className="contactmail">
                                        <Image src={"/images/emailicon.png"} alt="email icon" noSkeleton={true} />
                                        <p className="mob-mb-0">
                                            {/* {t(`languages.Please_write_us_at`)} */}
                                            {contactLangObj.languages.Please_write_us_at}
                                            </p>
                                        <span>
                                            <a href="mailto:sales@knitpro.eu">support@knitterspride.com</a>
                                        </span>
                                    </div>
                                    {/* <div className="contactmail">
                                        <img src={require('../../Assets/img/loactionicon.png')} />
                                        <p>{t(`languages.Find_Us`)}</p>
                                        <span><a href="/distributors">{t(`languages.Our_Distributor`)}</a> 
                                        </span>
                                    </div> */}
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="contactformmsin">
                                        <form>
                                            <label>
                                                {/* {t(`languages.Nature_of_Enquiry`)} */}
                                                {contactLangObj.languages.Nature_of_Enquiry}
                                                </label>
                                            <select style={{marginBottom: 0}} name="query" value={Payload.query} onChange={this.handleChange}>
                                                <option>
                                                    {/* {t(`languages.General_Enquiry`)} */}
                                                    {contactLangObj.languages.General_Enquiry}
                                                    </option>
                                                <option>
                                                    {/* {t(`languages.Product_Feedback`)} */}
                                                    {contactLangObj.languages.Product_Feedback}
                                                    </option>
                                                <option>
                                                    {/* {t(`languages.Product_Complaint`)} */}
                                                    {contactLangObj.languages.Product_Complaint}
                                                    </option>
                                                <option>
                                                    {/* {t(`languages.Retail_Distributor_Enquiry`)} */}
                                                    {contactLangObj.languages.Retail_Distributor_Enquiry}
                                                    </option>
                                                <option>
                                                    {/* {t(`languages.Others`)} */}
                                                    {contactLangObj.languages.Others}
                                                    </option>
                                            </select>
                                            <div style={{marginBottom: "19px"}}>
                                            {
                                                this.state.Payload.query === ""
                                                ?
                                                <span className="text-danger">{this.state.validateMessageField}</span>
                                                :
                                               null
                                            }
                                            </div>
                                            <label>
                                                {/* {t(`languages.Name`)} */}
                                                {contactLangObj.languages.Name}
                                                </label>
                                            <input style={{marginBottom: 0}} type="text" name="name" value={Payload.name} onChange={this.handleChange} />
                                            <div style={{marginBottom: "19px"}}>
                                            {
                                                this.state.Payload.name === ""
                                                ?
                                                <span className="text-danger">{this.state.validateMessageField}</span>
                                                :
                                                null
                                            }
                                            </div>
                                            <label>
                                                {/* {t(`languages.Email_Id`)} */}
                                                {contactLangObj.languages.Email_Id}
                                                </label>
                                            <input style={{marginBottom: 0}} type="text" name="email" value={Payload.email} onChange={this.handleChange} />
                                            <div style={{marginBottom: "19px"}}>
                                            {
                                                this.state.Payload.email === ""
                                                ?
                                                <span className="text-danger">{this.state.validateMessageField}</span>
                                                :
                                                null
                                            }
                                            </div>
                                            <label>
                                                {/* {t(`languages.Country`)} */}
                                                {contactLangObj.languages.Country}
                                                </label>
                                            <select style={{marginBottom: 0}} name="country" onChange={this.handleChange}>
                                                {
                                                    this.state.countries.map((ele, index) => {
                                                        return (
                                                            <option key={`${index}`} value={ele.value}>{ele.label}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div style={{marginBottom: "19px"}}>
                                            {
                                                this.state.Payload.email === ""
                                                ?
                                                <span className="text-danger">{this.state.validateMessageField}</span>
                                                :
                                                null
                                            }
                                            </div>
                                            <label>
                                                {/* {t(`languages.Message`)} */}
                                                {contactLangObj.languages.Message}
                                                </label>
                                            <input style={{marginBottom: 0}} type="text" name="message" value={Payload.message} onChange={this.handleChange} />
                                            <div style={{marginBottom: "19px"}}>
                                            {
                                                this.state.Payload.message === ""
                                                ?
                                                <span className="text-danger">{this.state.validateMessageField}</span>
                                                :
                                                null
                                            }
                                            </div>
                                            <label>
                                                {/* {t(`languages.Enter_captcha_code`)} */}
                                                {contactLangObj.languages.Enter_captcha_code}
                                                </label>
                                            <Recaptcha
                                                sitekey={process.env.React_App_site_key}
                                                render="explicit"
                                                onloadCallback={this.captchaLoad}
                                                verifyCallback={this.verify}
                                            />
                                            <span className="text-danger position-absolute">{this.state.verifyMessage}</span>
                                            {/* <img src={require("../../Assets/img/caption.png")} /> */}
                                            {/* <input type name style={{ width: "67px", padding: "10px 0px" }} /> */}
                                            <button onClick={this.handleSubmit} className="text-upper">
                                                {/* {t(`languages.Submit`)}{" "} */}
                                                {contactLangObj.languages.Submit}{" "}
                                            </button>
                                            {/* <div className="text-center position-relative"> */}
                                            <span className="text-danger">{this.state.errorMessage}</span>
                                            <span className="text-success">{this.state.successMessage}</span>
                                            {/* </div> */}
                                        </form>
                                    </div>
                                </div>
                                <div className="connectwithus">
                                    <h3>
                                        {/* {t(`languages.CONNECT_WITH_US`)} */}
                                        {contactLangObj.languages.CONNECT_WITH_US}
                                        </h3>
                                    <span>
                                        <a href="https://www.facebook.com/KnittersPride/" target="_blank" rel="noreferrer">
                                            <Image src={"/images/socialicon1.png"} alt="Facebook" noSkeleton={true} />
                                        </a>
                                        <a href="https://www.instagram.com/knitterspride/" target="_blank" rel="noreferrer">
                                            <Image src={"/images/socialicon2.png"} alt="Instagram" noSkeleton={true} />
                                        </a>
                                        <a href="https://www.ravelry.com/groups/knitters-pride" target="_blank" rel="noreferrer">
                                            <Image src={"/images/socialicon5.png"} alt="Ravelry" noSkeleton={true}/>
                                        </a>
                                        <a href="https://www.youtube.com/user/Knitterspride" target="_blank" rel="noreferrer">
                                            <Image src={"/images/socialicon3.png"} alt="Youtube" noSkeleton={true}/>
                                        </a>
                                        {/* <a href="#"><img src={require('../../Assets/img/socialicon4.png')} /></a> */}

                                        <a href={`/blog/${'en'}`} target="_blank" rel="noreferrer">
                                            <Image src={"/images/socialicon6.png"} alt="Blog | Knitter's Pride" noSkeleton={true} />
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Section End */}
                </div>
                {/* <Footer allLanguage={this.props.allLanguage} language={this.props.language} /> */}
            </React.Fragment>
        );
    }
}

// export default withRouter(withTranslation()(StoreLocator));

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(StoreLocator)