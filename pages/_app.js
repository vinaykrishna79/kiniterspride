import "../styles/globals.css";
// import { appWithTranslation } from "next-i18next";
import "../Assets/css/bootstrap.min.css";
import "../Assets/css/style.css";
import "../Assets/css/responsive.css";
import "../Assets/css/all.min.css";
import "../Assets/css/owl.carousel.min.css";
import "../Assets/css/owl.theme.default.min.css";
import "../Assets/css/animate.css";
import "../Assets/css/global.css";
import "../Assets/css/csstyle.css";
import "../Assets/css/scrollButton.css";
import Layout from "../component/Layout";
import Head from "next/head";
import "react-modal-video/scss/modal-video.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAPI } from "../utils/api";
import { getAsPathfromUrl } from "../utils/helperFunctions";
// import apple from "../static/apple-icon.png";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  const [ allRedirectUrls, setRedirectUrls ] = useState([])

  useEffect(() => {
    getAPI("redirectUrl/redirectUrl/all")
    .then(res => {
      setRedirectUrls(getAsPathfromUrl(res.data.data))
    })
  }, [])

  useEffect(() => {
    redirectTo(allRedirectUrls)
  },[router.asPath, allRedirectUrls])

  const redirectTo = (allRedirectUrls) => {
    allRedirectUrls.map( url => {
      if(url.from === router.asPath){
        router.push(url.to)
      }
    })
  }
  
  return (
    <>
      <Layout>      
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

// export default appWithTranslation(MyApp);

export default MyApp