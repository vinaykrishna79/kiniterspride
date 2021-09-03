import React, { Component } from "react";
import Select from "react-select";
import Link from "next/link";
import { postAPI, getAPI } from "../utils/api";
// import { withTranslation } from "react-i18next";
import { withRouter } from "next/router";
import { getCurrentLocaleFromUrl } from "../utils/helperFunctions";
import ScrollButton from "./ScrollButton";

class Footer extends Component {
  state = {
    languages: [],
    email: "",
    language: {},
    errorMessage: "",
    message: "",
    xmlData: {},
    allLanguage: [],
    lang_i: "",
  };

  // static async getInitialProps(ctx) {
  //   const res = await fetch('https://api.knitpro.eu/category/categories/en')
  //   const json = await res.json()
  //   // console.log(json);
  //   return { category: json }
  // }

  componentDidMount() {
    this.getLanguages();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.router.asPath !== this.props.router.asPath){
        this.getLanguages()
    }
  }

  getLanguages() {
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
            // let ids = this.props.match.params;
            // if (ids) {
            //   let currentLang = ids.lang;
            //   if (currentLang) {
            //     if (this.state.languages.length > 0) {
            //       let langFilter = this.state.languages.filter(
            //         (short) => short.value === currentLang
            //       );
            //       if (langFilter.length > 0) {
            //         this.setState({ language: langFilter[0] });
            //       }
            //     }
            //   }
            // }
          });
        });
      })
      .catch((err) => console.log("Header lang error: ", err));
  }

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
      postAPI("newsletter/subscribe", {
        email: email,
        language: language.value,
      })
        .then((res) => {
          let { data, message, status } = res.data;
          if (status === 1) {
            this.setState({
              email: "",
              language: "",
            });
            this.setState({
              message: message,
            });
            setTimeout(() => {
              this.setState({ message: "" });
            }, 3000);
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
          console.log(error)
          this.setState({
            errorMessage: "something went wrong",
          });
          setTimeout(() => {
            this.setState({ errorMessage: "" });
          }, 3000);
        });
    }
  };

  render() {
    const { languages } = this.state;
    // const { t } = this.props;
    // const { language } = this.props.i18n;
    const r = this.props.router;
    const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    const footerLangObj = require(`../public/locales/${language}/common.json`)
    // console.log("footer  ", this.props);
    return (
      <div className="footer-container">
        <footer className="">
          <div className="container">
            <div className="pl-md-3 pr-md-3">
              <div className="row">
                <div
                  className="col-12 col-md-3 wow fadeInUp"
                  style={{ animationDuration: "2s" }}
                >
                  <h6>
                    {/* {t(`languages.HELP`)} */}
                    {footerLangObj.languages.HELP}
                    </h6>
                  <ul>
                    <li>
                      <Link
                        // to={`/contact/${
                        //   this.props.i18n.language.split("-")[0]
                        // }`}
                        href={`/contact`}
                        as={`/contact/${language}`}
                      >
                        {/* {t(`languages.Contact_Us`)} */}
                        {footerLangObj.languages.Contact_Us}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={`/distributors/${
                        //   this.props.i18n.language.split("-")[0]
                        // }`}
                        href={`/find-our-stores`}
                        as={`/find-our-stores/${language}`}
                      >
                        {/* {t(`languages.Distributors`)} */}
                        {footerLangObj.languages.Find_our_store}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={`/replacementpolicy/${
                        //   this.props.i18n.language.split("-")[0]
                        // }`}
                        href={`/replacementpolicy`}
                        as={`/replacementpolicy/${language}`}
                      >
                        {/* {t(`languages.ProductReplacement`)} */}
                        {footerLangObj.languages.ProductReplacement}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={`/faq/${this.props.i18n.language.split("-")[0]}`}
                        href={`/faq`}
                        as={`/faq/${language}`}
                      >
                        {/* {t(`languages.FAQs`)} */}
                        {footerLangObj.languages.FAQs}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={`/privacy-policy/${
                        //   this.props.i18n.language.split("-")[0]
                        // }`}
                        href={`/privacy-policy`}
                        as={`/privacy-policy/${language}`}              
                      >
                        {/* {t(`languages.PrivacyPolicy`)} */}
                        {footerLangObj.languages.PrivacyPolicy}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={`/terms/${this.props.i18n.language.split("-")[0]}`}
                        href={`/terms`}
                        as={`/terms/${language}`}
                      >
                        {/* {t(`languages.Terms_and_Conditions`)} */}
                        {footerLangObj.languages.Terms_and_Conditions}
                      </Link>
                    </li>
                    { language === "en" 
                      ?
                      <li>
                        <a href={`/sitemap`}>
                            {/* {t(`languages.Sitemap`)} */}
                            {footerLangObj.languages.Sitemap}
                            </a>
                      </li>
                      :
                      ""
                    }
                    {/* <li><a href={Baseurl+"sitemap.xml"} target="_blank">{t(`languages.Sitemap`)}</a></li> */}
                  </ul>
                </div>
                <div
                  className="col-12 col-md-3 wow fadeInUp"
                  style={{ animationDuration: "3s" }}
                >
                  <h6>
                    {/* {t(`languages.MEDIA`)} */}
                    {footerLangObj.languages.MEDIA}
                    </h6>
                  <ul>
                    <li>
                      <Link
                        // to={`/newsletter/${
                        //   this.props.i18n.language.split("-")[0]
                        // }`}
                        href={`/newsletter`}
                        as={`/newsletter/${language}`}
                      >
                        {/* {t(`languages.newsletter`)} */}
                        {footerLangObj.languages.newsletter}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={`/blog/${this.props.i18n.language.split("-")[0]}`}
                        href={`/blog`}
                        as={`/blog/${language}`}
                      >
                        {/* {t(`languages.Blog`)} */}
                        {footerLangObj.languages.Blog}
                      </Link>
                    </li>
                    <li>
                      <a
                        href={`https://www.facebook.com/KnittersPride/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.instagram.com/knitterspride/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.ravelry.com/groups/knitters-pride`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ravelry
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://www.youtube.com/user/Knitterspride`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Youtube
                      </a>
                    </li>
                    {/* <li><Link to="/media&press">Media & Press</Link></li> */}
                    {/* <li><Link to="/set-by-type-Singlepoint-Needles">Sets</Link></li>
                                        <li><Link to="/bags">Bags</Link></li>
                                        <li><Link to="/all-accessories">All Accessories</Link></li> */}
                  </ul>
                </div>
                <div
                  className="col-12 col-md-3 wow fadeInUp"
                  style={{ animationDuration: "4s" }}
                >
                  <h6>
                    {/* {t(`languages.Resources`)} */}
                    {footerLangObj.languages.Resources}
                  </h6>
                  <ul>
                    <li>
                      <Link
                        // to={`/product-catalogue/${
                        //   this.props.i18n.language.split("-")[0]
                        // }`}
                        href={`/product-catalog`}
                        as={`/product-catalog/${language}`}
                      >
                        {/* {t(`languages.Catalogue`)} */}
                        {footerLangObj.languages.Catalogue}
                      </Link>
                    </li>
                    {/* <li>
                                            <Link to={`/resources/${this.props.i18n.language.split("-")[0]}`}>{t(`languages.Resources`)}</Link>
                                        </li> */}
                    <li>
                      <Link
                        // to={{
                        //   pathname: `/resources/${
                        //     this.props.i18n.language.split("-")[0]
                        //   }`,
                        // //   state: { resorceId: t(`languages.Product_Images`) },
                        // }}
                        href={{
                          pathname: `/resources`,
                          // query: { resorceId: t(`languages.Product_Images`) },
                          query: { resorceId: footerLangObj.languages.Product_Images}
                        }}
                        as={`/resources/${language}`}
                      >
                        {/* {t(`languages.Product_Images`)} */}
                        {footerLangObj.languages.Product_Images}
                      </Link>
                    </li>
                    <li>
                      <Link
                        // to={{
                        //   pathname: `/resources/${
                        //     this.props.i18n.language.split("-")[0]
                        //   }`,
                        // //   state: { resorceId: t(`languages.Product_Video`) },Product_Video
                        // }}
                        // href={`/resources/${language}`}
                        href={{
                          pathname: `/resources`,
                          // query: { resorceId: t(`languages.Product_Video`) },
                          query: { resorceId: footerLangObj.languages.Product_Video}
                        }}
                        as={`/resources/${language}`}
                      >
                        {/* {t(`languages.Product_Video`)} */}
                        {footerLangObj.languages.Product_Video}
                      </Link>
                    </li>
                    {/* <li><Link to="/media&press">Media &amp; press</Link></li>
                                        <li><Link to="/faq">Media &amp; Faq's</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>
                                        <li><Link to="/store-locator">Store Locator</Link></li>
                                        <li><a href="#">Login</a></li> 
                                        <li><Link to="/blog">Blog</Link></li> */}
                  </ul>
                </div>
                <div
                  className="col-12 col-md-3 wow fadeInUp"
                  style={{ animationDuration: "4s" }}
                >
                  <h6> 
                    {/* {t(`languages.Join_Our_Newsletter`)} */}
                    {footerLangObj.languages.Join_Our_Newsletter}
                    </h6>
                  <form>
                    <div className="form-group">
                      <label
                        className="emailaddress"
                        htmlFor="exampleInputEmail1"
                      >
                        {/* {t(`languages.Your_Email_address`)} */}
                        {footerLangObj.languages.Your_Email_address}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <label
                        className="emailaddress"
                        htmlFor="exampleInputEmail1"
                      >
                        {/* {t(`languages.Select_your_preferred_language`)} */}
                        {footerLangObj.languages.Select_your_preferred_language}
                      </label>
                      <Select
                        value={this.state.language}
                        onChange={this.handleChange}
                        options={languages}
                        // isDisabled={brandLoading}
                        // isLoading={brandLoading}
                        placeholder="Select Language"
                        className="selct-language"
                      />
                      {/* <input type="submit" className="form-control" onClick={(e) => this.submitNews(e)} /> */}
                      <button
                        className="form-control submit_btn "
                        onClick={(e) => this.submitNews(e)}
                      >
                        {/* {t(`languages.Submit`)} */}
                        {footerLangObj.languages.Submit}
                      </button>
                      <span className="text-danger position-absolute">
                        {this.state.errorMessage}
                      </span>
                      <span className="text-success position-absolute">
                        {this.state.message}
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="bottom fadeInUp"
              style={{ animationDuration: "2s" }}
            >
              <p className="mob-center">
                {/* {t(`languages.Follow_our_community`)} */}
                {footerLangObj.languages.Follow_our_community}
              </p>
              <ul className="social-icons">
                <li className="facebook">
                  <a
                    href="https://www.facebook.com/KnittersPride/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li className="instagram">
                  <a
                    href="https://www.instagram.com/knitterspride/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                {/* <li>
                                    <a href="#" target="_blank"><i className="fab fa-twitter" /></a>
                                </li> */}
                <li className="ravelry">
                  <a
                    href="https://www.ravelry.com/groups/knitters-pride"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-ravelry" />
                  </a>
                </li>
                <li className="youtube">
                  <a
                    href="https://www.youtube.com/user/Knitterspride"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-youtube" />
                  </a>
                </li>
                <li className="blogspot">
                  <a
                    href={`/blog`}
                    as={`/blog/${language}`}
                    target=""
                    rel="noreferrer"
                    passHref={true}
                  >
                    <i className="far fa-edit"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <p
                  className="text-sm-left text-center mb-0"
                  style={{ fontSize: "14px" }}
                  hidden
                >
                  {/* {t(`languages.Also_see`)} */}
                  {footerLangObj.languages.Also_see}
                  :
                  {" "}
                  <a
                    style={{
                      fontSize: "14px",
                      textDecoration: "none",
                      color: "#000",
                    }}
                    href="https://www.knitterspride.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.knitterspride.com
                  </a>
                </p>
              </div>
              <div className="col-sm-6">
                <p
                  className="text-sm-right text-center"
                  style={{ fontSize: "14px" }}
                >
                  {"Knitter's Pride © Copyright 2011 - 2021."}{" "}
                  {/* {t(`languages.All_rights_reserved`)}. */}
                  {footerLangObj.languages.All_rights_reserved}.
                </p>
              </div>
            </div>
          </div>
        </footer>
        <ScrollButton />
      </div>
    );
  }
}

// export default withRouter(withTranslation()(Footer));

// export async function getStaticProps ({ locale }) {
//   return {
//       props: {
//         ...await serverSideTranslations(locale, ['common']),
//       },
//     }
// }

export default withRouter(Footer)