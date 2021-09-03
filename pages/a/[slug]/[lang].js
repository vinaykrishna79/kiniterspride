import React from "react";
import { withRouter } from 'next/router'
import Ginger from "../../../component/Ginger";
import { getAPI } from "../../../utils/api";
import { Baseurl } from "../../../utils/BaseUrl";
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

    async componentDidMount(){
        
    }


    connectHeaderGinger = async (unique, categoryid, subcategid, langId) => {
        let ids = {
            categId: categoryid,
            subcategId: subcategid,
        };
        this.setState({ ids })
        // this.setState({ isLoader: true });
        if (unique === "brand") {
            await getAPI(`brand/brandProductTypes?bslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`)
                .then(async (res) => {
                    const { status, data } = res.data;
                    // console.log("brand res  ", res);
                    if (status === 1) {
                        await this.setState({
                            brands: data,
                            types: {},
                            materials: {},
                            isLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    // createBrowserHistory().push("/NotFound");
                    // window.location.reload();
                });
        } else if (unique === "type") {
            getAPI(`brand/brandshavingType?tslug=${ids.subcategId}&lang=${langId}`)
                .then((res) => {
                    const { status, data } = res.data;
                    // console.log("type res  ", res);
                    if (status === 1) {
                        this.setState({
                            types: data,
                            brands: {},
                            materials: {},
                            isLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    // createBrowserHistory().push("/NotFound");
                    // window.location.reload();
                });
        } else if (unique === "material") {
            getAPI(`brand/brandshavingMaterial?mslug=${ids.subcategId}&cslug=${ids.categId}&lang=${langId}`)
                .then((res) => {
                    const { status, data } = res.data;
                    // console.log("material res   ", res);
                    if (status === 1) {
                        this.setState({
                            materials: data,
                            brands: {},
                            types: {},
                            isLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    // createBrowserHistory().push("/NotFound");
                    // window.location.reload();
                });
        }
        // for mobile view header close
        document.getElementById("navbarclose").click();
    };

    render(){
        // console.log(this.props);
        return(
            <>
                <Ginger
                    {...this.state}
                    id="a"
                    connectHeaderGinger={this.connectHeaderGinger}
                />
                {/* <h1> Hello</h1> */}
            </>
        )
    };
}

export async function getStaticPaths() {
    let paths = []

        const res2 = await fetch(`${Baseurl}brand/slugs`)
        const data2 = await res2.json()
        const brandData = data2.data

        const res3 = await fetch(`${Baseurl}category/slugs`)
        const data3 = await res3.json()
        const catData = data3.data

        for(let lang in catData){
            for(let catslug of catData[lang]){
                for(let brandslug of brandData[lang]){
                    if(lang === "en" || lang === "es"){
                    if((catslug.slug).trim() === "needles" || (catslug.slug).trim() === "stricken" || (catslug.slug).trim() === "aguja" || (catslug.slug).trim() === "针头" || (catslug.slug).trim() === "Спица-ne"){
                        paths.push(`/a/${brandslug.slug}/${lang}`)
                    }else{
                        paths.push(`/a/${brandslug.slug}-${catslug.slug}/${lang}`);
                    }
                }
                }
                
            }
        }
        return {
            paths,
            fallback: false
        }
    // return {
    //   paths: [
    //     // String variant:
    //     '/a/first-post',
    //     // Object variant:
    //      { params: { slug: 'second-post' } },
    //   ],
    //   fallback: true,
    // }
}

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export async function getStaticProps () {
    return {
        props: { },
      }
}
  
export default withRouter(ProductList)