import React, { Component } from 'react'
// import { withTranslation } from 'react-i18next';
import { withRouter } from 'next/router';
import { getAPI } from '../../utils/api';
import MetaDecorator from '../../utils/MetaDecorator';
import { getCurrentLocaleFromUrl, projectLanguages } from '../../utils/helperFunctions';
import LoadingSkeleton from '../../component/LoadingSkeleton';
import IframeStoreLoactor from '../../component/iframeStoreLocator';
import CustomImage from '../../component/custom-image';
import { Baseurl } from '../../utils/BaseUrl';
// import Footer from '../Footer/Footer'
// import bg_img_o from '../../Assets/img/distributor-banner.png'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class StoreLocator extends Component {
    state = {
        topBanner: [],
        langObj: {},
        seoTitle: '',
        language: "",
        isLoading: true 
    }

    // loadData = () => {
    //     const { language } = this.state;

    //     getAPI(`template/getMenuTemplates/9?lang=${language}`)
    //         .then(res => {
    //             const allData = res.data.data;
    //             this.setState({
    //                 topBanner: allData.filter(value => value.type === "topBanner")[0].templateData,
    //                 isLoading: false
    //             }, () => {
    //                 let metas = document.getElementsByTagName("title");
    //                 let meta = document.getElementsByTagName('meta');
    //                 for (let i = 0; i < meta.length; i++) {
    //                     if (meta[i].getAttribute('name') === 'keywords') {
    //                         this.setState({
    //                             keywords: meta[i].getAttribute('content')
    //                         })
    //                     }
    //                     if (meta[i].getAttribute('name') === 'description') {
    //                         this.setState({
    //                             description: meta[i].getAttribute('content')
    //                         })
    //                     }
    //                     if (meta[i].getAttribute('property') === 'og:title') {
    //                         this.setState({
    //                             ogTitle: meta[i].getAttribute('content')
    //                         })
    //                     }
    //                     if (meta[i].getAttribute('property') === 'og:description') {
    //                         this.setState({
    //                             ogDescription: meta[i].getAttribute('content')
    //                         })
    //                     }
    //                     if (meta[i].getAttribute('property') === 'og:image') {
    //                         this.setState({
    //                             ogImage: meta[i].getAttribute('content')
    //                         })
    //                     }
    //                 }
    //                 this.setState({
    //                     seoTitle: metas[metas.length - 1]
    //                 })
    //             })
    //         }).catch(err => console.log(err));
    // }

    // componentDidMount() {
    //     // window.scrollTo(0, 0)
    //     const r = this.props.router;
    //     const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    //     // let langus = localStorage.getItem("languages")
    //     // if(langus && !langus.includes(lang)){
    //     //     this.props.history.push("/NotFound")
    //     // }
    //     // let lang = 'en'
    //     if (lang) {
    //         this.setState({
    //             language: lang
    //         }, () => {
    //             this.loadData();
    //         })
    //     }
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split('-')[0] !== prevProps.language && prevProps.language !== "") {
    //         // this.staticMultilingual(this.props.language)
    //         this.setState({
    //             lang_i: this.props.i18n.language.split('-')[0]
    //         }, () => {
    //             let { lang_i } = this.state
    //             let oldroute = this.props.location.pathname
    //             let oldrouteSplit = oldroute.split('/')
    //             oldrouteSplit.splice(oldrouteSplit.length - 1, 1, lang_i)
    //             let newroute = oldrouteSplit.join('/')
    //             this.props.history.push(newroute)
    //             this.loadData();
    //         })
    //     }
    // }


    render() {
        const { topBanner, langObj, isLoading } = this.state;
        const {allTemplates} = this.props
        const r = this.props.router;
        const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)

        const data = allTemplates.filter(temp => Object.keys(temp)[0] === lang)[0]
        const pageData = data[lang]
        return (

            <React.Fragment>
                {
                    // isLoading
                    //     ?
                    //     <LoadingSkeleton />
                    //     :
                    //     topBanner.length > 0 && 
                    <>
                        <MetaDecorator
                            title={pageData?.ogFields?.ogTitle  ?  pageData?.ogFields?.ogTitle : ""}
                            description={pageData?.ogFields?.ogDescription  ? pageData?.ogFields?.ogDescription : ""}
                            // keywords={keywords}
                            ogTitle={pageData?.ogFields?.ogTitle  ?  pageData?.ogFields?.ogTitle : ""}
                            ogDescription={pageData?.ogFields?.ogDescription  ? pageData?.ogFields?.ogDescription : ""}
                            ogImage={pageData?.ogFields?.ogImage  ? pageData?.ogFields?.ogImage : ""}
                        />
                        <section className="inner-banner kp-mid_banner">
                        <CustomImage id="#top-banner" src="https://knitpro-prod.s3.amazonaws.com/static/distributor-banner.png" alt="" />
                        </section>
                        <section id="faqmain">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12">
                                        <h1 style={{ textAlign: 'center' }}>YOUR LOCAL YARN STORE</h1>
                                        <IframeStoreLoactor />
                                        <div className="sets-container" dangerouslySetInnerHTML={{ __html:  pageData.templateData[0].title }} />
                                    </div>
                                </div>
                            </div>
                        </section>
                            {/* <IframeStoreLoactor/> */}

                            {/* <iframe id="storeL" className="d-none u-77-show" src="http://18.208.41.11/storelocator/index.html" title="store locator" width="100%"></iframe> */}
                            {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
                        </>
                }
            </React.Fragment>

        )
    }

    iframeRender() {
        return (
            <>
                <iframe
                    src="https://mindful.knitterspride.com/demo-store/store"
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ border: 'none' }}
                    allowFullScreen
                />
                {/* <Footer allLanguage={this.props.allLanguage} /> */}
            </>
        )
    }
}

export async function getStaticProps() {

    
    //   const languageRes = await fetch (`${Baseurl}language/language?lang=en`)
    //   const languageData = await languageRes.json()
    //   const allLanguage = languageData.data
    const getPageProps = async (lang) => {
        const res = await fetch(`${Baseurl}template/getMenuTemplates/9?lang=${lang}`)
        const data = await res.json()
        const templateArray = data.data
        const template = (templateArray.filter(temp => temp.type === 'topBanner'))[0]
        return ({ [lang]: template })
    }
        
    
    return {
        props: {
            allTemplates: [
                await getPageProps(projectLanguages[0]),
                await getPageProps(projectLanguages[1])
            ]
        }
    };
}

// export default withRouter(withTranslation()(StoreLocator))

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(StoreLocator)