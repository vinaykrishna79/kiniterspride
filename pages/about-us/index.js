import React, { Component } from 'react'
// import AwardsSlider from '../../../Component/AwardsSlider'
// import bg_img_o from '../../../Assets/img/aboutbanner.jpg'
import { getAPI } from '../../utils/api';
// import Footer from '../../Footer/Footer';
import { withRouter } from 'next/router';
import MetaDecorator from '../../utils/MetaDecorator';
import { getCurrentLocaleFromUrl } from '../../utils/helperFunctions';
import LoadingSkeleton from '../../component/LoadingSkeleton';
// import { withTranslation } from 'react-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class AboutUs extends Component {
    state = {
        isLoading: true,
        allTemplates: [],
        topBannerList: [],
        bannerList1: [],
        textBanner: [],
        videoBanner: [],
        bannerList2: [],
        awardBanner: [],
        seoTitle: '',
        language: '',
        keywords: '',
        description: ''
    }

    componentDidMount() {
        // const { language } = this.props;
        // // console.log(this.props.match.params);
        // window.scrollTo(0, 0)
        // let lang = this.props.i18n.language
        const r = this.props.router;
        const lang  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        // let langus = localStorage.getItem("languages")
        // if(langus && !langus.includes(lang)){
        //     this.props.history.push("/NotFound")
        // }
        // let lang = 'en'
        if (lang) {
            this.setState({ language: lang }, () => {
                getAPI(`template/getMenuTemplates/2?lang=${this.state.language}`)
                    .then(res => {
                        // console.log(res);
                        const allData = res.data.data;
                        this.setState({
                            allTemplates: allData,
                            topBannerList: allData.filter(value => value.type === "topBannerList")[0].templateData,
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
                    }).catch(err => console.log(err));
            })
        }
    }

    // setChangedLanguage = (lang) => {
    //     this.setState({ language: lang })
    // }

    // componentDidUpdate(prevProps) {
      
    //     if (this.props.i18n.language.split('-')[0] !== prevProps.language && prevProps.language !== "") {
        
    //         this.setState({
    //             isLoading: true,
    //             language: this.props.i18n.language.split('-')[0]
    //         }, () => {
    //             let { language } = this.state
    //             let oldroute = this.props.location.pathname
    //             let oldrouteSplit = oldroute.split('/')
    //             oldrouteSplit.splice(oldrouteSplit.length - 1, 1, language)
    //             let newroute = oldrouteSplit.join('/')
    //             this.props.history.push(newroute)
    //             getAPI(`template/getMenuTemplates/2?lang=${this.state.language}`)
    //                 .then(res => {
    //                     // console.log(res);
    //                     const allData = res.data.data;
    //                     this.setState({
    //                         allTemplates: allData,
    //                         topBannerList: allData.filter(value => value.type === "topBannerList")[0].templateData,
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
        const { topBannerList, isLoading, langObj, keywords, description } = this.state;
        // console.log(topBannerList, this.props.language)
        return (
            isLoading 
            ? 
            <LoadingSkeleton /> 
            :
            topBannerList.length &&
                <React.Fragment>
                    <MetaDecorator
                        title={this.state.seoTitle.innerText ? this.state.seoTitle.innerText : ''}
                        description={description}
                        keywords={keywords}
                        ogTitle={this.state.ogTitle}
                        ogDescription={this.state.ogDescription}
                        ogImage={this.state.ogImage}
                    />
                    <div className="sets-container" dangerouslySetInnerHTML={{ __html: topBannerList[0].title }} />
                    {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
                </React.Fragment>
        )
    }
}

// export default withRouter(withTranslation()(AboutUs))

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(AboutUs)