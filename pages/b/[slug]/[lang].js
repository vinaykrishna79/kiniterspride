import React from "react";
import { withRouter } from "next/router";
import Ginger from "../../../component/Ginger";
import { getAPI } from "../../../utils/api";
import { Baseurl } from "../../../utils/BaseUrl";
import MetaDecorator from "../../../utils/MetaDecorator";
// import { withTranslation } from "react-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

class ProductList extends React.Component {
  state = {
    types: {},
    brands: {},
    materials: {},
    ids: {},
    isLoader: true,
  };

  async componentDidMount() {
    // let paths = [];
    // const res3 = await fetch("https://devapi.knitpro.eu/category/slugs");
    // const data3 = await res3.json();
    // const catData = data3.data;

    // const res1 = await fetch("https://devapi.knitpro.eu/type/slugs");
    // const data1 = await res1.json();
    // const typeData = data1.data;

    // for (let lang in catData) {
    //   for (let typeslug of typeData[lang]) {
    //       if(typeslug.hasBrand){
    //           paths.push(`/b/${typeslug.slug}`);
    //       }
    //   }
    // }
    // console.log(paths);

    this.setState({
      types: this.props.data,
      brands: {},
      materials: {},
      isLoader: false,
    });

    // for mobile view header close
    document.getElementById("navbarclose").click();
  }

  // connectHeaderGinger = async (unique, categoryid, subcategid, langId) => {
    // let ids = {
    //   categId: categoryid,
    //   subcategId: subcategid,
    // };
    // this.setState({ ids });
    // // this.setState({ isLoader: true });
    // if (unique === "brand") {
    //   await getAPI(
    //     `brand/brandProductTypes?bslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`
    //   )
    //     .then(async (res) => {
    //       const { status, data } = res.data;
    //       // console.log("brand res  ", res);
    //       if (status === 1) {
    //         await this.setState({
    //           brands: data,
    //           types: {},
    //           materials: {},
    //           isLoader: false,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       // createBrowserHistory().push("/NotFound");
    //       // window.location.reload();
    //     });
    // } else if (unique === "type") {
    //   getAPI(`brand/brandshavingType?tslug=${ids.subcategId}&lang=${langId}`)
    //     .then((res) => {
    //       const { status, data } = res.data;
    //       // console.log("type res  ", res);
    //       if (status === 1) {
    //         this.setState({
    //           types: data,
    //           brands: {},
    //           materials: {},
    //           isLoader: false,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       // createBrowserHistory().push("/NotFound");
    //       // window.location.reload();
    //     });
    // } else if (unique === "material") {
    //   getAPI(
    //     `brand/brandshavingMaterial?mslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`
    //   )
    //     .then((res) => {
    //       const { status, data } = res.data;
    //       // console.log("material res   ", res);
    //       if (status === 1) {
    //         this.setState({
    //           materials: data,
    //           brands: {},
    //           types: {},
    //           isLoader: false,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       // createBrowserHistory().push("/NotFound");
    //       // window.location.reload();
    //     });
    // }

    // this.setState({
    //   types: this.props.data,
    //   brands: {},
    //   materials: {},
    //   isLoader: false,
    // });
    // // for mobile view header close
    // document.getElementById("navbarclose").click();
  // };

  render() {
    const {seoFields} = this.props
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
          seoFields={this.props.seoFields}
          id="b"
          // connectHeaderGinger={this.connectHeaderGinger}
        />
      </>
    );
  }
}

export async function getStaticPaths() {
    // let paths = [];
    // const res3 = await fetch(`${Baseurl}category/slugs`);
    // const data3 = await res3.json();
    // const catData = data3.data;

    // const res1 = await fetch(`${Baseurl}type/slugs`);
    // const data1 = await res1.json();
    // const typeData = data1.data;

    // for (let lang in catData) {
    //     for (let typeslug of typeData[lang]) {
    //         // if(typeslug.hasBrand){
    //             if(lang === "en" || lang === "es"){
    //               paths.push(`/b/${typeslug.slug}/${lang}`);
    //             }
    //         // }
    //     }
    //   }
    let paths = [];
    const res = await fetch(`${Baseurl}pagePaths/typeDetail/b`)
    const data = await res.json()
    const pathArray = data.data
    for(let index in pathArray){
      
      const pathsForLang = Object.values(pathArray[index])[0] // getting paths for each language 
      paths.push(...pathsForLang)
    }

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: {slug, lang} }) {
  const res = await fetch(`${Baseurl}brand/brandshavingType?tslug=${slug}&lang=${lang}`)
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