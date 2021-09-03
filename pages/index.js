import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link'
import { useRouter } from 'next/router'

// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomePage from "../component/Home";


export default function Home(props) {

  const router = useRouter()
  // const { t } = useTranslation('common')
  // console.log("pppp   ",props);


  return (
    <div>
      <HomePage />
    </div>
  )
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale, ['common', 'footer']),
//   },
// })
