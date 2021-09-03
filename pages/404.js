import React from 'react';
// import Footer from './Footer/Footer';
import { withRouter } from 'next/router';
import Link from "next/link";
import Image from "../component/custom-image";
import MetaDecorator from '../utils/MetaDecorator';
// import { withTranslation } from 'react-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class Errorpage extends React.Component {

    render() {
        // const { t } = this.props
        return (
            <React.Fragment>
                <MetaDecorator
                    title="Knitter's Pride"
                    description="" 
                    keywords=""
                    ogTitle="Knitter's Pride"
                    ogDescription=""
                    ogImage=""
                />
                <section className="accessoriesSection privcy1 pt-5 pb-5">
                    <div className="container">
                        <div className="text-center mb-md-5 error">
                            <h1 className="text-uppercase">
                                {/* {t(`languages.OH_NO`)} */}OH_NO
                                ! 404</h1>
                            <p className="text-uppercase mob-text-center">
                                {/* {t(`languages.ErrorPageText`)} */}ErrorPageText
                                </p>
                        <Image className="img-fluid" src={"/images/404.jpg"} alt="404 Error Page" />
                        <div className="btn-b error-btn my-3"><Link href="/">Go to home</Link></div>
                        </div>
                        <div className="text-center">
                            <p><Link href='/'>Back To Home</Link></p>
                        </div>
                    </div>
                    </section>
               {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj}/> */}
            </React.Fragment>
        )
    }
}
// export default withRouter(withTranslation()(Errorpage));

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(Errorpage)