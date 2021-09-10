import React, { Component } from "react";
// import Footer from "../../Footer/Footer";
import { withRouter } from "next/router";
import { getAPI } from "../utils/api";
import Skeleton from "react-loading-skeleton";
// import ReactHtmlParser from "react-html-parser";
import parse from "html-react-parser"; 
import { storageUrl } from "../utils/BaseUrl";
// import { withTranslation } from "react-i18next";
import Image from "./custom-image";
import Link from "next/link";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../utils/helperFunctions";
import LoadingSkeleton from "./LoadingSkeleton";
import ScreenSizeDetector from 'screen-size-detector'

class Ginger extends Component {
    state = {
        brands: {},
        types: {},
        materials: {},
        ids: {},
        bymat: "",
        categories: [],
        splitCategObj: {},
        langObj: {},
        lang_i: "",
        loading: false,
        screen: ""
    };

    // componentDidUpdate(prevProps) {
    //     let ids = this.props.match.params;
    //     const pids =  prevProps.match.params;

    //         if (pids.lang !== ids.lang || pids.pagetype !== ids.pagetype || pids.subcateg !== ids.subcateg) {
    //             window.scrollTo(0, 0);
    //             this.setState(
    //                 {
    //                     ids: ids,
    //                 },
    //                 () => {
    //                         this.getCategories();
    //                 }
    //             );
    //         }
    // }

