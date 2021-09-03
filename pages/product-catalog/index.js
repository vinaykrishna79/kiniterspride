import React, { Component } from 'react'
// import { withTranslation } from 'react-i18next';
import { withRouter } from 'next/router'
import { getAPI } from '../../utils/api';
import MetaDecorator from '../../utils/MetaDecorator';
// import Footer from '../Footer/Footer';
// import { storageUrl } from '../../utils/BaseUrl';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getCurrentLocaleFromUrl } from '../../utils/helperFunctions';
import LoadingSkeleton from '../../component/LoadingSkeleton';

class CatologueDownload extends Component {
    state = {
        langObj: {},
        language: '',
        templateData: [],
        seoTitle: '',
        isLoading: true
    }

    componentDidMount() {
        // window.scrollTo(0, 0)
        const r = this.props.router;
        const lang  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        // let langus = localStorage.getItem("languages")
        // if(langus && !langus.includes(lang)){
        //     this.props.history.push("/NotFound")
        // }
        // let lang = 'en'
        if (lang) {
            this.setState({
                language: lang
            }, () => {
                getAPI(`template/getMenuTemplates/20?lang=${this.state.language}`)
                    .then(res => {
                        const { status, data } = res.data
                        if (status === 1) {
                            if (data.length > 0) {
                                if (data[0].adminMenuUid === 20 && data[0].type === "topBanner") {
                                    this.setState({
                                        templateData: data[0].templateData,
                                        isLoading: false
                                    }, () => {
                                        let metas = document.getElementsByTagName("title");
                                        let meta = document.getElementsByTagName('meta');
                                        for (let i = 0; i < meta.length; i++) {
                                            if (meta[i].getAttribute('name') === 'keywords') {
                                                this.setState({
                                                    keywords: meta[i].getAttribute('content')
                                                })
                                            }
                                            if (meta[i].getAttribute('name') === 'description') {
                                                this.setState({
                                                    description: meta[i].getAttribute('content')
                                                })
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
                                            seoTitle: metas[metas.length - 1]
                                        })
                                    })
                                }
                            }
                        }
                    }).catch(err => console.log(err));
            })
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split('-')[0] !== prevProps.language && prevProps.language !== "") {
    //         //   this.componentDidMount();
    //         this.setState({
    //             language: this.props.i18n.language.split('-')[0]
    //         }, () => {
    //             let { language } = this.state
    //             let oldroute = this.props.location.pathname
    //             let oldrouteSplit = oldroute.split('/')
    //             oldrouteSplit.splice(oldrouteSplit.length - 1, 1, language)
    //             let newroute = oldrouteSplit.join('/')
    //             this.props.history.push(newroute)
    //             getAPI(`template/getMenuTemplates/20?lang=${this.state.language}`)
    //                 .then(res => {
    //                     const { status, data } = res.data
    //                     if (status === 1) {
    //                         if (data.length > 0) {
    //                             if (data[0].adminMenuUid === 20 && data[0].type === "topBanner") {
    //                                 this.setState({
    //                                     templateData: data[0].templateData
    //                                 }, () => {
    //                                     let metas = document.getElementsByTagName("title");
    //                                     this.setState({
    //                                         seoTitle: metas[metas.length - 1]
    //                                     })
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 }).catch(err => console.log(err));
    //         })
    //     }
    // }

    render() {
        const { langObj, templateData, isLoading } = this.state
        const { t } = this.props
        return (
            <React.Fragment>
                {
                    isLoading
                    ?
                    <LoadingSkeleton />
                    :
                    <>
                        <MetaDecorator
                            title={"Catalogue Download | Knitter's Pride"}
                            description={this.state.description}
                            keywords={this.state.keywords}
                            ogTitle={this.state.ogTitle}
                            ogDescription={this.state.ogDescription}
                            ogImage={this.state.ogImage}
                        />
                        {
                            templateData.length > 0
                                ?
                                <>
                                    <div className="sets-container">
                                        {/* Main Section End */}
                                        <section id="catalogue-download">
                                            <div className="container">
                                                <div className="row" style={{ "alignItems": "center", "justifyContent": "center" }}>
                                                    <div className="text-center">

                                                        <div className="sets-container" dangerouslySetInnerHTML={{ __html: templateData[0].title }} />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div>
                                    {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
                                </>
                                :
                                null
                        }
                    </>
                }
            </React.Fragment>   
        )
    }
}

// export default withRouter(withTranslation()(CatologueDownload))

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(CatologueDownload)