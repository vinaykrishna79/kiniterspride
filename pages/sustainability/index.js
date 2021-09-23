import React, { Component } from 'react';
import { getAPI } from '../../utils/api';
import MetaDecorator from '../../utils/MetaDecorator';
// import Footer from '../../Footer/Footer';
import { withRouter } from 'next/router';
// import { withTranslation } from 'react-i18next';
import { getCurrentLocaleFromUrl, projectLanguages } from '../../utils/helperFunctions';
import LoadingSkeleton from '../../component/LoadingSkeleton';
import { Baseurl } from '../../utils/BaseUrl';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class Sustainability extends Component {
    state = {
        isLoading: true,
        // allTemplates: [],
        topBanner: [],
        seoTitle: '',
        langObj: {},
        language: "",
        keywords: '',
        description: ''
        // banner1: [], banner2: [], banner3: [],
        // banner4: [], banner5: [], banner6: [],
        // banner7: [],
    }

    // componentDidMount() {
    //     // window.scrollTo(0, 0)
    //     // let langus = localStorage.getItem("languages")
    //     const r = this.props.router;
    //     const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    //     // if (langus && langus.includes(lang)) {
    //         this.setState({
    //             language: lang
    //         }, () => {
    //             getAPI(`template/getMenuTemplates/5?lang=${this.state.language}`)
    //                 .then(res => {
    //                     const allData = res.data.data;
    //                     this.setState({
    //                         topBanner: allData.filter(value => value.type === "topBanner")[0].templateData,
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
    //                 }).catch(err => console.log(err));
    //         })
    //     // }else{
    //     //     this.props.history.push('/NotFound')
    //     // }
        
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
    //             getAPI(`template/getMenuTemplates/5?lang=${this.state.language}`)
    //                 .then(res => {
    //                     const allData = res.data.data;
    //                     this.setState({
    //                         topBanner: allData.filter(value => value.type === "topBanner")[0].templateData,

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
    //                 }).catch(err => console.log(err));
    //         })
    //     }
    // }

    render() {
        const { topBanner, isLoading, langObj, keywords, description } = this.state;
        // console.log(topBanner, this.props.language)

        const {allTemplates} = this.props
        const r = this.props.router;
        const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)

        const data = allTemplates.filter(temp => Object.keys(temp)[0] === lang)[0]
        const pageData = data[lang]

        return (
            // isLoading ? <LoadingSkeleton /> :
            //     topBanner.length &&
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
                    {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
                </React.Fragment>
        )
    }
}


export async function getStaticProps() {

    
    //   const languageRes = await fetch (`${Baseurl}language/language?lang=en`)
    //   const languageData = await languageRes.json()
    //   const allLanguage = languageData.data
    const getPageProps = async (lang) => {
        const res = await fetch(`${Baseurl}template/getMenuTemplates/5?lang=${lang}`)
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

// export default withRouter(withTranslation()(Sustainability))

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(Sustainability)