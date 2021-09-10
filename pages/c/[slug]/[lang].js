import React from 'react';
import Ginger from "../../../component/Ginger";
import { getAPI } from "../../../utils/api";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withRouter } from 'next/router'
import { Baseurl } from '../../../utils/BaseUrl';
import MetaDecorator from '../../../utils/MetaDecorator';
// import { withTranslation } from "react-i18next";

class ProductList extends React.Component {
    state = {
        types: {},
        brands: {},
        materials: {},
        ids: {},
        isLoader: true
    }  

    async componentDidMount(){
        
        }

    connectHeaderGinger = async (unique, categoryid, subcategid, langId) => {
        let ids = {
            categId: categoryid,
            subcategId: subcategid,
        };
        this.setState({ ids })
        // this.setState({ isLoader: true });
        if (unique === "brand") {
            await getAPI(`brand/brandProductTypes?bslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`)
                .then(async (res) => {
                    const { status, data } = res.data;
                    // console.log("brand res  ", res);
                    if (status === 1) {
                     
                        await this.setState({
                            brands: data,
                            types: {},
                            materials: {},
                            isLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    // createBrowserHistory().push("/NotFound");
                    // window.location.reload();
                });
        } else if (unique === "type") {
            getAPI(`brand/brandshavingType?tslug=${ids.subcategId}&lang=${langId}`)
                .then((res) => {
                    const { status, data } = res.data;
                    // console.log("type res  ", res);
                    if (status === 1) {
                        
                        this.setState({
                            types: data,
                            brands: {},
                            materials: {},
                            isLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    // createBrowserHistory().push("/NotFound");
                    // window.location.reload();
                });
        } else if (unique === "material") {
            getAPI(`brand/brandshavingMaterial?mslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`)
                .then((res) => {
                    const { status, data } = res.data;
                    // console.log("material res   ", res);
                    if (status === 1) {
                      
                        this.setState({
                            materials: data,
                            brands: {},
                            types: {},
                            isLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    // createBrowserHistory().push("/NotFound");
                    // window.location.reload();
                });
        }
        // for mobile view header close
        document.getElementById("navbarclose").click();
    };
    render(){
        const {seoFields} = this.props
        return(
            <>
                <MetaDecorator
                    title={seoFields?.seoTitle ? seoFields?.seoTitle : ""}
                    description={seoFields?.seoDesc ? seoFields?.seoDesc : ""}
                    keywords={seoFields?.seoKeywords ? seoFields?.seoKeywords : ""}
                    ogTitle={seoFields?.ogFields?.ogTitle ? seoFields?.ogFields?.ogTitle : ""}
                    ogDescription={seoFields?.ogFields?.ogDescription ? seoFields?.ogFields?.ogDescription : ""}
                    ogImage={seoFields?.ogFields?.ogImage ? seoFields?.ogFields?.ogImage : ""}
                />
                <Ginger
                    {...this.state}
                    id="c"
                    connectHeaderGinger={this.connectHeaderGinger}
                    seoFields={this.props.seoFields}
                />
            </>
        )
    }
}

export async function getStaticPaths() {
    let paths = []
        const res3 = await fetch(`${Baseurl}category/slugs`)
        const data3 = await res3.json()
        const catData = data3.data

        const res4 = await fetch(`${Baseurl}material/slugs`)
        const data4 = await res4.json()
        const materialData = data4.data

        for(let lang in catData){
            for(let catslug of catData[lang]){
                for(let materialslug of materialData[lang]){
                    if(lang === "en" || lang === "es"){
                        paths.push(`/c/${materialslug.slug}-${catslug.slug}/${lang}`);
                    }
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
    //     '/c/first-post',
    //     // Object variant:
    //      { params: { slug: 'second-post' } },
    //   ],
    //   fallback: true,
    // }
  }

//   export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

//   export default withTranslation()(withRouter(ProductList));


export async function getStaticProps({ params: {slug, lang} }) {
    let res
    if(slug.includes("-sets")){
        res = await fetch(`${Baseurl}brand/brandshavingMaterial?mslug=${slug.replace("-sets","")}&cslug=${"sets"}&lang=${lang}`)
    } else if(slug.includes("-crochet")){
        res = await fetch(`${Baseurl}brand/brandshavingMaterial?mslug=${slug.replace("-crochet","")}&cslug=${"crochet"}&lang=${lang}`)
    } else {
        res = await fetch(`${Baseurl}brand/brandshavingMaterial?mslug=${slug.replace("-needles", "")}&cslug=${"needles"}&lang=${lang}`)
    }

    const data = await res.json();
    const resData = data.data
    const seoFields = resData?.seoFields
    return {
      props: {
        seoFields: seoFields ? seoFields : null
      }
    };
}

export default withRouter(ProductList)
