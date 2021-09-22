import React, { Component } from "react";
// import SideBarMenu from "../../../Component/SideBarMenu";
import { withRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { Baseurl, storageUrl } from "../../../utils/BaseUrl";
import { getAPI } from "../../../utils/api";
import Skeleton from "react-loading-skeleton";
// import Footer from "../../Footer/Footer";
// import { withTranslation } from "react-i18next";
import MetaDecorator from "../../../utils/MetaDecorator";
import Image from "../../../component/custom-image";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../../../utils/helperFunctions";
import LoadingSkeleton from "../../../component/LoadingSkeleton";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

class SingleBlogPage extends Component {
  state = {
    blogPost: {},
    isLoad: true,
    langObj: {},
    lang_i: "",
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    // const r = this.props.router;
    // this.setState(
    //   {
    //     lang_i: getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale),
    //   },
    //   () => {
    //     // let langus = localStorage.getItem("languages")
    //     // if(langus && !langus.includes(this.state.lang_i)){
    //     //     this.props.router.push("/NotFound")
    //     // }
    //     let blogSlug = this.props.router.query;
    //     if (blogSlug?.slug) {
    //       this.setState({ isLoad: true });
    //       getAPI(`blog/blog?bslug=${blogSlug.slug}`)
    //         .then((res) => {
    //           let { status, data } = res.data;
    //           console.log(data)
    //           if (status === 1) {
    //             this.setState({
    //               blogPost: data,
    //               isLoad: false,
    //             });
    //           }
    //         })
    //         .catch((err) => console.log(err));
    //     }
    //   }
    // );

    this.setState({
      blogPost: this.props.blog
    })
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
  //                 this.props.router.push(newroute);
  //             }
  //         );
  //     }
  // }

  render() {
    const { blogPost, isLoad, langObj } = this.state;
    const { ogFields } = this.props
    return (
      <React.Fragment>
        <MetaDecorator
          title={ogFields?.title ? ogFields?.title : ""}
          description={ogFields?.desc ? ogFields?.desc : ""}
          keywords={ogFields?.seoKeywords ? ogFields?.seoKeywords : ""}
          ogTitle={ogFields?.ogTitle ? ogFields?.ogTitle : ""}
          ogDescription={ogFields?.ogDescription ? ogFields?.ogDescription : ""}
          ogImage={ogFields?.ogImage ? ogFields?.ogImage : ""}
          ogUrl={ogFields?.ogUrl ? ogFields?.ogUrl : ""}
      />
        {/* {
          isLoad
            ?
            <LoadingSkeleton />
            : */}
            <>
              {/* {blogPost.title ? (
                <MetaDecorator
                  title={blogPost.title}
                  description={blogPost.desc}
                  keywords={""}
                  ogTitle={blogPost.title}
                  ogDescription={blogPost.desc}
                  ogImage={storageUrl + blogPost.image}
                />
              ) : null} */}
              <div className="main-container">
                <div className="blog-container">
                  <div className="container">
                    <div className="row">
                      {/* {isLoad ? (
                        <div style={{ paddingBottom: "100px" }}>
                          <div style={{ paddingBottom: "20px" }}>
                            <Skeleton count={1} height={50} width={500} />
                          </div>
                          <div style={{ paddingBottom: "30px" }}>
                            <Skeleton count={1} height={20} width={400} />
                          </div>
                          <div style={{ paddingBottom: "30px" }}>
                            <Skeleton count={1} height={500} width={800} />
                          </div>
                          <div style={{ paddingBottom: "50px" }}>
                            <Skeleton count={5} height={15} width={800} />
                          </div>
                        </div>
                      ) : null} */}
                      <div className="col-sm-12 col-md-12">
                        <div className="blogbox">
                          <div className="blog-col">
                            <div className="blog-name">
                              <h4>{blogPost.title}</h4>
                              <span>
                                Posted on{" "}
                                {moment(blogPost.publishedOn).format("MMM DD, YYYY")}{" "}
                                |{" "}
                                <strong className="font-w-700">
                                  By: {blogPost.bloggerName}
                                </strong>
                              </span>
                            </div>
                            <div className="blog-img">
                              <a>
                                <Image
                                  src={storageUrl + blogPost.image}
                                  alt={imageNameToAltTag(storageUrl + blogPost.image)}
                                  height={400}
                                />
                              </a>
                            </div>
                            {ReactHtmlParser(blogPost.content)}

                            <div className="btn-b">
                              <a onClick={() => window.history.back()}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-arrow-left"
                                >
                                  <line x1="19" y1="12" x2="5" y2="12"></line>
                                  <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                Back
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-sm-12 col-md-4">
                                    <div className="blog-side position-sticky">
                                        <SideBarMenu allCateg={allCateg}/>
                                    </div>
                                </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
            </>
        {/* } */}
      </React.Fragment>
    );
  }
}

export async function getStaticPaths() {
  let paths = [];

  const res1 = await fetch(`${Baseurl}blog/slugs`);
  const data1 = await res1.json();
  const blogData = data1.data;

  for (let lang in blogData) {
    for (let blogslug of blogData[lang]) {
      if(lang === "en" || lang === "es"){
        paths.push(`/blog/${blogslug.slug}/${lang}`);
      }
    }
  }
  return {
    paths,
    fallback: false
  }
  // return {
  //   paths: [
  //     // String variant:
  //     "/blog/blogslug",
  //     // Object variant:
  //     //  { params: { slug: 'second-post' } },
  //   ],
  //   fallback: true,
  // };
}

export async function getStaticProps({params: {slug, lang} }) {
  const res = await fetch(`${Baseurl}blog/blog?bslug=${slug}&lang=${lang}`)
  const data = await res.json();
  const resData = data.data
  const ogFields = {
    ...resData.ogFields,
    title: resData.title,
    desc: resData.desc
  }
  return {
    props: {
      ogFields: ogFields,
      blog: resData
    }
  };
}

// export default withRouter(withTranslation()(SingleBlogPage));

export default withRouter(SingleBlogPage)
