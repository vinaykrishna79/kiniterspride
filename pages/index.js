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
      <HomePage />
    </div>
    </>
  )
}

export async function getStaticProps({ }) {
  let res = await fetch(`${Baseurl}template/homepageOgFields`)
  const data = await res.json();
  const { ogFields } = data.data
  return {
    props: {
      ogFields: ogFields
    }
  };
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale, ['common', 'footer']),
//   },
// })
