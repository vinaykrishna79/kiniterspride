import React from "react";
import { withRouter } from 'next/router'
import Ginger from "../../../component/Ginger";
import { getAPI } from "../../../utils/api";
import { Baseurl } from "../../../utils/BaseUrl";
import MetaDecorator from "../../../utils/MetaDecorator";
// import { withTranslation } from "react-i18next";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class ProductList extends React.Component {
    state = {
        types: {},
        brands: {},
        materials: {},
        ids: {},
        isLoader: true,
    }

    async componentDidMount() {
        this.setState({
            brands: this.props.data,
            materials: {},
            types: {},
            isLoader: false,
        });

        // for mobile view header close
        document.getElementById("navbarclose").click();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.router.asPath !== prevProps.router.asPath) {
            this.setState({
                brands: this.props.data,
                materials: {},
                types: {},
                isLoader: false,
            });
        }
    }

    // connectHeaderGinger = async (unique, categoryid, subcategid, langId) => {
    // let ids = {
    //     categId: categoryid,
    //     subcategId: subcategid,
    // };
    // this.setState({ ids })
    // // this.setState({ isLoader: true });
    // if (unique === "brand") {
    //     await getAPI(`brand/brandProductTypes?bslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`)
    //         .then(async (res) => {
    //             const { status, data } = res.data;
    //             // console.log("brand res  ", res);
    //             if (status === 1) {
    //                 console.log("data find------", data)
    //                 await this.setState({
    //                     brands: data,
    //                     types: {},
    //                     materials: {},
    //                     isLoader: false,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             // createBrowserHistory().push("/NotFound");
    //             // window.location.reload();
    //         });
    // } else if (unique === "type") {
    //     getAPI(`brand/brandshavingType?tslug=${ids.subcategId}&lang=${langId}`)
    //         .then((res) => {
    //             const { status, data } = res.data;
    //             // console.log("type res  ", res);
    //             if (status === 1) {
    //                 console.log("data------", data)
    //                 this.setState({
    //                     types: data,
    //                     brands: {},
    //                     materials: {},
    //                     isLoader: false,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             // createBrowserHistory().push("/NotFound");
    //             // window.location.reload();
    //         });
    // } else if (unique === "material") {
    //     getAPI(`brand/brandshavingMaterial?mslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`)
    //         .then((res) => {
    //             const { status, data } = res.data;
    //             // console.log("material res   ", res);
    //             if (status === 1) {
    //                 console.log("data------", data)
    //                 this.setState({
    //                     materials: data,
    //                     brands: {},
    //                     types: {},
    //                     isLoader: false,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             // createBrowserHistory().push("/NotFound");
    //             // window.location.reload();
    //         });
    // }

    // console.log("data-------1", this.props.data)
    // this.setState({
    //     brands: this.props.data,
    //     materials: {},
    //     types: {},
    //     isLoader: false,
    // });
    // // for mobile view header close
    // document.getElementById("navbarclose").click();
    // };

    render() {
        const { seoFields } = this.props
        return (
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
                    id="a"
                    // connectHeaderGinger={this.connectHeaderGinger}
                    seoFields={this.props.seoFields}
                />
                {/* <h1> Hello</h1> */}
            </>
        )
    };
}

export async function getStaticPaths() {
    // let paths = []

    //     const res2 = await fetch(`${Baseurl}brand/slugs`)
    //     const data2 = await res2.json()
    //     const brandData = data2.data

    //     const res3 = await fetch(`${Baseurl}category/slugs`)
    //     const data3 = await res3.json()
    //     const catData = data3.data

    //     for(let lang in catData){
    //         for(let catslug of catData[lang]){
    //             for(let brandslug of brandData[lang]){
    //                 if(lang === "en" || lang === "es"){
    //                 if((catslug.slug).trim() === "needles" || (catslug.slug).trim() === "stricken" || (catslug.slug).trim() === "aguja" || (catslug.slug).trim() === "??????" || (catslug.slug).trim() === "??????????-ne"){
    //                     paths.push(`/a/${brandslug.slug}/${lang}`)
    //                 }else{
    //                     paths.push(`/a/${brandslug.slug}-${catslug.slug}/${lang}`);
    //                 }
    //             }
    //             }

    //         }
    //     }
    let paths = [];
    const res = await fetch(`${Baseurl}pagePaths/brandDetail/a`)
    const data = await res.json()
    const pathArray = data.data
    for (let index in pathArray) {

        const pathsForLang = Object.values(pathArray[index])[0] // getting paths for each language 
        paths.push(...pathsForLang)
    }

    return {
        paths,
        fallback: false
    }
}

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export async function getStaticProps({ params: { slug, lang } }) {
    let res
    if (slug.includes("-sets")) {
        res = await fetch(`${Baseurl}brand/brandProductTypes?bslug=${slug.replace("-sets", "")}&cslug=${"sets"}&lang=${lang}`)
    } else if (slug.includes("-crochet")) {
        res = await fetch(`${Baseurl}brand/brandProductTypes?bslug=${slug.replace("-crochet", "")}&cslug=${"crochet"}&lang=${lang}`)
    } else {
        res = await fetch(`${Baseurl}brand/brandProductTypes?bslug=${slug}&cslug=${"needles"}&lang=${lang}`)
    }
    const data = await res.json();
    const resData = data.data
    const seoFields = resData?.seoFields
    return {
        props: {
            seoFields: seoFields ? seoFields : null,
            data: resData
        }
    };
}

export default withRouter(ProductList)