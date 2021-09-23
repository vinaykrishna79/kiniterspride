import React, { Component } from 'react'
// import { withTranslation } from 'react-i18next';
import { withRouter } from 'next/router';
// import SocialCarousel from '../../../Component/SocialCarousel'
// import bg_img_o from '../../../Assets/img/csr-banner.jpg';
import { getAPI } from '../../utils/api';
// import { withTranslation } from 'next-i18next';
import MetaDecorator from '../../utils/MetaDecorator';
import { getCurrentLocaleFromUrl, projectLanguages } from '../../utils/helperFunctions';
import LoadingSkeleton from '../../component/LoadingSkeleton';
import { Baseurl } from '../../utils/BaseUrl';
// import Footer from '../../Footer/Footer';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class SocialContribution extends Component {
    state = {
        isLoading: true,
        // allTemplates: [],
        // topBanner: [],
        textBanner1: [],
        seoTitle: '',
        langObj: {},
        language: '',
        keywords: '',
        description: ''
        // bannerList1: [],
        // bannerList2: [],
        // banner3: [],
        // banner4: []
    }

    // componentDidMount() {
    //     // const { language } = this.props;
    //     // window.scrollTo(0, 0)
    //     const r = this.props.router;
    //     const lang  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    //     // let langus = localStorage.getItem("languages")
    //     // if(langus && !langus.includes(lang)){
    //     //     this.props.history.push("/NotFound")
    //     // }
    //     // let lang = 'en'
    //     if (lang) {
    //         this.setState({
    //             language: lang
    //         }, () => {
    //             getAPI(`template/getMenuTemplates/3?lang=${this.state.language}`)
    //                 .then(res => {
    //                     const allData = res.data.data;
    //                     this.setState({
    //                         textBanner1: allData.filter(value => value.type === "textBanner1")[0].templateData,
    //                         isLoading: false
    //                     }, () => {
    //                         let metas = document.getElementsByTagName("title");
    //                         let meta = document.getElementsByTagName('meta');
    //                         for (let i = 0; i < meta.length; i++) {
    //                             if (meta[i].getAttribute('name') === 'keywords') {
    //                                 this.setState({
    //                                     keywords: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                             if (meta[i].getAttribute('name') === 'description') {
    //                                 this.setState({
    //                                     description: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                             if (meta[i].getAttribute('property') === 'og:title') {
    //                                 this.setState({
    //                                     ogTitle: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                             if (meta[i].getAttribute('property') === 'og:description') {
    //                                 this.setState({
    //                                     ogDescription: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                             if (meta[i].getAttribute('property') === 'og:image') {
    //                                 this.setState({
    //                                     ogImage: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                         }
    //                         this.setState({
    //                             seoTitle: metas[metas.length - 1]
    //                         })
    //                     })
    //                     // console.log(allData.filter(value => value.type === "bannerList1")[0].templateData);
    //                 }).catch(err => console.log(err));
    //         })
    //     }
    // }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split('-')[0] !== prevProps.language && prevProps.language !== "") {
    //         this.setState({
    //             language: this.props.i18n.language.split('-')[0]
    //         }, () => {
    //             let { language } = this.state
    //             let oldroute = this.props.location.pathname
    //             let oldrouteSplit = oldroute.split('/')
    //             oldrouteSplit.splice(oldrouteSplit.length - 1, 1, language)
    //             let newroute = oldrouteSplit.join('/')
    //             this.props.history.push(newroute)
    //             getAPI(`template/getMenuTemplates/3?lang=${this.state.language}`)
    //                 .then(res => {
    //                     const allData = res.data.data;
    //                     this.setState({
    //                         textBanner1: allData.filter(value => value.type === "textBanner1")[0].templateData,
    //                         isLoading: false
    //                     }, () => {
    //                         let metas = document.getElementsByTagName("title");
    //                         let meta = document.getElementsByTagName('meta');
    //                         for (let i = 0; i < meta.length; i++) {
    //                             if (meta[i].getAttribute('name') === 'keywords') {
    //                                 this.setState({
    //                                     keywords: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                             if (meta[i].getAttribute('name') === 'description') {
    //                                 this.setState({
    //                                     description: meta[i].getAttribute('content')
    //                                 })
    //                             }
    //                         }
    //                         this.setState({
    //                             seoTitle: metas[metas.length - 1]
    //                         })
    //                     })
    //                     // console.log(allData.filter(value => value.type === "bannerList1")[0].templateData);
    //                 }).catch(err => console.log(err));
    //         })
    //     }
    // }

    render() {
        const { textBanner1, isLoading, langObj, description, keywords } = this.state;
        // console.log(textBanner1, this.props.language)

        const {allTemplates} = this.props
        const r = this.props.router;
        const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)

        const data = allTemplates.filter(temp => Object.keys(temp)[0] === lang)[0]
        const pageData = data[lang]
        return (
            // isLoading ? <LoadingSkeleton /> :
                // textBanner1.length &&
                <React.Fragment>
                    <MetaDecorator
                        title={pageData?.ogFields?.ogTitle  ?  pageData?.ogFields?.ogTitle : ""}
                        description={pageData?.ogFields?.ogDescription  ? pageData?.ogFields?.ogDescription : ""}
                        keywords={keywords}
                        ogTitle={pageData?.ogFields?.ogTitle  ?  pageData?.ogFields?.ogTitle : ""}
                        ogDescription={pageData?.ogFields?.ogDescription  ? pageData?.ogFields?.ogDescription : ""}
                        ogImage={pageData?.ogFields?.ogImage  ? pageData?.ogFields?.ogImage : ""}
                    />
                    <div className="sets-container" dangerouslySetInnerHTML={{ __html:  pageData.templateData[0].title }} />
                    {/* <Footer allLanguage={this.props.allLanguage} /> */}
                </React.Fragment>
        )
    }
}


export async function getStaticProps() {

    
    //   const languageRes = await fetch (`${Baseurl}language/language?lang=en`)
    //   const languageData = await languageRes.json()
    //   const allLanguage = languageData.data
    const getPageProps = async (lang) => {
        const res = await fetch(`${Baseurl}template/getMenuTemplates/3?lang=${lang}`)
        const data = await res.json()
        const templateArray = data.data
        const template = (templateArray.filter(temp => temp.type === 'textBanner1'))[0]
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

// export default withRouter(withTranslation()(SocialContribution))

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

    export default withRouter(SocialContribution);