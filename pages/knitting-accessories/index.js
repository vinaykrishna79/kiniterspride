import React, { Component } from "react";
// import Footer from "../Footer/Footer";
import { getAPI } from "../../utils/api";
// import { withTranslation } from "react-i18next";
import { withRouter } from "next/router";
import MetaDecorator from "../../utils/MetaDecorator";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getCurrentLocaleFromUrl } from "../../utils/helperFunctions";
import LoadingSkeleton from "../../component/LoadingSkeleton";

class Knitting_Crochet_Accessories extends Component {
    state = {
        templateData: [],
        language: "",
        seoTitle: "",
        keywords: "",
        description: "",
        isLoading: true
    };

    componentDidMount() {
        // window.scrollTo(0, 0);
        // // const { language } = this.props;
        // let lang = this.props.i18n.language;
        const r = this.props.router;
        const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        // let langus = localStorage.getItem("languages")
        // if(langus && !langus.includes(lang)){
        //     this.props.history.push("/NotFound")
        // }
        // let lang = 'en'
        if (lang) {
            this.setState(
                {
                    language: lang,
                },
                () => {
                    getAPI(`template/getMenuTemplates/15?lang=${this.state.language}`)
                        .then((res) => {
                            const { status, data } = res.data;
                            if (status === 1) {
                                if (data.length > 0) {
                                    if (data[0].adminMenuUid === 15 && data[0].type === "topBanner") {
                                        this.setState(
                                            {
                                                templateData: data[0].templateData,
                                                isLoading: false
                                            },
                                            () => {
                                                let metas = document.getElementsByTagName("title");
                                                let meta = document.getElementsByTagName("meta");
                                                for (let i = 0; i < meta.length; i++) {
                                                    if (meta[i].getAttribute("name") === "keywords") {
                                                        this.setState({
                                                            keywords: meta[i].getAttribute("content"),
                                                        });
                                                    }
                                                    if (meta[i].getAttribute("name") === "description") {
                                                        this.setState({
                                                            description: meta[i].getAttribute("content"),
                                                        });
                                                    }
                                                    if (meta[i].getAttribute('property') === 'og:title') {
                                                        this.setState({
                                                            ogTitle: meta[i].getAttribute('content')
                                                        })
                                                    }
                                                    if (meta[i].getAttribute('property') === 'og:description') {
                                                        this.setState({
                                                            ogDescription: meta[i].getAttribute('content')
                                                        })
                                                    }
                                                    if (meta[i].getAttribute('property') === 'og:image') {
                                                        this.setState({
                                                            ogImage: meta[i].getAttribute('content')
                                                        })
                                                    }
                                                }
                                                this.setState({
                                                    seoTitle: metas[metas.length - 1],
                                                });
                                            }
                                        );
                                    }
                                }
                            }
                        })
                        .catch((err) => console.log(err));
                }
            );
        }
    }

    // componentDidUpdate(prevProps) {
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
    //                 this.setState({ isLoading: true });
    //                 // this.componentDidMount();
    //                 getAPI(`template/getMenuTemplates/15?lang=${this.state.language}`)
    //                     .then((res) => {
    //                         const { status, data } = res.data;
    //                         if (status === 1) {
    //                             if (data.length > 0) {
    //                                 if (data[0].adminMenuUid === 15 && data[0].type === "topBanner") {
    //                                     this.setState(
    //                                         {
    //                                             templateData: data[0].templateData,
    //                                         },
    //                                         () => {
    //                                             let metas = document.getElementsByTagName("title");
    //                                             let meta = document.getElementsByTagName("meta");
    //                                             for (let i = 0; i < meta.length; i++) {
    //                                                 if (meta[i].getAttribute("name") === "keywords") {
    //                                                     this.setState({
    //                                                         keywords: meta[i].getAttribute("content"),
    //                                                     });
    //                                                 }
    //                                                 if (meta[i].getAttribute("name") === "description") {
    //                                                     this.setState({
    //                                                         description: meta[i].getAttribute("content"),
    //                                                     });
    //                                                 }
    //                                             }
    //                                             this.setState({
    //                                                 seoTitle: metas[metas.length - 1],
    //                                             });
    //                                         }
    //                                     );
    //                                 }
    //                             }
    //                         }
    //                     })
    //                     .catch((err) => console.log(err));
    //             }
    //         );
    //     }
    // }

    render() {
        const { templateData, keywords, description, isLoading } = this.state;
        return (
            <React.Fragment>            
                {
                    isLoading
                    ?
                    <LoadingSkeleton />
                    :
                    <>
                        <MetaDecorator
                            title={this.state.seoTitle.innerText ? this.state.seoTitle.innerText : ""}
                            description={description}
                            keywords={keywords}
                            ogTitle={this.state.ogTitle}
                            ogDescription={this.state.ogDescription}
                            ogImage={this.state.ogImage}
                        />
                        {templateData.length > 0 ? (
                            <>
                                <div className="sets-container" dangerouslySetInnerHTML={{ __html: templateData[0].title }} />
                                {/* <Footer allLanguage={this.props.allLanguage} /> */}
                            </>
                        ) : null}
                    </>
                }
            </React.Fragment>            
        );
    }
}

// export default withRouter(withTranslation()(Knitting_Crochet_Accessories));

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(Knitting_Crochet_Accessories)
