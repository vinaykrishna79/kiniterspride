import React from "react";
import { withRouter } from "next/router";
import { getAPI} from "../../utils/api";
// import ModalVideo from "react-modal-video";
import { Baseurl, storageUrl } from "../../utils/BaseUrl";
import { saveAs } from "file-saver";
import axios from "axios"
import { getCurrentLocaleFromUrl } from "../../utils/helperFunctions";
import Image from "../../component/custom-image";
import Link from "next/link";

class Resourcesinner extends React.Component {
    state = {
        isLoading: true,
        assets: [],
        fullData: {},
        filterdAsset: [],
        title: "",
        hasSubtype: false,
        typeOptions: [],
        selectedOption: null,
        videoId: "",
        isOpen: false,
        brandUid: "",
        langObj: {},
        imageArrayv: [],
        isAllDownloading: false,
        typeIdentity: "",
        hidding: false,
    };

    componentDidMount() {
        const query = this.props.router.query
        // window.scrollTo(0, 0);
        this.props.router.push("/resourcesinner/en", undefined, { shallow: true })
        const { hasSubtype, typeIdentity, itemUid} = query
        let data
        const r = this.props.router;
        let lang = getCurrentLocaleFromUrl(r.asPath)
        let langus = localStorage.getItem("languages")
        if(langus && !langus.includes(lang)){
            this.props.history.push("/NotFound")
        }
        getAPI(`resource/resources?lang=${lang}`).then((res) => {
            const { status } = res.data;
            if (status === 1) {
                const apiTypeIdentity = (res.data.data).filter(type => type.name.en === typeIdentity )
                const resource = apiTypeIdentity[0].resources.filter(res => res.uid === itemUid)
                data = resource[0]
                console.log("data  ", data);
                console.log("hasSubtype  ", hasSubtype);
                console.log("typeIdentity  ", typeIdentity);
                if(hasSubtype){
                    this.uniqueProductTypes(data, hasSubtype, typeIdentity)
                }else{
                    this.setState(
                        {
                            assets: data?.assets,
                            filterdAsset: data?.assets,
                            isLoading: false,
                            title: data?.title,
                            hasSubtype: hasSubtype,
                            brandUid: data?.brandUid,
                            typeIdentity: typeIdentity
                        },
                        () => {
                            if (hasSubtype) {
                                this.getTypes();
                            }
                            this.arrayOfImages(this.state.filterdAsset);
                        }
                    )
                }
    
            }
        })
        .catch((err) => {
            console.log(err);
        });

        

        
    }

