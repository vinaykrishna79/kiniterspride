import React, { Component } from "react";
import SideBarMenu from "../../component/SideBarMenu";
import { withRouter } from "next/router";
import Link from "next/link";
// import Footer from "../../Footer/Footer";
import { getAPI } from "../../utils/api";
// import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { storageUrl } from "../../utils/BaseUrl";
// import { withTranslation } from "react-i18next";
import MetaDecorator from "../../utils/MetaDecorator";
import Image from "../../component/custom-image";
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../../utils/helperFunctions";
import LoadingSkeleton from "../../component/LoadingSkeleton";
// import { withTranslation } from "next-i18next";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class Blog extends Component {
    state = {
        allBlogs: [],
        count: 0,
        isLoad: true,
        allCateg: [],
        allArchive: [],
        categId: "",
        archiveId: "",
        Archivemonth: "",
        Archiveyear: "",
        langObj: {},
        lang_i: "",
    };

    componentDidMount() {
        // window.scrollTo(0, 0);
        const r = this.props.router;
        const lang_i = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        // let langus = localStorage.getItem("languages")
        // if(langus && !langus.includes(lang_i)){
        //     this.props.history.push("/NotFound")
        // }
        // console.log("blog didmount   ",this.props);
        this.setState(
            {
                lang_i: lang_i,
            },
            () => {
                let { lang_i } = this.state;
                this.getBlogs(lang_i, 1);
                this.blogsCateg(lang_i);
                this.blogsArchive(lang_i);
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
    //                 this.getBlogs(lang_i, 1);
    //                 this.blogsCateg(lang_i);
    //                 this.blogsArchive(lang_i);
    //             }
    //         );
    //         // this.staticMultilingual(this.props.language)
    //     }
    // }

    getBlogs = (langId, page) => {
        window.scrollTo(0, 0);
        this.setState({ isLoad: true, allBlogs: [], lang_i: langId });
        if (this.state.categId !== "") {
            getAPI(`blog/blogs/${langId}?limit=5&page=${page}&catId=${this.state.categId}`)
                .then((res) => {
                    let { data, status, count } = res.data;
                    if (status === 1) {
                        this.setState({
                            allBlogs: data,
                            count: count,
                            isLoad: false,
                        });
                    } else if (status === 0) {
                        this.setState({
                            allBlogs: data,
                            count: count,
                            isLoad: false,
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                        allBlogs: [],
                        count: 0,
                        isLoad: false,
                    });
                });
        } else if (this.state.archiveId === "archive") {
            getAPI(`blog/month/${langId}?month=${this.state.Archivemonth}&year=${this.state.Archiveyear}&limit=5&page=${page}`)
                .then((res) => {
                    let { data, status, count } = res.data;
                    if (status === 1) {
                        this.setState({
                            allBlogs: data,
                            archiveId: "archive",
                            isLoad: false,
                            count: count,
                        });
                    } else if (status === 0) {
                        this.setState({
                            allBlogs: [],
                            archiveId: "archive",
                            isLoad: false,
                            count: 0,
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                        allBlogs: [],
                        archiveId: "archive",
                        isLoad: false,
                        count: 0,
                    });
                });
        } else {
            getAPI(`blog/blogs/${langId}?limit=5&page=${page}`)
                .then((res) => {
                    let { data, status, count } = res.data;
                    if (status === 1) {
                        this.setState({
                            allBlogs: data,
                            count: count,
                            isLoad: false,
                        });
                    } else if (status === 0) {
                        this.setState({
                            allBlogs: [],
                            count: 0,
                            isLoad: false,
                        });
                    }
                })
                .catch(async (error) => {
                    await this.setState({
                        allBlogs: [],
                        count: 0,
                        isLoad: false,
                    });
                });
        }
    };

    blogsCateg = (lang) => {
        getAPI(`blogCategory/categories/${lang}`)
            .then((res) => {
                let { data, status } = res.data;
                if (status === 1) {
                    this.setState({
                        allCateg: data,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    blogsArchive = (lang) => {
        getAPI(`blog/archives/${lang}`)
            .then((res) => {
                let { data, status } = res.data;
                if (status === 1) {
                    this.setState({
                        allArchive: data,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    categoryWiseBlogs = (catid) => {
        this.setState(
            {
                categId: catid,
            },
            () => {
                this.getBlogs(this.state.lang_i, 1);
            }
        );
    };

    monthlyBlog = (ele, count) => {
        this.setState(
            {
                Archivemonth: moment(ele.months).format("MM"),
                Archiveyear: moment(ele.months).format("YYYY"),
            },
            () => {
                getAPI(`blog/month/${this.state.lang_i}?month=${this.state.Archivemonth}&year=${this.state.Archiveyear}&limit=5&page=1`)
                    .then((res) => {
                        let { data, status } = res.data;
                        if (status === 1) {
                            this.setState({
                                allBlogs: data,
                                archiveId: "archive",
                                count: count
                            });
                        }
                    })
                    .catch((error) => console.log(error));
            }
        );
    };

    render() {
        const { allBlogs, count, isLoad, allCateg, allArchive, langObj, lang_i } = this.state;
        // const { t } = this.props;
        return (
            <React.Fragment>
                {
                    isLoad
                        ?
                        <div style={{minHeight:'100vh'}}>
                        <LoadingSkeleton />
                        </div>
                        :
                        <>
                            <MetaDecorator
                                title={"Blog | Knitter's Pride"}
                                description={""}
                                keywords={""}
                                ogTitle="Blog | Knitter's Pride"
                                ogDescription=""
                                ogImage=""
                            />
                            <div className="main-container">
                                <div className="blog-container">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-8">
                                                <div className="blogbox">
                                                    {/* {isLoad ? (
                                                        <>
                                                            <div style={{ paddingBottom: "100px" }}>
                                                                <div style={{ paddingBottom: "20px" }}>
                                                                    <Skeleton count={1} height={50} width={500} />
                                                                </div>
                                                                <div style={{ paddingBottom: "30px" }}>
                                                                    <Skeleton count={1} height={20} width={400} />
                                                                </div>
                                                                <div style={{ paddingBottom: "50px" }}>
                                                                    <Skeleton count={5} height={15} width={800} />
                                                                </div>
                                                            </div>
                                                            <div style={{ paddingBottom: "100px" }}>
                                                                <div style={{ paddingBottom: "20px" }}>
                                                                    <Skeleton count={1} height={50} width={500} />
                                                                </div>
                                                                <div style={{ paddingBottom: "30px" }}>
                                                                    <Skeleton count={1} height={20} width={400} />
                                                                </div>
                                                                <div style={{ paddingBottom: "50px" }}>
                                                                    <Skeleton count={5} height={15} width={800} />
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : null} */}
                                                    {allBlogs.length > 0 &&
                                                        allBlogs.map((ele, index) => (
                                                            <div className="blog-col" key={index}>
                                                                <div className="blog-name">
                                                                    <Link href={{
                                                                        pathname: `/blog/${ele.slug}/${lang_i}`,
                                                                        query: { slug: ele.slug }
                                                                    }}
                                                                        as={`/blog/${ele.slug}/${lang_i}`}
                                                                    >{ele.title}</Link>
                                                                    <span>
                                                                        {moment(ele.publishedOn).format("MMM DD, YYYY")} | <strong>By: {ele.bloggerName}</strong>
                                                                    </span>
                                                                </div>
                                                                <div className="blog-img">
                                                                    <Link href={{
                                                                        pathname: `/blog/${ele.slug}/${lang_i}`,
                                                                        query: { slug: ele.slug }
                                                                    }}
                                                                        as={`/blog/${ele.slug}/${lang_i}`}
                                                                        passHref={true}>
                                                                        <a><Image src={storageUrl + ele.image} alt={imageNameToAltTag(storageUrl + ele.image)} height={screen.width>1199?455 : screen.width>991?453 : screen.width>767?690 : screen.width>678?510: 100}/></a>
                                                                    </Link>
                                                                </div>
                                                                <div dangerouslySetInnerHTML={{ __html: `<p>${ele.desc}</p>` }} />
                                                                <div className="btn-b">
                                                                    <Link href={{
                                                                        pathname: `/blog/${ele.slug}/${lang_i}`,
                                                                        query: { slug: ele.slug },
                                                                    }}
                                                                        as={`/blog/${ele.slug}/${lang_i}`}
                                                                    >Read More</Link>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                                <div className="pagination page-space">
                                                    <ul>
                                                        {count > 5 ? (
                                                            Array.from({ length: Math.ceil(count / 5) }).map((item, index) => (
                                                                <li
                                                                    className="active"
                                                                    key={index}
                                                                    onClick={() => this.getBlogs(this.state.lang_i, index + 1)}
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <span>{index + 1}</span>
                                                                </li>
                                                            ))
                                                        ) : count === 0 ? null : (
                                                            <li className="active" style={{ cursor: "pointer" }}>
                                                                <span>{1}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4">
                                                <div className="blog-side position-sticky">
                                                    <SideBarMenu
                                                        allCateg={allCateg}
                                                        categoryWiseBlogs={this.categoryWiseBlogs}
                                                        allArchive={allArchive}
                                                        monthlyBlog={this.monthlyBlog}
                                                    // t={t}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
                        </>
                }



            </React.Fragment>
        );
    }
}

// export default withRouter(withTranslation()(Blog));

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(Blog)