import React, { Component } from 'react';
// import { withTranslation } from 'react-i18next';
import { withRouter } from 'next/router';
import { getAPI } from '../../utils/api';
import MetaDecorator from '../../utils/MetaDecorator';
import { getCurrentLocaleFromUrl } from '../../utils/helperFunctions';
import LoadingSkeleton from '../../component/LoadingSkeleton';
// import Footer from './../Footer/Footer';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class PrivacyPolicy extends Component {
  state = {
    textBanner: [],
    seoTitle: '',
    language: '',
    isLoading: true,
  }

  loadData = () => {
    const { language } = this.state;

    getAPI(`template/getMenuTemplates/7?lang=${language}`)
      .then(res => {
        const allData = res.data.data;
        this.setState({
          textBanner: allData.filter(value => value.type === "textBanner")[0].templateData,
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
  }

  componentDidMount() {
    // window.scrollTo(0, 0)
    const r = this.props.router;
    const lang  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    // let langus = localStorage.getItem("languages")
    //     if(langus && !langus.includes(lang)){
    //         this.props.history.push("/NotFound")
    //     }
    // let lang = 'en'
    if (lang) {
      this.setState({
        language: lang
      }, () => {
        this.loadData();
      })
    }
  }

//   componentDidUpdate(prevProps) {
//     if (this.props.i18n.language.split('-')[0] !== prevProps.language && prevProps.language !== "") {
//       this.setState({
//         language: this.props.i18n.language.split('-')[0]
//       }, () => {
//         let { language } = this.state
//         let oldroute = this.props.location.pathname
//         let oldrouteSplit = oldroute.split('/')
//         oldrouteSplit.splice(oldrouteSplit.length - 1, 1, language)
//         let newroute = oldrouteSplit.join('/')
//         this.props.history.push(newroute)
//         this.loadData()
//       })
//       // this.staticMultilingual(this.props.language)
//     }
//   }

  render() {
    const { textBanner, langObj, isLoading } = this.state;
    // console.log(textBanner, this.props.language)
    return (
      <React.Fragment>
        {
          isLoading
          ?
          <LoadingSkeleton />
          :
          textBanner.length && <>
            <MetaDecorator
              title={this.state.seoTitle.innerText ? this.state.seoTitle.innerText : ''}
              description={''}
              keywords={''}
              ogTitle={this.state.ogTitle}
              ogDescription={this.state.ogDescription}
              ogImage={this.state.ogImage}
            />
            <div className="sets-container" dangerouslySetInnerHTML={{ __html: textBanner[0].title }} />
            {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
          </>
        }
        
        
      </React.Fragment>
    )
  }
}

// export default withRouter(withTranslation()(PrivacyPolicy))

// export async function getStaticProps ({ locale }) {
//   return {
//       props: {
//         ...await serverSideTranslations(locale, ['common']),
//       },
//     }
// }

export default withRouter(PrivacyPolicy)