    uniqueProductTypes = (data, hasSubtype, typeIdentity) => {
        const result = [];
        const map = new Map();
        for (const item of data?.assets) {
            if(!map.has(item.productType)){
                map.set(item.productType, true);
                result.push({
                    order: item.order,
                    productType: item.productType,
                    productTypeId: item.productTypeId,
                    type: item.type,
                    value: item.value
                });
            }
        }
        this.setState(
            {
                fullData: data,
                assets: data?.assets,
                filterdAsset: result,
                isLoading: false,
                title: data?.title,
                hasSubtype: hasSubtype,
                brandUid: data?.brandUid,
                typeIdentity: typeIdentity,
                hidding: false
            },
            () => {
                if (hasSubtype) {
                    this.getTypes();
                }
                this.arrayOfImages(this.state.filterdAsset);
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.getTypes();
        }
    }


    getTypes = () => {
        if (this.state.brandUid) {
            getAPI(`type/types/${this.state.brandUid}`)
                .then((res) => {
                    const { status, data } = res.data;
                    const optionArray = data.map((d) => {
                        let a = {};
                        a["label"] = d.name;
                        a["value"] = d.uid;
                        return a;
                    });
                    this.setState({ typeOptions: optionArray });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    handleChange = (e) => {
        this.setState({ selectedOption: e }, () => this.getFilteredAssets());
    };
    getFilteredAssets = () => {
        const selectedOption = this.state.selectedOption;
        const assets = this.state.assets.filter((item) => {
            return item.productTypeId == selectedOption.value;
        });
        this.setState({ filterdAsset: assets });
    };

    arrayOfImages = (imageArray) => {
        let imageArrayv = imageArray.map((element) => {
            return element.value;
        });
        this.setState({ imageArrayv: imageArrayv });
        // console.log("imageArrayv   ",imageArrayv);
    };

    downloadZIP = async (e) => {
        this.setState({ isAllDownloading: true });
        let data = {
            images: [...this.state.imageArrayv],
        };
        axios({
            method: "post",
            url: `${Baseurl}resource/downloadALL`,
            headers: { "content-type": "application/json" },
            data: data,
            responseType: "blob", // important
        })
            .then((response) => {
                let blob = new Blob([response.data]);
                saveAs(blob, "resources.zip");
                this.setState({ isAllDownloading: false });
            })
            .catch((error) => {
                this.setState({ isAllDownloading: false });
                console.log(error);
            });
    };

    filterbyProductType = (productType) => {
        console.log(productType,'productType')
        if(!productType) return
        const filtered = this.state.assets.filter(item => item.productType === productType)
        this.setState({
            filterdAsset: filtered,
            hidding: true
        }, () => this.arrayOfImages(this.state.filterdAsset))
    }

    render() {
        const {
            title,            
            filterdAsset,           
            isAllDownloading,
            typeIdentity,
        } = this.state;

        const suc_msg_box = {
            display: "block",
            margin: "0 auto",
            color: "#ffffff",
            minWidth: "250px",
          // color: "#fff",
          transform: "translate(-50%,-50%)",
          backgroundColor: "rgb(17 175 41)",
          padding: "20px 20px",
          borderRadius: "5px"
            
        }
        
        const card_center_msg =  {
          position: "absolute",
          top: "42px",
          left: "50%",
          // minWidth: "250px",
          // color: "#fff",
          // transform: "translate(-50%,-50%)",
          // backgroundColor: "rgb(17 175 41)",
          // padding: "20px 20px",
          // borderRadius: "5px"
        }

        const r = this.props.router;
        const lang = getCurrentLocaleFromUrl(r.asPath)
        const resourcesInnerLangObj = require(`../../public/locales/${lang}/common.json`)
        return (
            <React.Fragment>
                <section className="kp-mid_banner position-relative">
                    <div className="header-overlay" />
                    <Image src={"/images/resourcesbanner1.png"} alt="" className="w-100" />
                </section>
                <section id="press">
                {/* <div className="sm_modile_alert" style={card_center_msg}>
                    {
                        this.state.isAllDownloading
                        ?
                        <div className="animate__animated animate__fadeIn text-center" style={suc_msg_box} role="alert">
                            Your request is registered, it will download soon, Please Wait...
                        </div>
                        :
                        null
                    }
                </div> */}
              <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-12">
                                <h2>{title}</h2>
                            </div>
                            <div className="col-12 col-md-12">
                                <div className="row">
                                    {this.state.hidding ? (
                                        <div className="col-12 col-md-6 imageselect">
                                            <button onClick={()=>this.uniqueProductTypes(this.state.fullData, this.state.hasSubtype, this.state.typeIdentity)} disabled={isAllDownloading}>
                                                Back
                                            </button>                                   
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {typeIdentity !== "Product Videos" && this.state.hidding ? (
                                        <>
                                        
                                        <div className="col-12 col-md-6 text-right imageselect">
                                            <button onClick={this.downloadZIP} disabled={isAllDownloading}>
                                            {resourcesInnerLangObj.languages["DOWNLOAD ALL"]}  <Image src={"/images/downloadi.png"} />
                                            {/* {resourcesInnerLangObj(`languages.DOWNLOAD ALL`)} */}
                                            </button>
                                            {this.state.isAllDownloading && <div className="mt-3 d-flex flex-row-reverse"> Your request is registered, it will download soon, Please Wait... </div>}
                                        </div>
                                        
                                        </>
                                    ) : null}
                                    {typeIdentity === "Knitter's Pride Factory Images & Videos" || typeIdentity === "KnitPro Logo" ? (
                                        <>
                                            <div className="col-12 col-md-12 text-right imageselect">
                                                <button onClick={this.downloadZIP} disabled={isAllDownloading}>
                                                {resourcesInnerLangObj.languages["DOWNLOAD ALL"]} <Image src={"/images/downloadi.png"} />
                                                </button>
                                                {this.state.isAllDownloading && <div className="mt-3 d-flex flex-row-reverse"> Your request is registered, it will download soon, Please Wait... </div>}
                                            </div>
                                            
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            {filterdAsset?.map((item, idx) => (
                                <div className="col-12 col-md-3" key={idx}>
                                    {/* <div>
                                     <a href={item.value} download
                                      onClick={() => this.download()}
                                     >
                                       {item.type===0?<img src={item.value} alt="..."/>:<img src={`https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`} alt="..." />}
                                     </a>                                  
                                 </div> */}
                                  <div className="resourceimageswrap">
                                        <figure>
                                            {item.type === 0 ? (
                                                <>
                                                    <Image src={storageUrl + item.value} alt="..." onClick={()=>this.filterbyProductType(item.productType)}/>
                                                    {
                                                        this.state.hidding
                                                        ?
                                                        <div className="downloadbutton">
                                                            <Link href={storageUrl + item.value} target="_blank" download>
                                                                <a>
                                                                <Image src={"/images/popdownload.png"} alt="..." />
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                    {
                                                        typeIdentity === "KnitPro Factory Images & Videos" || typeIdentity === "KnitPro Logo"
                                                        ?
                                                        <div className="downloadbutton">
                                                            <Link href={storageUrl + item.value} target="_blank" download>
                                                                <a>
                                                                <Image src={"/images/popdownload.png"} alt="..." />
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </>
                                            ) : (
                                                <Image
                                                    src={`https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`}
                                                    alt="..."
                                                    onClick={() =>
                                                        this.setState({
                                                            isOpen: true,
                                                            videoId: item.video_id,
                                                        })
                                                    }
                                                />
                                            )}
                                        </figure>
                                        {item?.imageName ? <span>{item.imageName}</span> : item?.productType ? item?.productType : ""}
                                    </div>
                                </div>
                            ))}
                            {/* <ModalVideo
                                channel="youtube"
                                isOpen={this.state.isOpen}
                                videoId={this.state.videoId}
                                onClose={() =>
                                    this.setState({
                                        isOpen: false,
                                    })
                                }
                            /> */}
                        </div>
                    </div>
                </section>

            </React.Fragment>
        );
    }
}

export default withRouter(Resourcesinner)


