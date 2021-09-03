import React, { Component } from "react";
// import { withTranslation } from "react-i18next";
import { withRouter } from "next/router";
// import { Link } from "react-router-dom";
import Link from 'next/link';
import { getAPI } from "../utils/api";
import MetaDecorator from "../utils/MetaDecorator";
// import Footer from "./Footer/Footer";

class Sitemap extends Component {
    state = {
        textBanner: "",
        seoTitle: "",
        language: "",
    };

    getSiteMap = () => {
        getAPI("product/html")
            .then((res) => {
                const allData = res.data.data;
                this.setState(
                    {
                        textBanner: allData,
                    },
                    () => {
                        let metas = document.getElementsByTagName("title");
                        this.setState({
                            seoTitle: metas[metas.length - 1],
                        });
                    }
                );
            })
            .catch((error) => console.log(error));
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getSiteMap();
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split("-")[0] !== prevProps.language && prevProps.language !== "") {
    //         this.setState(
    //             {
    //                 language: this.props.i18n.language.split("-")[0],
    //             },
    //             () => {
    //                 let { language } = this.state;
    //                 let oldroute = this.props.location.pathname;
    //                 let oldrouteSplit = oldroute.split("/");
    //                 oldrouteSplit.splice(oldrouteSplit.length - 1, 1, language);
    //                 let newroute = oldrouteSplit.join("/");
    //                 this.props.history.push(newroute);
    //                 this.getSiteMap();
    //             }
    //         );
    //     }
    // }

    render() {
        return (
            <React.Fragment>
                <MetaDecorator 
                    title={"Sitemap | Knitter's Pride"} 
                    description={""} 
                    keywords={""} 
                    ogTitle={"Sitemap | Knitter's Pride"}
                    ogDescription={""}
                    ogImage={""}
                />
                {this.state.textBanner ? (
                    <>
                        <div style={{ "max-width": "600px", margin: "0 auto" }}>
                            <h2 style={{ padding: "40px" }}>
                                <Link href={"/"}>Home</Link>
                            </h2>
                            <div className="sets-container" dangerouslySetInnerHTML={{ __html: this.state.textBanner }} />
                        </div>
                        {/* <Footer allLanguage={this.props.allLanguage} /> */}
                    </>
                ) : null}
            </React.Fragment>
        );
    }
}

export default withRouter(Sitemap);