    componentDidMount() {
        this.getDataForTheComponent()
        this.setState({screen: new ScreenSizeDetector()})
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.router.asPath !== this.props.router.asPath){
            this.getDataForTheComponent()
        }
    }

    getDataForTheComponent = () => {
        this.setState({loading: true})
        let ids = this.props.router.query;
        // let { language } = this.props.i18n
        const r = this.props.router;
        ids.lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale);
        ids.pagetype = this.props.id 
        this.setState({ ids: ids }, () => {
            let { ids } = this.state;
            if (ids.pagetype === "a") {
                this.getCategories();
            } else if (ids.pagetype === "b") {
                // let lang_i = this.props.i18n.language.split('-')[0]
                this.props.connectHeaderGinger("type", null, ids.slug, ids.lang);
            } else if (ids.pagetype === "c") {
                this.getCategories();
            }
        });
        this.setState({loading: false})
    }

    

    getCategories = () => {
        const url = "category/categories/" + this.state.ids.lang
        // const url = "category/categories/" + this.state.ids.lang;
        getAPI(url).then((res) => {
            const { status, data } = res.data;
            if (status === 1) {
                let catNeedleName = data[0].slug
                this.setState(
                    {
                        categories: data,
                        lang_i: this.state.ids.lang,
                    },
                    () => {
                        this.splitcateg(this.state.ids.slug, catNeedleName)
                    }
                );
            } else {
                this.setState({ categories: [] });
            }
        });
    };

    splitcateg = async (idssubcateg, catNeedleName) => {
        let splt = idssubcateg.split("-");
        let obj;
        if (splt.length > 1) {
            let lastindex = idssubcateg.lastIndexOf("-");
            let lastsubstr = idssubcateg.substr(lastindex + 1);
            let findInd = this.state.categories.findIndex((item) => item.slug === lastsubstr);
            if (findInd === -1) {
                obj = {
                    categ: catNeedleName,
                    subcateg: idssubcateg,
                };
            } else {
                obj = {
                    categ: lastsubstr,
                    subcateg: idssubcateg.substr(0, lastindex),
                };
            }
            await this.setState({ splitCategObj: obj }, () => {
                let { splitCategObj, ids } = this.state;
                if (ids?.pagetype === "a") {
                    if(splt[1] === catNeedleName) {
                        this.props.router.push("/NotFound")
                    }
                    this.props.connectHeaderGinger("brand", splitCategObj.categ, splitCategObj.subcateg, this.state.ids.lang);
                } else if (ids?.pagetype === "c") {
                    this.props.connectHeaderGinger("material", splitCategObj.categ, splitCategObj.subcateg, this.state.ids.lang);
                }
            });
        } else {
            obj = {
                categ: catNeedleName,
                subcateg: idssubcateg,
            };
            this.setState({ splitCategObj: obj }, () => {
                let { splitCategObj, ids } = this.state;
                if (ids?.pagetype === "a") {
                    this.props.connectHeaderGinger("brand", splitCategObj.categ, splitCategObj.subcateg, this.state.ids.lang);
                } else if (ids?.pagetype === "c") {
                    this.props.connectHeaderGinger("material", splitCategObj.categ, splitCategObj.subcateg, this.state.ids.lang);
                }
            });
        }
    };

    imageOnly = (product) => {
        let imageOnly = [];
        if (product.productimages?.length > 0) {
            for (let i = 0; i <= product.productimages?.length; i++) {
                if (product.productimages[i]?.type === 0) {
                    imageOnly.push(storageUrl + product.productimages[i]?.value);
                }
                if (imageOnly.length === 2) {
                    break;
                }
            }
        }
        if (product.images?.length > 0) {
            for (let i = 0; i <= product.images?.length; i++) {
                if (product.images[i]?.type === 0) {
                    imageOnly.push(product.images[i]?.value);
                }
                if (imageOnly.length === 2) {
                    break;
                }
            }
        }
        return imageOnly;
    };

    render() {
        let { brands, types, materials, isLoader, t, seoFields } = this.props;
        // if (brands?.seoFields) {
        //     seoFields = brands.seoFields;
        // } else if (types?.seoFields) {
        //     seoFields = types.seoFields;
        // } else if (materials?.seoFields) {
        //     seoFields = materials.seoFields;
        // }
        let { splitCategObj, screen } = this.state;
        const r = this.props.router;
        let language = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale);
        const gingerLangObj = require(`../public/locales/${language}/common.json`)
        return (
            <React.Fragment>
                {/* <MetaDecorator
                    title={seoFields?.seoTitle ? seoFields?.seoTitle : ""}
                    description={seoFields?.seoDesc ? seoFields?.seoDesc : ""}
                    keywords={seoFields?.seoKeywords ? seoFields?.seoKeywords : ""}
                    ogTitle={seoFields?.ogFields?.ogTitle ? seoFields?.ogFields?.ogTitle : ""}
                    ogDescription={seoFields?.ogFields?.ogDescription ? seoFields?.ogFields?.ogDescription : ""}
                    ogImage={seoFields?.ogFields?.ogImage ? seoFields?.ogFields?.ogImage : ""}
                    ogUrl={seoFields?.ogFields?.ogUrl ? seoFields?.ogFields?.ogUrl : ""}
                /> */}
                <div className="ginger-container">
                    {isLoader ? (
                        <LoadingSkeleton />
                    ) : 
                    // null}
                    // {
                    brands?.coverImage ? (
                        <section className="inner-banner kp-mid_banner">
                            <Image src={storageUrl + brands?.coverImage} className="img-fluid" alt={imageNameToAltTag(storageUrl + brands?.coverImage)} height={(screen.width)/2.85} width={screen.width}/>
                        </section>
                    ) : types?.thumbNailImage ? (
                        <section className="inner-banner kp-mid_banner">
                            <Image src={storageUrl + types?.thumbNailImage} className="img-fluid" alt={imageNameToAltTag(storageUrl + types?.thumbNailImage)} height={(screen.width)/2.85} width={screen.width}/>
                        </section>
                    ) : materials?.coverImage ? (
                        <section className="inner-banner kp-mid_banner">
                            <Image src={storageUrl + materials?.coverImage} className="img-fluid" alt={imageNameToAltTag(storageUrl + materials?.coverImage)} height={(screen.width)/2.85} width={screen.width}/>
                        </section>
                    ) : null}

                    {/* Main Section */}
                    {Object.keys(brands).length > 0 ? (
                        <section className="accessoriesSection pt-5 pb-5">
                            <div className="container">
                                <div className="text-center mb-md-5">
                                    <h1 className="wow fadeInUp text-upper mobfont-24">{brands.name}</h1>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 productBox productlist">
                                        <p className="wow fadeInUp" dangerouslySetInnerHTML={{ __html: brands.desc }}/>
                                        {/* {ReactHtmlParser(brands.desc)}</p> */}
                                        {parse(brands.header ? brands.header : "")?.props?.children?.type === "br" || brands.header === "" ? null : (
                                            <div className="text-center mb-md-5 padddingtop">
                                                <h2 className="wow fadeInUp text-upper" style={{ fontSize: "30px" }} dangerouslySetInnerHTML={{ __html: brands.header }}/>
                                                    {/* {ReactHtmlParser(brands.header)} */}
                                                {/* </h2> */}
                                            </div>
                                        )}
                                        <div className="productGrid">
                                            <div className="gridCol gridflex_box">
                                                {brands?.productTypes?.map((product, index) => (
                                                    <div className="productColumn wow fadeInUp text-center" key={index}>
                                                        <div className="wrap">
                                                            <Link
                                                                href={{
                                                                    pathname: `/d/${brands.slug}/${product.pslug}`,
                                                                }}
                                                                as={`/d/${brands.slug}/${product.pslug}/${language}`}

                                                                passHref={true}
                                                            >
                                                                <a>
                                                                <figure className="swap-on-hover">
                                                                    <Image
                                                                        className="swap-on-hover__front-image height-340"
                                                                        src={this.imageOnly(product)[0]}
                                                                        alt={imageNameToAltTag(this.imageOnly(product)[0])}
                                                                        height={500} width={500}
                                                                    />
                                                                    <Image
                                                                        className="swap-on-hover__back-image height-340"
                                                                        src={this.imageOnly(product)[1]}
                                                                        alt={imageNameToAltTag(this.imageOnly(product)[1])}
                                                                        height={500} width={500}
                                                                    />
                                                                </figure>
                                                                <div className="caption">
                                                                    <Link
                                                                        href={{
                                                                            pathname: `/d/${brands.slug}/${product.pslug}`,
                                                                        }}
                                                                        as={`/d/${brands.slug}/${product.pslug}/${language}`}
                                                                    >
                                                                        {/* {t("languages.View_Details")} */}
                                                                        {gingerLangObj.languages.View_Details}
                                                                    </Link>
                                                                </div>
                                                                </a>
                                                            </Link>
                                                        </div>

                                                        <p>
                                                            <Link
                                                                href={{
                                                                    pathname: `/d/${brands.slug}/${product.pslug}`,
                                                                }}
                                                                as={`/d/${brands.slug}/${product.pslug}/${language}`}
                                                            >
                                                                {product.name}
                                                            </Link>
                                                            <br />
                                                            {product?.pname?.length > 0 ? (
                                                                <>
                                                                    <b>{product.pname}</b>
                                                                </>
                                                            ) : null}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {parse(brands.footer ? brands.footer : "")?.props?.children?.type === "br" || brands.footer === "" ? null : (
                                            <div className="text-left mb-md-6 padddingtop">
                                                <p className="wow fadeInUp" dangerouslySetInnerHTML={{ __html: brands.footer }}/>
                                                    {/* {ReactHtmlParser(brands.footer)}</p> */}
                                            </div>
                                        )}
                                    </div>
                                    {/* Righ Section End*/}
                                </div>
                            </div>
                        </section>
                    ) : Object.keys(types).length > 0 ? (
                        <section className="accessoriesSection pt-5 pb-5">
                            <div className="container">
                                <div className="text-center mb-md-5">
                                    <h1 className="wow fadeInUp text-upper  mobfont-24">{types.name}</h1>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 productBox productlist">
                                        <p className="wow fadeInUp" dangerouslySetInnerHTML={{ __html: types.desc }}/>
                                            {/* {ReactHtmlParser(types.desc)}</p> */}
                                        {parse(types.header ? types.header : "")?.props?.children?.type === "br" || types.header === "" ? null : (
                                            <div className="text-center mb-md-5 padddingtop">
                                                <h2 className="wow fadeInUp text-upper" style={{ fontSize: "30px" }} dangerouslySetInnerHTML={{ __html: types.header }}/>
                                                    {/* {ReactHtmlParser(types.header)}
                                                </h2> */}
                                            </div>
                                        )}
                                        <div className="productGrid">
                                            <div className="gridCol gridflex_box">
                                                {types?.brands
                                                    ? types?.brands?.map((producttype, index) => (
                                                          <div className="productColumn wow fadeInUp text-center" key={index}>
                                                            <Link
                                                                    href={{
                                                                        pathname: `/d/${producttype.slug}/${producttype.pslug}`,
                                                                    }}
                                                                    as={`/d/${producttype.slug}/${producttype.pslug}/${language}`}
                                                                    passHref={true}
                                                                >
                                                            <a>
                                                                <div className="wrap">
                                                                    <div className="logowrap">
                                                                        <Image src={storageUrl + producttype.icon} alt={imageNameToAltTag(storageUrl + producttype.icon)} height={500} width={500}/>
                                                                    </div>
                                                                    <figure className="swap-on-hover">
                                                                        <Image
                                                                            className="swap-on-hover__front-image height-340"
                                                                            src={this.imageOnly(producttype)[1]}
                                                                            alt={imageNameToAltTag(this.imageOnly(producttype)[1])}
                                                                            height={500} width={500}
                                                                        />
                                                                        <Image
                                                                            className="swap-on-hover__back-image height-340"
                                                                            src={this.imageOnly(producttype)[0]}
                                                                            alt={imageNameToAltTag(this.imageOnly(producttype)[0])}
                                                                            height={500} width={500}
                                                                        />
                                                                    </figure>
                                                                    <div className="caption">
                                                                        <Link
                                                                            href={{
                                                                                pathname: `/d/${producttype.slug}/${producttype.pslug}`,
                                                                            }}
                                                                            as={`/d/${producttype.slug}/${producttype.pslug}/${language}`}
                                                                        >
                                                                            {/* {t("languages.View_Details")} */}
                                                                            {gingerLangObj.languages.View_Details}
                                                                        </Link>
                                                                    </div>  
                                                                </div>
                                                            </a>
                                                            </Link>
                                                              {/* <p>
                                                                            <Link
                                                                                to={{
                                                                                    pathname: `/d/${producttype.slug}/${producttype.pslug}/${language}`
                                                                                }}>{producttype.name}</Link>
                                                                            {producttype?.pname?.length > 0 ? <span>{producttype.pname}</span> : null}
                                                                        </p> */}
                                                          </div>
                                                      ))
                                                    : types?.products?.map((producttype, index) => (
                                                          <div className="productColumn wow fadeInUp text-center" key={index}>
                                                              <Link
                                                                    href={{
                                                                        pathname: `/e/${types.slug}/${producttype.pslug}`,
                                                                    }}
                                                                    as={`/e/${types.slug}/${producttype.pslug}/${language}`}
                                                                    passHref={true}
                                                                >
                                                                <a>
                                                                <div className="wrap">
                                                                  {producttype?.icon?.length > 0 ? (
                                                                      <div className="logowrap">
                                                                          <Image src={storageUrl + producttype.icon} alt={imageNameToAltTag(storageUrl + producttype.icon)} height={500} width={500}/>
                                                                      </div>
                                                                  ) : null}
                                                                  
                                                                      <figure className="swap-on-hover">
                                                                          <Image
                                                                              className="swap-on-hover__front-image height-340"
                                                                              src={this.imageOnly(producttype)[0]}
                                                                              alt={imageNameToAltTag(this.imageOnly(producttype)[0])}
                                                                              height={500} width={500}
                                                                          />
                                                                          <Image
                                                                              className="swap-on-hover__back-image height-340"
                                                                              src={this.imageOnly(producttype)[1]}
                                                                              alt={imageNameToAltTag(this.imageOnly(producttype)[1])}
                                                                              height={500} width={500}
                                                                          />
                                                                      </figure>
                                                                      <div className="caption">
                                                                          <Link
                                                                              href={{
                                                                                  pathname: `/e/${types.slug}/${producttype.pslug}`,
                                                                              }}
                                                                              as={`/e/${types.slug}/${producttype.pslug}/${language}`}
                                                                          >
                                                                              {/* {t("languages.View_Details")} */}
                                                                              {gingerLangObj.languages.View_Details}
                                                                          </Link>
                                                                      </div>
                                                              </div>
                                                                </a>
                                                                </Link>
                                                              <p>
                                                                  <Link
                                                                      href={{
                                                                          pathname: `/e/${types.slug}/${producttype.pslug}`,
                                                                      }}
                                                                      as={`/e/${types.slug}/${producttype.pslug}/${language}`}
                                                                  >
                                                                      {producttype.name}
                                                                  </Link>
                                                                  {producttype?.pname?.length > 0 ? <span>{producttype.pname}</span> : null}
                                                              </p>
                                                          </div>
                                                      ))}
                                            </div>
                                        </div>
                                        {parse(types.footer ? types.footer : "")?.props?.children?.type === "br" || types.footer === "" ? null : (
                                            <div className="text-left mb-md-6 padddingtop">
                                                <p className="wow fadeInUp" dangerouslySetInnerHTML={{ __html: types.footer }} />
                                                    {/* {ReactHtmlParser(types.footer)}</p> */}
                                            </div>
                                        )}
                                    </div>
                                    {/* Righ Section End*/}
                                </div>
                            </div>
                        </section>
                    ) : Object.keys(materials).length > 0 ? (
                        <section className="accessoriesSection pt-5 pb-5">
                            <div className="container">
                                <div className="text-center mb-md-5">
                                    <h1 className="wow fadeInUp text-upper mobfont-24">{materials.name}</h1>
                                </div>
                                <div className="row">
                                    {/* Right Section */}
                                    <div className="col-md-12 productBox productlist">
                                        <p className="wow fadeInUp" dangerouslySetInnerHTML={{ __html: materials.desc }} />
                                            {/* {ReactHtmlParser(materials.desc)}</p> */}

                                        <div className="productGrid">
                                            <div className="gridCol gridflex_box">
                                                {materials?.brands?.map((productmaterial, index) => (
                                                    <div className="productColumn wow fadeInUp text-center" key={index}>
                                                        <Link
                                                                href={splitCategObj.categ === "needles" ? {
                                                                    pathname: `/a/${productmaterial.slug}/${language}`,
                                                                } : {
                                                                    pathname: `/a/${productmaterial.slug}-${splitCategObj.categ}/${language}`,
                                                                }}
                                                                passHref={true}
                                                            >
                                                                <a>
                                                        <div className="wrap">
                                                            <div className="logowrap">
                                                                <Image src={storageUrl + productmaterial.icon} alt={imageNameToAltTag(storageUrl + productmaterial.icon)} height={500} width={500}/>
                                                            </div>
                                                            <Link
                                                                href={splitCategObj.categ === "needles" ? {
                                                                    pathname: `/a/${productmaterial.slug}/${language}`,
                                                                } : {
                                                                    pathname: `/a/${productmaterial.slug}-${splitCategObj.categ}/${language}`,
                                                                }}
                                                                passHref={true}
                                                            >
                                                                <a>
                                                                <figure className="swap-on-hover">
                                                                    <Image
                                                                        className="swap-on-hover__front-image height-340"
                                                                        src={
                                                                            productmaterial.image?.length > 0 && storageUrl + productmaterial.image[0]
                                                                        }
                                                                        alt={imageNameToAltTag(productmaterial.image?.length > 0 && storageUrl + productmaterial.image[0])}
                                                                        height={500} width={500}
                                                                    />
                                                                    <Image
                                                                        className="swap-on-hover__back-image height-340"
                                                                        src={
                                                                            productmaterial.image?.length > 0 && storageUrl + productmaterial.image[0]
                                                                        }
                                                                        alt={imageNameToAltTag(productmaterial.image?.length > 0 && storageUrl + productmaterial.image[0])}
                                                                        height={500} width={500}
                                                                    />
                                                                </figure>
                                                                <div className="material-caption">
                                                                    <p className="text-center">
                                                                        <Link
                                                                            href={splitCategObj.categ === "needles" ? {
                                                                                pathname: `/a/${productmaterial.slug}/${language}`,
                                                                            } : {
                                                                                pathname: `/a/${productmaterial.slug}-${splitCategObj.categ}/${language}`,
                                                                            }}
                                                                        >
                                                                            {/* {t("languages.View_Collection")} */}
                                                                            {gingerLangObj.languages.View_Collection}
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </a>
                                                            </Link>
                                                        {/* <p>
                                                                            <Link to={{
                                                                                pathname: `/a/${productmaterial.slug}-${splitCategObj.categ}/${language}`
                                                                            }}>{productmaterial.name}</Link>
                                                                            {productmaterial?.pname?.length > 0 ? <span>{productmaterial.pname}</span> : null}
                                                                        </p> */}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Righ Section End*/}
                                </div>
                            </div>
                        </section>
                    ) : null}

                    {/* Main Section End */}
                </div>
                {/* {Object.keys(brands).length > 0 || Object.keys(types).length > 0 || Object.keys(materials).length > 0 ? (
                    <Footer allLanguage={this.props.allLanguage} langObj={langObj} />
                ) : null} */}
            </React.Fragment>
        );
    }
}

export default withRouter(Ginger)