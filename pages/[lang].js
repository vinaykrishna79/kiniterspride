import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link'
import { useRouter } from 'next/router'

// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomePage from "../component/Home";
import { Baseurl } from '../utils/BaseUrl'
import MetaDecorator from '../utils/MetaDecorator'
import { projectLanguages } from '../utils/helperFunctions'


export default function Home(props) {

  const router = useRouter()
  // const { t } = useTranslation('common')
  // console.log("pppp   ",props);
  const { ogFields } = props

  return (
    <>
    <MetaDecorator
      title={ogFields?.ogTitle ? ogFields?.ogTitle : ""}
      description={ogFields?.ogDescription ? ogFields?.ogDescription : ""}
      keywords={ogFields?.seoKeywords ? ogFields?.seoKeywords : ""}
      ogTitle={ogFields?.ogTitle ? ogFields?.ogTitle : ""}
      ogDescription={ogFields?.ogDescription ? ogFields?.ogDescription : ""}
      ogImage={ogFields?.ogImage ? ogFields?.ogImage : ""}
    />
    <div>
      <HomePage 
        {...props}
      />
    </div>
    </>
  )
}

export async function getStaticProps({ params: {lang} }) {
  let res = await fetch(`${Baseurl}template/homepageOgFields`)
  const data = await res.json();
  const { ogFields } = data.data

  const languageRes = await fetch (`${Baseurl}language/language?lang=${lang}`)
  const languageData = await languageRes.json()
  const allLanguages = languageData.data

  const instaFeedRes = await fetch(`${Baseurl}template/instaposts`)
  const instaFeedData = await instaFeedRes.json()
  const instaFeed = instaFeedData.data

  const templateRes = await fetch(`${Baseurl}template/getMenuTemplates/1?lang=${lang}`)
  const templateData = await templateRes.json()
  const allData = templateData.data

  const productRes = await fetch(`${Baseurl}product/bestSeller?lang=${lang}`)
  const productData = await productRes.json()
  const bestSeller = productData.data

  const promoImageRes = await fetch(`${Baseurl}promoImage/promoImage/${lang}`)
  const promoImageData = await promoImageRes.json()
  const promoBannerDetail = promoImageData.data


  return {
    props: {
      ogFields: ogFields,
      allLanguages: allLanguages,
      instaFeed: instaFeed,
      allData: allData,
      bestSeller: bestSeller,
      promoBannerDetail: promoBannerDetail
    }
  };
}

export async function getStaticPaths() {
    let paths = []
    projectLanguages.map(lang => {
        paths.push(`/${lang}`)
    })
    
    return {
        paths,
        fallback: false
    }
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale, ['common', 'footer']),
//   },
// })
