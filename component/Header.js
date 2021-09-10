
import Link from 'next/link'
import { getAPI } from "../utils/api";
import { storageUrl } from "../utils/BaseUrl";
// import Head from "next/head";
import Image from './custom-image'

// import { useRouter } from 'next/router'

// import { withTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { getAPI } from "../utils/api";
import { withRouter } from "next/router";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from '../utils/helperFunctions';
// import axios from 'axios';
// import { storageUrl } from "../utils/BaseUrl";
// import { withTranslation } from "react-i18next";
// import i18n from "../../i18n";




class Header extends Component {
    state = {
        allLanguage: [],
        category: [],
        searchInputtext: "",
        foundProduct: [],
        langObj: {},
        langrouteuid: "",
        scrollBool:false,
        langauge: ""
    };

    // static async getInitialProps(ctx) {
    //     const res = await fetch('https://api.knitpro.eu/category/categories/en')
    //     const json = await res.json()
    //     console.log(json);
    //     return { category: json }
    //   }

    async componentDidMount() {
        // console.log(this.props);
        // const { i18n } = this.props
        // this.setState({ langauge: i18n.language }, () => this.getLanguages(this.state.langauge))
        // let route = this.props.location.pathname;
        // let splitroute = route.split("/");
        // let split_route;
        // if(splitroute[splitroute.length-1] === "") {
        //     let ind = splitroute.indexOf("", 1)
        //     split_route = splitroute.slice(0, ind).join("/");
        //     this.props.history.push(split_route);
        // }
        // this.getLanguages(router)
        // this.getCategories();
       this.getDataForTheComponent()
    }

