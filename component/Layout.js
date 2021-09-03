import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
const Layout = ({ children }) => {
    return ( 
        <>
        <Head>
        <title>Knitter's Pride</title> 
        </Head>
            <Header/>
            {children}
            <Footer/>
        </>
     );
}
 
export default Layout;