import React from "react";
import { withRouter } from "next/router";
import ProductDetails from "../../../../component/ProductDetails";
import { getAPI } from "../../../../utils/api";
import { Baseurl } from "../../../../utils/BaseUrl";
import Head from "next/head";
import MetaDecorator from "../../../../utils/MetaDecorator";
import axios from "axios";
// import { withTranslation } from "react-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

class ProductDetail extends React.Component {
  async componentDidMount() {
  //   let paths = [];
  //   const res1 = await fetch('https://devapi.knitpro.eu/brand/slugs')
  //   const data1 = await res1.json()
  //   const brandData = data1.data

  //   const res2 = await fetch('https://devapi.knitpro.eu/product/slugs')
  //   const data2 = await res2.json()
  //   const productData = data2.data

  //   for(let lang in brandData){
  //     for(let brandslug of brandData[lang]){
  //         for(let productslug of productData[lang]){
  //             paths.push(`/d/${brandslug.slug}/${productslug.slug}`);
  //         }
  //     }
  // }
  // console.log(paths);
  // return {
  //     paths,
  //     fallback: false
  // }
  }

  render() {
    const {seoFields} = this.props
    const {router: {asPath}} = this.props
    return (
      <>
        <MetaDecorator
          title={seoFields?.seoTitle ? seoFields?.seoTitle : ""}
          description={ seoFields?.seoMetadesc ? seoFields?.seoMetadesc : "" }
          keywords={ seoFields?.seoMetaKeyword ? seoFields?.seoMetaKeyword : ""  }
          ogTitle={seoFields?.ogFields?.ogTitle ? seoFields?.ogFields?.ogTitle : "..."}
          ogDescription={seoFields?.ogFields?.ogDescription ? seoFields?.ogFields?.ogDescription : "..."}
          ogImage={seoFields?.ogFields?.ogImage ? seoFields?.ogFields?.ogImage : "..."}
        />
        <ProductDetails />
      </>
    );
  }
}

export async function getStaticPaths() {
    // let paths = [];
    // const res1 = await fetch(`${Baseurl}brand/slugs`)
    // const data1 = await res1.json()
    // const brandData = data1.data

    // const res2 = await fetch(`${Baseurl}product/slugs`)
    // const data2 = await res2.json()
    // const productData = data2.data

    // for(let lang in brandData){
    //   for(let brandslug of brandData[lang]){
    //       for(let productslug of productData[lang]){
    //         if(lang === "en" || lang === "es"){
    //           paths.push(`/d/${brandslug.slug}/${productslug.slug}/${lang}`);
    //         }
              
    //       }
    //   }
    // }

    let paths = [];
    const res = await fetch(`${Baseurl}pagePaths/productDetail/d`)
    const data = await res.json()
    const pathArray = data.data
    for(let index in pathArray){
      
      const pathsForLang = Object.values(pathArray[index])[0] // getting paths for each language 
      paths.push(...pathsForLang)
    }

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params: {brandSlug, productSlug, lang} }) {
  const res= await fetch(`${Baseurl}product/byBrandAndType?bslug=${brandSlug}&pslug=${productSlug}&lang=${lang}`)
  const data = await res.json();
  const product = data.products?.[0]
  const seoFields = {
    seoTitle: product?.seoTitle ? product?.seoTitle : "",
    seoMetaKeyword: product?.seoMetaKeyword ? product?.seoMetaKeyword : "",
    seoMetadesc: product?.seoMetadesc ? product?.seoMetadesc : "",
    ogFields: product?.ogFields ? product?.ogFields : null
  }
  return {
    props: {
      seoFields: seoFields
    }
  };
}

export default withRouter(ProductDetail)