    getDataForTheComponent = () => {
        const r = this.props.router;
        this.setState(
            { language: getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale) 
        }, () => this.getLanguages(this.state.language))
    }

    getCategories = (language) => {
        let langu = this.state.allLanguage.map((ele) => ele.shortName)
        localStorage.setItem("languages", langu)
        let lang_i;
        // let lang_iSplit = this.props.location.pathname.split("/");
        
        // if (lang_iSplit.length > 2) {
        //     lang_i = lang_iSplit[lang_iSplit.length - 1];
        //     if (!lang_i && lang_i !== "") {
        //         lang_i = this.props.i18n.language.split("-")[0];
        //     }
        //     // else if(lang_iSplit[lang_iSplit.length - 2]){
        //     //     lang_i = lang_iSplit[lang_iSplit.length - 2]
        //     // }
        // } else {
        //     lang_i = this.props.i18n.language.split("-")[0];
        // }
        // if(langu.includes(lang_i)){
        //     i18n.changeLanguage(lang_i);
        // }else{
        //     i18n.changeLanguage('en');
        // }
        const url = "category/categories/"+language;
        getAPI(url).then((res) => {
           
            const { status, data } = res.data;
            if (status === 1) {
               
                this.setState({ category: data });
            } else {
                this.setState({
                    category: [],
                });
            }
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.router.asPath !== this.props.router.asPath){
            this.getDataForTheComponent()
        }
        // if (this.props.i18n?.language?.split("-")[0] !== prevState.language && prevState.language !== "") {
        //     this.setState({ language: this.props.i18n.language.split("-")[0] });
        //     // this.getLanguages();
        //     // this.getCategories()
        //     const url = "category/categories/" + this.props.i18n.language.split("-")[0];
        //     getAPI(url).then((res) => {
        //         const { status, data } = res.data;
        //         if (status === 1) {
        //             this.setState({ category: data });
        //             // i18n.changeLanguage(this.props.language)
        //         } else {
        //             this.setState({
        //                 category: [],
        //             });
        //         }
        //     });
        //     // this.changeroutebylang();
        // }
    }

    changeroutebylang = () => {
        let lang = this.props.i18n.language.split("-")[0];
        let route = this.props.location.pathname;
        let splitroute = route.split("/");
        if(splitroute[splitroute.length-1] === "") {
            splitroute = splitroute.splice(splitroute.length-1, 1).join('/');
        }
        if (splitroute.length > 2) {
            if (splitroute[1] === "a") {
                let ids = {
                    pagetype: splitroute[1],
                    subcateg: splitroute[2].split("-")[0],
                    categ: splitroute[2].split("-").length > 1 ? splitroute[2].split("-")[1] : "needles",
                    lang: lang,
                };
                if (ids.pagetype === "a") {
                    this.props.connectHeaderGinger("brand", ids.categ, ids.subcateg, ids.lang);
                }
                splitroute.splice(splitroute.length - 1, 1, lang);
                let newroute = splitroute.join("/");
                this.props.history.push(newroute);
            } else if (splitroute[1] === "b") {
                let ids = {
                    pagetype: splitroute[1],
                    subcateg: splitroute[2],
                    categ: null,
                    lang: lang,
                };
                if (ids.pagetype === "b") {
                    this.props.connectHeaderGinger("type", ids.categ, ids.subcateg, ids.lang);
                }
                splitroute.splice(splitroute.length - 1, 1, lang);
                let newroute = splitroute.join("/");
                this.props.history.push(newroute);
            } else if (splitroute[1] === "c") {
                let ids = {
                    pagetype: splitroute[1],
                    subcateg: splitroute[2].split("-")[0],
                    categ: splitroute[2].split("-")[1],
                    lang: lang,
                };
                if (ids.pagetype === "c") {
                    this.props.connectHeaderGinger("material", ids.categ, ids.subcateg, ids.lang);
                }
                splitroute.splice(splitroute.length - 1, 1, lang);
                let newroute = splitroute.join("/");
                this.props.history.push(newroute);
            }
        }
    };

    getLanguages = (language) => {
        getAPI(`language/language?lang=en`)
            .then((res) => {
                this.setState({ allLanguage: res.data.data }, () => {
                    this.getCategories(language);
                    
                });
            })
            .catch((err) => console.log("Header lang error: ", err));
    };

    searchInput = (e) => {
        // let { language } = this.props.i18n
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        this.setState(
            {
                searchInputtext: e.target.value,
            },
            () => {
                let { searchInputtext } = this.state;
                // if (typeof cancelToken != typeof undefined) {
                //     cancelToken.cancel("Operation canceled due to new request.")
                //   }
                  //Save the cancel token for the current request
                //   cancelToken = axios.CancelToken.source()
                if (searchInputtext.length >= 0) {
                    getAPI(`product/search?search=${this.state.searchInputtext}&lang=${language}`/*, { cancelToken: cancelToken.token }*/ )
                        .then((res) => {
                            // console.log(res);
                            let { data, status } = res.data;
                            if (status === 1) {
                                this.setState({ foundProduct: data });
                            } else if (status === 0) {
                                this.setState({ foundProduct: data });
                            }
                        })
                        .catch((error) => console.log(error));
                }else{
                    this.setState({ foundProduct: [] });
                }
            }
        );
    };

    serchResult = (found) => {
        // this.props.getFoundResult(found._source);
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        if (found._source.brand) {
            this.props.router.push(`/d/${found._source.brand.slug}/${found._source.slug}/${language}`);
        } else if (found._source.productType) {
            this.props.router.push(`/e/${found._source.productType.slug}/${found._source.slug}/${language}`);
        }
        document.getElementById("closesearch").click();
    };

    searchOpen = () => {
        let searchOpenClass = document.getElementById("searchopen").className;
        let overdivClass = document.getElementById("overdiv").className;
        document.getElementById("searchopen").className = searchOpenClass + " seachshow";
        document.getElementById("overdiv").className = overdivClass + " overdivshow";
        document.body.classList.add("no-hidden");
    };

    searchClose = () => {
        this.setState({ foundProduct: [], searchInputtext: "" });
        let searchOpenClass = document.getElementById("searchopen");
        let overdivClass = document.getElementById("overdiv");
        searchOpenClass.classList.remove("seachshow");
        overdivClass.classList.remove("overdivshow");
        document.body.classList.remove("no-hidden");
    };

    modalClose = () => {
        document.getElementById("mo").click()
    }


    render() {
        // const { t } = this.props;
        const { category, foundProduct } = this.state;
        const r = this.props.router;
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        const headerLangObj = require(`../public/locales/${language}/common.json`)
        // const { language } = this.props.i18n
        return (
            <React.Fragment>
                {/* <Head>
                    <title>hsgdfhsgkjdfhjksd</title>
                    <meta name="description" content="qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"/>
                </Head> */}
                <div className="mobilenavover">
                    <div className="mobilenavclose" id="navbarclose">
                        <i className="fa fa-times" aria-hidden="true" />
                    </div>
                    <section id="searchmain">
                        {/* <div className="container">
              <div className="searchmain">
                <form>
                  <input type="text" name='search' value={this.state.searchInputtext} placeholder="Search..." onChange={this.searchInput} />
                </form>
              </div>
            </div> */}
                        <section className="nav-wrap">
                            <nav className="acnav" role="navigation">
                                <ul className="acnav__list acnav__list--level1">
                                    {category.map((item, idx) => (
                                        <li className="has-children" key={idx}>
                                            <div className="acnav__label text-uppercase">{item.name}</div>
                                            {/* start level 2 */}
                                            {item.brands.length === 0 && item.types.length === 0 && item.materials.length === 0 ? null : item.brands
                                                  .length === 0 ||
                                              item.types.length === 0 ||
                                              item.materials.length === 0 ? (
                                                <ul className="acnav__list acnav__list--level2">
                                                    {item.types.length > 0
                                                        ? item.types.map((type, index) => (
                                                              <li
                                                                  key={index}
                                                                //   onClick={() => this.props.connectHeaderGinger("type", null, type.slug, language)}
                                                              >
                                                                  <Link
                                                                    //   to={{
                                                                    //       pathname: `/b/${type.slug}/${language}`,
                                                                    //   }}
                                                                    href={`/b/${type.slug}`}
                                                                    as={`/b/${type.slug}/${language}`}
                                                                      
                                                                  >
                                                                      <a className="acnav__link acnav__link--level2 ">{type.name}</a>
                                                                  </Link>
                                                              </li>
                                                          ))
                                                        : null}
                                                </ul>
                                            ) : (
                                                <ul className="acnav__list acnav__list--level2">
                                                    <li className="has-children">
                                                        <div className="acnav__label acnav__label--level2">
                                                            {/* {t(`languages.ByBrands`)} */}
                                                            {headerLangObj.languages.ByBrands}
                                                            </div>
                                                  
                                                        <ul className="acnav__list acnav__list--level3">
                                                            {item.brands.map((brand, indx) =>
                                                                (item.name).trim() === "Needles" || (item.name).trim() === "Stricken" || (item.name).trim() === "Aguja" || (item.name).trim() === "针头" || (item.name).trim() === "Спица-ne"
                                                                ? (
                                                                    <li
                                                                        key={indx}
                                                                        // onClick={() =>
                                                                        //     this.props.connectHeaderGinger("brand", item.slug, brand.slug, language)
                                                                        // }
                                                                    >
                                                                        <Link
                                                                            // to={{
                                                                            //     pathname: `/a/${brand.slug}/${language}`,
                                                                            // }}
                                                                            // href={`/a/${brand.slug}`}
                                                                            // as={`/a/${brand.slug}/${language}`}
                                                                            href={`/a/${brand.slug}/${language}`}
                                                                            
                                                                        >
                                                                            <a className="acnav__link acnav__link--level3">{brand.name}</a>
                                                                        </Link>
                                                                    </li>
                                                                ) : (
                                                                    <li
                                                                        key={indx}
                                                                        // onClick={() =>
                                                                        //     this.props.connectHeaderGinger("brand", item.slug, brand.slug, language)
                                                                        // }
                                                                    >
                                                                        <Link
                                                                            // to={{
                                                                            //     pathname: `/a/${brand.slug}-${item.slug}/${language}`,
                                                                            // }}
                                                                            href={`/a/${brand.slug}-${item.slug}`}
                                                                            as={`/a/${brand.slug}-${item.slug}/${language}`}
                                                                            
                                                                        >
                                                                            <a className="acnav__link acnav__link--level3">{brand.name}</a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </li>
                                                    <li className="has-children">
                                                        <div className="acnav__label acnav__label--level2">
                                                            {/* {t(`languages.ByType`)} */}
                                                            {headerLangObj.languages.ByType}
                                                            </div>
                                            
                                                        <ul className="acnav__list acnav__list--level3">
                                                            {item.types.map((type, indx) => (
                                                                <li
                                                                    key={indx}
                                                                    // onClick={() =>
                                                                    //     this.props.connectHeaderGinger("type", item.slug, type.slug, language)
                                                                    // }
                                                                >
                                                                    <Link
                                                                        // to={{
                                                                        //     pathname: `/b/${type.slug}/${language}`,
                                                                        // }}
                                                                        href={`/b/${type.slug}`}
                                                                        as={`/b/${type.slug}/${language}`}
                                                                        
                                                                    >
                                                                        <a className="acnav__link acnav__link--level3">{type.name}</a>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                    <li className="has-children">
                                                        <div className="acnav__label acnav__label--level2">
                                                            {/* {t(`languages.ByMaterials`)} */}
                                                            {headerLangObj.languages.ByMaterials}
                                                            </div>
                                                   
                                                        <ul className="acnav__list acnav__list--level3">
                                                            {item.materials.map((material, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    // onClick={() =>
                                                                    //     this.props.connectHeaderGinger("material", item.slug, material.slug, language)
                                                                    // }
                                                                >
                                                                    <Link
                                                                        // to={{
                                                                        //     pathname: `/c/${material.slug}-${item.slug}/${language}`,
                                                                        // }}
                                                                        href={`/c/${material.slug}-${item.slug}`}
                                                                        as={`/c/${material.slug}-${item.slug}/${language}`}
                                                                        
                                                                    >
                                                                        <a className="acnav__link acnav__link--level3">{material.name}</a>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <ul className="acnav__list acnav__list--level1 hover-show">
                                    <li className="has-children">
                                        <div className="acnav__label">
                                            {/* {t(`languages.ourstory`)} */}
                                            {headerLangObj.languages.ourstory}
                                            </div>

                                        <ul className="acnav__list acnav__list--level2">
                                            <li>
                                                <Link
                                                    
                                                    // to={`/about-us/${this.props.language}`}
                                                    href={`/about-us`}
                                                    as={`/about-us/${language}`}
                                                    onClick={() => {
                                                        document.getElementById("navbarclose").click();
                                                    }}
                                                >
                                                    <a className="acnav__link acnav__link--level2">
                                                        {/* {t(`languages.aboutus`)} */}
                                                        {headerLangObj.languages.aboutus}
                                                        </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    
                                                    // to={`/social-contribution/${this.props.language}`}
                                                    href={`/social-contribution`}
                                                    as={`/social-contribution/${language}`}
                                                    onClick={() => {
                                                        document.getElementById("navbarclose").click();
                                                    }}
                                                >
                                                    <a className="acnav__link acnav__link--level2">
                                                        {/* {t(`languages.socialContribution`)} */}
                                                        {headerLangObj.languages.socialContribution}
                                                        </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    
                                                    // to={`/our-people/${this.props.language}`}
                                                    href={`/our-people`}
                                                    as={`/our-people/${language}`}
                                                    onClick={() => {
                                                        document.getElementById("navbarclose").click();
                                                    }}
                                                >
                                                    <a className="acnav__link acnav__link--level2">
                                                        {/* {t(`languages.ourPeople`)} */}
                                                        {headerLangObj.languages.ourPeople}
                                                        </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    
                                                    // to={`/sustainability/${this.props.language}`}
                                                    href={`/sustainability`}
                                                    as={`/sustainability/${language}`}
                                                    onClick={() => {
                                                        document.getElementById("navbarclose").click();
                                                    }}
                                                >
                                                    <a className="acnav__link acnav__link--level2">
                                                        {/* {t(`languages.sustainability`)} */}
                                                        {headerLangObj.languages.sustainability}
                                                        </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    
                                                    // to={`/infrastructure/${this.props.language}`}
                                                    href={`/infrastructure`}
                                                    as={`/infrastructure/${language}`}
                                                    onClick={() => {
                                                        document.getElementById("navbarclose").click();
                                                    }}
                                                >
                                                    <a className="acnav__link acnav__link--level2">
                                                        {/* {t(`languages.infrastructure`)} */}
                                                        {headerLangObj.languages.infrastructure}
                                                        </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="acnav__list acnav__list--level1" style={{ paddingLeft: "25px" }}>
                                    <Link href="#" passHref={true}>
                                        <li className="">
                                            <div className="acnav__label" style={{ color: "initial" }}>
                                                {/* {t(`languages.WhatsNew`)} */}
                                                {headerLangObj.languages.WhatsNew}
                                            </div>
                                        </li>
                                    </Link>
                                </ul>
                            </nav>
                        </section>
                    </section>
                </div>
                <div id="overdiv" className="overdiv" onClick={this.searchClose}></div>
                <header className="">
                    <div className="mobilenav">
                        <div className="container">
                            <div className="row">
                                <div className="col-3 padding-0">
                                    <Link href="/" >
                                        <span className="navbar-brand header-logo" style={{"cursor": "pointer"}}>
                                            <Image src={"/images/Knitters_Pride_Logo.png"} alt="Knitter's Pride" noSkeleton={true} />
                                        </span>
                                    </Link>
                                </div>
                                <div className="col-7 text-right">
                                    <div className="rightPortion">
                                        <form className="form-inline my-2 my-lg-0">
                                            <span className="search" id="search1">
                                                <i className="fa fa-search" aria-hidden="true" />
                                            </span>
                                        </form>
                                        {/* <a href="#" className="mr-2">
                                            <Image src={"/images/storicon.png")} alt="..."/>
                                        </a> */}
                                        <strong className="title-glob c-pointer" data-toggle="modal" data-target="#lan_modal">
                                            <span className="title-glob text-uppercase">{language}</span>
                                            <i className="fas fa-chevron-down arrow-icon"></i>
                                        </strong>
                                    </div>
                                </div>
                                <div className="col-2 text-center menunav">
                                    <i className="fa fa-bars" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="searchmainwrap"></div>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link href="/" >
                                <span className="navbar-brand header-logo" style={{"cursor": "pointer"}}>
                                    <Image src={"/images/Knitters_Pride_Logo.png"} alt="Knitter's Pride" height={42} width={120} noSkeleton={true} />
                                </span>
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mr-auto">
                                 
                                    {category.map((item, idx) => (
                                        <li className="nav-item dropdown menu-large border-3" key={idx}>
                                            {/* {console.log("hjghj   ",item)} */}
                                            <Link 
                                            // to={`${item.link}/${language}`}
                                             href={`${item.link}`}
                                             as={`${item.link}/${language}`}
                                             >
                                               <a  className="nav-link dropdown-toggle">{item.name}</a> 
                                            </Link>
                                            {item.brands.length === 0 && item.types.length === 0 && item.materials.length === 0 ? null : item.brands
                                                  .length === 0 ||
                                              item.types.length === 0 ||
                                              item.materials.length === 0 ? (
                                                item.name === "Accessories" || item.name === "Accessoires" || item.name === "Accesorios" || item.name === "Аксессуары" || item.name === "配件" ? (
                                                    // Accessories dropdown start
                                                    <ul className="dropdown-menu megamenu row bag accessor hover-show">
                                                        <li className="col-12">
                                                            <ul className="col-left">
                                                                {item.types.length > 0
                                                                    ? item.types.map((type, index) => (
                                                                          <li
                                                                              key={index}
                                                                            //   onClick={() =>
                                                                            //       this.props.connectHeaderGinger("type", null, type.slug, language)
                                                                            //   }
                                                                          >
                                                                              <Link
                                                                                //   to={{
                                                                                //       pathname: `/b/${type.slug}/${language}`,
                                                                                //   }}
                                                                                href={`/b/${type.slug}`}
                                                                                as={`/b/${type.slug}/${language}`}
                                                                              >
                                                                                  {type.name}
                                                                              </Link>
                                                                          </li>
                                                                      ))
                                                                    : null}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    // Accessories dropdown end
                                                    <ul className="dropdown-menu megamenu row bag hover-show">
                                                        <li className="col-12">
                                                            <ul className="col-left">
                                                                {item.types.length > 0
                                                                    ? item.types.map((type, index) => (
                                                                          <li
                                                                              key={index}
                                                                            //   onClick={() =>
                                                                            //       this.props.connectHeaderGinger("type", null, type.slug, language)
                                                                            //   }
                                                                          >
                                                                              <Link
                                                                                //   to={{
                                                                                //       pathname: `/b/${type.slug}/${language}`,
                                                                                //   }}
                                                                                href={`/b/${type.slug}`}
                                                                                as={`/b/${type.slug}/${language}`}
                                                                              >
                                                                                  {type.name}
                                                                              </Link>
                                                                          </li>
                                                                      ))
                                                                    : null}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                )
                                            ) : (
                                                <ul className="dropdown-menu megamenu row  hover-show">
                                                    {item.brands.length > 0 ? (
                                                        <li className="col">
                                                            <ul className="col-left">
                                                                <li className="dropdown-header">
                                                                    {item.brands.length > 0 
                                                                    ? 
                                                                    // t(`languages.ByBrands`) 
                                                                    headerLangObj.languages.ByBrands
                                                                    : 
                                                                    ""}
                                                                </li>
                                                                {item.brands.map((brand, indx) =>
                                                                    (item.name).trim() === "Needles" || (item.name).trim() === "Stricken" || (item.name).trim() === "Aguja" || (item.name).trim() === "针头" || (item.name).trim() === "Спица-ne"
                                                                    ? (
                                                                        <li
                                                                            key={indx}
                                                                            // onClick={() =>
                                                                            //     this.props.connectHeaderGinger(
                                                                            //         "brand",
                                                                            //         item.slug,
                                                                            //         brand.slug,
                                                                            //         language
                                                                            //     )
                                                                            // }
                                                                        >
                                                                            <Link
                                                                                // to={{
                                                                                //     pathname: `/a/${brand.slug}/${language}`,
                                                                                // }}
                                                                                // href={`/a/${brand.slug}`}
                                                                                // as={`/a/${brand.slug}/${language}`}
                                                                                href={`/a/${brand.slug}/${language}`}
                                                                                
                                                                            >
                                                                                <a className="acnav__link acnav__link--level3">{brand.name}</a>
                                                                            </Link>
                                                                        </li>
                                                                    ) : (
                                                                        <li
                                                                            key={indx}
                                                                            // onClick={() =>
                                                                            //     this.props.connectHeaderGinger(
                                                                            //         "brand",
                                                                            //         item.slug,
                                                                            //         brand.slug,
                                                                            //         language
                                                                            //     )
                                                                            // }
                                                                        >
                                                                            <Link
                                                                                // to={{
                                                                                //     pathname: `/a/${brand.slug}-${item.slug}/${language}`,
                                                                                // }}
                                                                                href={`/a/${brand.slug}-${item.slug}`}
                                                                                as={`/a/${brand.slug}-${item.slug}/${language}`}
                                                                            >
                                                                                {brand.name}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </li>
                                                    ) : null}
                                                    {item.types.length > 0 ? (
                                                        <li className="col">
                                                            <ul className="col-left ">
                                                                <li className="dropdown-header">
                                                                    {item.types.length > 0 
                                                                    ? 
                                                                    // t(`languages.ByType`)
                                                                    headerLangObj.languages.ByType
                                                                    : 
                                                                    ""}
                                                                </li>
                                                                {item.types.map((type, ind) => (
                                                                    <li
                                                                        key={ind}
                                                                        // onClick={() =>
                                                                        //     this.props.connectHeaderGinger("type", item.slug, type.slug, language)
                                                                        // }
                                                                    >
                                                                        <Link
                                                                            // to={{
                                                                            //     pathname: `/b/${type.slug}/${language}`,
                                                                            // }}
                                                                            href={`/b/${type.slug}`}
                                                                            as={`/b/${type.slug}/${language}`}
                                                                        >
                                                                            {type.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    ) : null}
                                                    {item.materials.length > 0 ? (
                                                        <li className="col">
                                                            <ul className="col-left">
                                                                <li className="dropdown-header">
                                                                    {item.materials.length > 0 
                                                                    ? 
                                                                    // t(`languages.ByMaterials`) 
                                                                    headerLangObj.languages.ByMaterials
                                                                    : 
                                                                    ""}
                                                                </li>
                                                                {item.materials.map((material, i) => (
                                                                    <li
                                                                        key={i}
                                                                        // onClick={() =>
                                                                        //     this.props.connectHeaderGinger(
                                                                        //         "material",
                                                                        //         item.slug,
                                                                        //         material.slug,
                                                                        //         language
                                                                        //     )
                                                                        // }
                                                                    >
                                                                        <Link
                                                                            // to={{
                                                                            //     pathname: `/c/${material.slug}-${item.slug}/${language}`,
                                                                            // }}
                                                                            href={`/c/${material.slug}-${item.slug}`}
                                                                            as={`/c/${material.slug}-${item.slug}/${language}`}
                                                                        >
                                                                            {material.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    ) : null}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                    <li className="nav-item dropdown menu-large border-3">
                                        <a className="nav-link ">
                                            {/* {t(`languages.ourstory`)} */}
                                            {headerLangObj.languages.ourstory}
                                            </a>
                                        <ul className="dropdown-menu megamenu row about hover-show">
                                            <li className="col">
                                                <ul className="col-left">
                                                    <li>
                                                        <Link 
                                                        // to={`/about-us/${this.props.language}`}
                                                        href={`/about-us`}
                                                        as={`/about-us/${language}`}
                                                        >
                                                            {/* {t(`languages.aboutus`)} */}
                                                            {headerLangObj.languages.aboutus}
                                                            </Link>
                                                    </li>
                                                    {/* <li><Link 
                                                    // to="/blog"
                                                    href={`/blog`}
                                                    as={`/blog/${language}`}
                                                    >
                                                        Blog</Link></li>  */}
                                                    <li>
                                                        <Link 
                                                        // to={`/social-contribution/${this.props.language}`}
                                                        href={`/social-contribution`}
                                                        as={`/social-contribution/${language}`}
                                                        >
                                                            {/* {t(`languages.socialContribution`)} */}
                                                            {headerLangObj.languages.socialContribution}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link 
                                                        // to={`/our-people/${this.props.language}`}
                                                        href={`/our-people`}
                                                        as={`/our-people/${language}`}
                                                        >
                                                            {/* {t(`languages.ourPeople`)} */}
                                                            {headerLangObj.languages.ourPeople}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link 
                                                        // to={`/sustainability/${this.props.language}`}
                                                        href={`/sustainability`}
                                                        as={`/sustainability/${language}`}
                                                        >
                                                            {/* {t(`languages.sustainability`)} */}
                                                            {headerLangObj.languages.sustainability}
                                                            </Link>
                                                    </li>
                                                    <li>
                                                        <Link 
                                                        // to={`/infrastructure/${this.props.language}`}
                                                        href={`/infrastructure`}
                                                        as={`/infrastructure/${language}`}
                                                        >
                                                            {/* {t(`languages.infrastructure`)} */}
                                                            {headerLangObj.languages.infrastructure}
                                                            </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown menu-large">
                                        <Link  
                                        // to={`/whatsnew/${this.props.language}`}
                                        href={`/whatsnew`}
                                        as={`/whatsnew/${language}`}
                                         id="navbarDropdown">
                                            <a className="nav-link " id="navbarDropdown">
                                                {/* {t(`languages.WhatsNew`)} */}
                                                {headerLangObj.languages.WhatsNew}
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="rightPortion mb-1">
                                    <form className="form-inline my-2 my-lg-0">
                                        {/* <Link href="/"  > */}
                                            <a className="search" id="search" onClick={this.searchOpen}>
                                                {/* {t(`languages.Search`)} */}
                                                {headerLangObj.languages.Search}
                                            </a>
                                        {/* </Link> */}
                                    </form>
                                    {/* <Link href={`/find-our-stores/${language}`}>
                                        <>
                                        <Image src={"/images/storicon.png"} style={{ marginRight: '5px' }} alt={imageNameToAltTag("/images/storicon.png")} />
                                        <span className="tablet-d-none">
                                            {headerLangObj.languages.Distributors}
                                        </span>
                                        </>
                                    </Link> */}
                                    {/* <Link href="/" passHref data-toggle="modal" data-target="#lan_modal"> */}
                                        <a className="title-glob c-pointer" data-toggle="modal" data-target="#lan_modal">
                                            <span className="tablet-d-none mr-2">
                                                {headerLangObj.languages.Language}
                                                </span>
                                            {/* <span className="title-glob text-capitalize"> 
                                            {language}
                                             </span> */}
                                            <i className="fas fa-chevron-down arrow-icon"></i>
                                        </a>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id="searchopen" className="searchmainwrap">
                        <section id="searchmain">
                            <div className="container">
                                <div className="searchmain">
                                    <form>
                                        <input
                                            type="text"
                                            name="search"
                                            value={this.state.searchInputtext}
                                            placeholder="Search..."
                                            onChange={this.searchInput}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="closesearch" id="closesearch" onClick={() => this.searchClose()}>
                                <i className="fa fa-times" aria-hidden="true" />
                            </div>
                        </section>
                        <section id="searchresult">
                            <div className="">
                                <div className="container ">
                                    <div className="row ">
                                        <div className="col-xs-12 col-md-12 categori ">
                                            {foundProduct?.length > 0 ? (
                                                <h4 className="p-top-40">
                                                    {/* {foundProduct.length} {t(`languages.Results`)} */}
                                                    {foundProduct.length} {headerLangObj.languages.Results}
                                                </h4>
                                            ) : null}
                                            <div className="row max-height-500 defult-scroll ">
                                                {foundProduct?.length > 0 &&
                                                    foundProduct.map((found, index) => (
                                                        <div className="col-xs-12 col-md-4 col-sm-6 col-lg-3 searchresult search-img" key={index}>
                                                            <a
                                                                // to={
                                                                //     {
                                                                //         // pathname: `/${found.slug}`
                                                                //     }
                                                                // }
                                                               
                                                                onClick={() => this.serchResult(found)}
                                                            >
                                                               <>
                                                                <figure style={{ cursor: "pointer" }}>
                                                                    <Image src={storageUrl + found._source.thumbnailImage} alt={imageNameToAltTag(storageUrl + found._source.thumbnailImage)}  height={400} width={400}/>
                                                                </figure>
                                                                <p>{found._source.tagline}</p>
                                                               </>
                                                            </a>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </header>

                <div className="modal pr-0 show" id="lan_modal" tabIndex="-1" role="dialog" aria-labelledby="lan_modalLabel" aria-hidden="true">
                    <div className="modal-dialog m-0 slideInDown" role="document">
                        <div className="modal-content border-0 border-round-0">
                            <div className="modal-body">
                                <div className="wrapper-modal-container mt-5 bg-image">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12">
                                                <div className="header-section text-right">
                                                    <button className="close-button" data-dismiss="modal" aria-label="Close" >
                                                        <svg data-baseweb="icon" viewBox="0 0 24 24" size={42} className="icon-del">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 text-center">
                                                {/* <div className="modal-logo" style={{textAlign:'center', width:'100%'}}> */}
                                                <Image src={"/images/Knitters_Pride_Logo.png"} alt="Knitter's Pride" className="modal-logo" noSkeleton={true} />
                                                {/* </div> */}
                                                <div className="upper-section text-center ">
                                                    <div className="text-title">
                                                    {/* {t(`languages.Select_your_preferred_language`)} */}
                                                    {headerLangObj.languages.Select_your_preferred_language}
                                                   
                                                    </div>
                                                </div>
                                            </div>
                                           

                                            <div className="box_row mt-5">
                                                {this.state.allLanguage.map((item, idx) => (
                                                    <React.Fragment>
                                                     {/* <Link href="/" locale={item.shortName} key={idx} passHref> */}
                                                    {item.shortName === "en" ? <Link href={`/${item.shortName}`} key={idx} passHref={true}>
                                                        <div className="inner_box" 
                                                        // onClick={() => i18n.changeLanguage(item.shortName)}
                                                        // onClick={() => this.changeLang(item.shortName)}
                                                        onClick={this.modalClose}
                                                        >
                                                            <div
                                                                className="blok-title"
                                                                // data-dismiss="modal"
                                                            >
                                                                
                                                                    {item.name}
                                                                
                                                            </div>
                                                        </div>
                                                    </Link> : null}
                                                    </React.Fragment>
                                                ))}
                                                <div className="blok-title d-none" id="mo" data-dismiss="modal"></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


// export default withRouter(withTranslation()(Header));
// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
// }

export default withRouter(Header)
