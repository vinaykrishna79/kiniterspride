import React from "react";
// import Footer from "./Footer/Footer";
import { withRouter } from "next/router";
import Link from "next/link";
import TestimonialSlider from "../component/TestimonialSlider";
import BestsellersSlider from "../component/BestsellerSlider";
import { getAPI, postAPI } from "../utils/api";
import ReactImageMagnify from "react-image-magnify";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import Recaptcha from 'react-recaptcha';
// import ModalVideo from "react-modal-video";
// import "react-modal-video/scss/modal-video.scss";
import MetaDecorator from "../utils/MetaDecorator";
import Select from "react-select";
// import { createBrowserHistory } from "history";
import { storageUrl } from "../utils/BaseUrl";
// import { withTranslation } from "react-i18next";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Image from "./custom-image"
import { getCurrentLocaleFromUrl, imageNameToAltTag } from "../utils/helperFunctions";

class ProductDetails extends React.Component {
  state = {
    glasifierImage: "",
    picIndex: null,
    productList: [],
    productListName: "",
    tableshow: "",
    display: false,
    modalIndex: null,
    modalrowIndex: null,
    skus: [],
    productImages: [],
    productDesc: "",
    productSize: "",
    productRating: null,
    reviewPost: {
      name: "",
      email: "",
      rating: "0",
      review: "",
      zipcode: "",
      productUid: "",
      country: "",
    },
    ValidationError: "",
    reviewData: [],
    loader: false,
    similarProductData: [],
    testmonials: [],
    isOpen: false,
    videoId: "",
    langObj: {},
    allLanguage: [],
    routelang: "",
    lang_i: "",
    countries: [],
    slideIndex: 1,
    isVerfiy: false,
    verifyMessage: "",
    ratingMessage: "",
    errorMessage: "",
    successMessage: "",
    catNeedleName: ""
  };
  wrapperRef = React.createRef();

//   componentDidUpdate(prevProps) {
//     if (this.props?.foundResult?.uid) {
//       if (prevProps?.foundResult?.uid !== this.props?.foundResult?.uid) {
//         let foundResult = this.props.foundResult;
//         this.setState(
//           {
//             productList: [],
//             productImages: [],
//             productDesc: "",
//             glasifierImage: "",
//           },
//           () => {
//             this.getSearchedProductDetails(
//               foundResult.slug,
//               this.props.match.params.lang
//             );
//           }
//         );
//       }
//     }
//     if (
//       this.props.i18n.language.split("-")[0] !== prevProps.language &&
//       prevProps.language
//     ) {
      
//       // let lang = localStorage.getItem('KP-web-lang')
//       let route = this.props.location.pathname;
//       let splitroute = route.split("/");
//       // if(splitroute[4] !== this.props.language){
//       //   splitroute[4] = this.props.language
//       // }
//       // let routelangObj = this.state.allLanguage.filter(ele => ele.shortName === splitroute[4])
//       // if (routelangObj.length > 0) {
//       //   this.setState({
//       //     routelang: routelangObj[0].uid
//       //   }, () => {
//       //     if (splitroute.length > 2) {
//       if (splitroute[1] === "d") {
//         let ids = {
//           pagetype: splitroute[1],
//           brandslug: splitroute[2],
//           productslug: splitroute[3],
//           lang: this.props.i18n.language.split("-")[0],
//         };
//         this.setState({ ids: ids }, () => {
//           let { ids } = this.state;
//           if (ids.pagetype === "d") {
//             this.getProductLists(
//               "brand",
//               ids.brandslug,
//               ids.productslug,
//               ids.lang
//             );
//           }
//         });
//         splitroute.splice(splitroute.length - 1, 1, ids.lang);
//         let newroute = splitroute.join("/");
//         this.props.history.push(newroute);
//       } else if (splitroute[1] === "e") {
//         let ids = {
//           pagetype: splitroute[1],
//           brandslug: splitroute[2],
//           productslug: splitroute[3],
//           lang: this.props.i18n.language.split("-")[0],
//         };
//         this.setState({ ids: ids }, () => {
//           let { ids } = this.state;
//           if (ids.pagetype === "e") {
//             this.getSearchedProductDetails(ids.productslug, ids.lang);
//           }
//         });
//         splitroute.splice(splitroute.length - 1, 1, ids.lang);
//         let newroute = splitroute.join("/");
//         this.props.history.push(newroute);
//       }
//     }
//   }

  componentDidMount() {
    // window.scrollTo(0, 0);
    // let langus = localStorage.getItem("languages")
    // if(langus && !langus.includes(this.props?.match?.params?.lang)){
    //   this.props.history.push("/NotFound");
    // }
    document.addEventListener("mousedown", this.handleClickOutside);
    // let productSlug = this.props.match.params;
    // console.log(this.props);
    const r = this.props.router;
    const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    // let { language } = this.props.i18n
    let { productSlug, brandSlug } = this.props.router.query
    this.setState({ lang_i: language }, () => {
      this.getCategories()
    });
    // if (productSlug?.productPageType === "d") {
    //   this.getProductLists(
    //     brandSlug,
    //     productSlug,
    //     language
    //   );
    // } else if (productSlug?.productPageType === "e") {
      // this.getSearchedProductDetails(productSlug, language);

      if(r.asPath.includes("/d/")) {
        this.getProductLists( brandSlug, productSlug, language );
      } else {
        this.getSearchedProductDetails(productSlug, language)
      }
      // if(productSlug && brandSlug && brandSlug!=="utility-tools" && brandSlug!=="cases" && brandSlug!=="cords" && brandSlug!=="shawl-sticks" && brandSlug!=="blocking-tools" && brandSlug!=="row-counters" && brandSlug!=="gauges-and-needle-size-tags" && brandSlug!=="cord-needles" && brandSlug!=="pattern-holders" && brandSlug!=="magnetic-knitters-necklace-kit" && brandSlug!=="winding-dispensing-accessories") {
        // this.getProductLists( brandSlug, productSlug, language );
      // } else if(productSlug && brandSlug && (brandSlug==="utility-tools" || brandSlug==="cases" || brandSlug==="cords"|| brandSlug==="shawl-sticks" || brandSlug==="blocking-tools"|| brandSlug==="row-counters"|| brandSlug==="gauges-and-needle-size-tags" || brandSlug==="cord-needles" || brandSlug==="pattern-holders" || brandSlug==="magnetic-knitters-necklace-kit" || brandSlug==="winding-dispensing-accessories") ) {
        // this.get/SearchedProductDetails(productSlug, language)
      // }
    // }
    this.getCountries();
  }

  getCategories = () => {
    
    const url = "category/categories/" + this.state.lang_i;
    getAPI(url).then((res) => {
        const { status, data } = res.data;
        if (status === 1) {
            let catNeedleName = data[0].slug
            this.setState(
                {
                    categories: data,
                    catNeedleName
                    // lang_i: this.state.ids.lang,
                }
                // ,
                // () => this.splitcateg(this.state.ids.subcateg, catNeedleName)
            );
        } else {
            this.setState({ categories: [] });
        }
    });
};

  // handleContext = () => {
  //     let noContext = document.getElementsByClassName("image-magnify");
  //     noContext.addEventListener("contextmenu", function (event) {
  //         event.preventDefault();
  //     });
  // };

  getCountries = () => {
    getAPI("review/countries")
      .then((res) => {
        // console.log(res);
        let { data, status } = res.data;
        if (status === 1) {
          let countries = data.map((ele) => {
            return { value: ele.name, label: ele.name };
          });
          this.setState({ countries: countries });
        }
      })
      .catch((error) => console.log(error));
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  similarProduct = (productUid, typeUid) => {
    getAPI(`product/similarProduct?productUid=${productUid}&typeUid=${typeUid}`)
      .then((res) => {
        let { data, status } = res.data;
        if (status === 1) {
          this.setState(
            {
              similarProductData: data,
            },
            () => window.scrollTo(0, 0)
          );
        }
      })
      .catch((error) => console.log(error));
  };

  getSearchedProductDetails = async (productSlug, productlang) => {
    await this.setState({ loader: true });
    if (productSlug?.length > 0) {
      getAPI(`product/productDetail?pslug=${productSlug}&lang=${productlang}`)
        .then((res) => {
          let { data, status } = res.data;
          if (status === 1) {
            this.setState(
              {
                productList: data,
                // productListName: name,
                productImages: data.images,
                productDesc: data.desc,
                reviewPost: {
                  ...this.state.reviewPost,
                  productUid: data.uid,
                },
                loader: false,
              },
              () => {
                if (this.state.productList.images?.length > 0) {
                  this.selectImage(this.state.productList.images[0].value, 0);
                }
                if (this.state.reviewPost.productUid !== "") {
                  this.getReviews(this.state.reviewPost.productUid);
                }
                if (this.state.productList.isMultiColor) {
                  // this.skusColorImageChange(0)
                  let elementId = document.getElementById("collapse81228730");
                  elementId.classList.add("show");
                  let anchorId = document.getElementById("collapseanchor");
                  anchorId.classList.remove("collapsed");
                }
              }
            );
            this.similarProduct(data.uid, data.productTypeUid);
          } else if (status === 0) {
            this.setState({ loader: false });
          }
          this.getTestimonials(
            this.state?.productList?.brandUid,
            this.state?.productList?.categoryUid
          );
        })
        .catch((err) => {
        //   createBrowserHistory().push("/NotFound");
        //   window.location.reload();
        });
    }
  };

  handleClickOutside = (event) => {
    if (this.state.display) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({ display: false });
      }
    }
  };

  getReviews = (productUid) => {
    getAPI(`review/productReviews/${productUid}`)
      .then((res) => {
        const { status, data, productRating } = res.data;
        if (status === 1) {
          this.setState({
            productRating: productRating.toFixed(1),
            reviewData: data,
          });
        } else {
          this.setState({ productRating: null, reviewData: data });
        }
      })
      .catch((error) => console.log(error));
  };

  getDetailsthroughSimilarProducts = (product) => {
    const r = this.props.router;
    const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    // let { language } = this.props.i18n
    // let { brandSlug, productSlug } = this.props.router.query
    if (product.brand) {
      this.getProductLists(
        product.brand.slug,
        product.slug,
        language
      );
      this.props.router.push(
        `/d/${product.brand.slug}/${product.slug}/${language}`
      );
    } else if (product.productType) {
      this.getSearchedProductDetails(product.slug, language);
      this.props.router.push(
        `/e/${product.productType.slug}/${product.slug}/${language}`
      );
    }
  };

  getProductLists = async (brandslug, typeslug, productlang) => {
    await this.setState({ loader: true });
    // if (unique === "brand") {
     
      getAPI(
        `product/byBrandAndType?bslug=${brandslug}&pslug=${typeslug}&lang=${productlang}`
      )
        .then((res) => {
          const { status, products } = res.data;
          if (status === 1) {
            this.setState(
              {
                productList: products[0],
                // productListName: name,
                productImages: products[0].images,
                ProductMediaIs: products[0].images,

                productDesc: products[0].desc,
                reviewPost: {
                  ...this.state.reviewPost,
                  productUid: products[0].uid,
                },
                loader: false,
              },
              () => {
                if (this.state.productList.images?.length > 0) {
                  this.selectImage(this.state.productList.images[0].value, 0);
                }
                if (this.state.reviewPost.productUid !== "") {
                  this.getReviews(this.state.reviewPost.productUid);
                }
                if (this.state.productList.isMultiColor) {
                  let elementId = document.getElementById("collapse81228730");
                  elementId.classList.add("show");
                  let anchorId = document.getElementById("collapseanchor");
                  anchorId.classList.remove("collapsed");
                }
              }
            );
            this.similarProduct(products[0].uid, products[0].productTypeUid);
            this.getTestimonials(
              this.state?.productList?.brandUid,
              this.state?.productList?.categoryUid
            );
          } else if (status === 0) {
            this.setState({
              loader: false,
            });
          }
        })
        .catch((err) => {
        //   createBrowserHistory().push("/NotFound");
        //   window.location.reload();
        });
    // }
  };

  selectImage = (image, index) => {
    document.getElementById(`pic-${this.state.picIndex}`).className =
      "tab-pane";
    this.setState(
      {
        glasifierImage: storageUrl + image,
        picIndex: index,
      },
      () => {
        document.getElementById(`pic-${index}`).className = "tab-pane active";
      }
    );
  };

  openModal = (ele, index) => {
    if (index !== this.state.modalIndex) {
      this.setState({
        display: true,
        tableshow: "tableshow",
        modalIndex: index,
        skus: ele.productSkus,
      });
    } else {
      if (this.state.display) {
        this.setState({
          display: false,
          tableshow: "",
        });
      } else {
        this.setState({
          display: true,
          tableshow: "tableshow",
          modalIndex: index,
          skus: ele.productSkus,
        });
      }
    }
  };

  loadGroupImages = (ele) => {
    let { desc, images } = ele;
    if (images.length > 0) {
      this.selectImage(images[0].value, 0);
      this.setState({
        productImages: images,
      });
    }
    if (desc !== "") {
      this.setState({
        productDesc: desc,
      });
    }
  };

  loadSkusImages = async (item, modalIndex) => {
    if (item.images.length > 0) {
      this.selectImage(item.images[0].value, 0);
      await this.setState({
        productImages: item.images,
      });
    }
    document.getElementById(`productSize${modalIndex}`).textContent = item.size;
  };

  reviewChange = (e) => {
    if (e?.target) {
      const { name, value } = e.target;
      this.setState({
        reviewPost: {
          ...this.state.reviewPost,
          [name]: value,
        },
      });
    } else {
      this.setState({
        reviewPost: {
          ...this.state.reviewPost,
          country: e.value,
        },
      });
    }
  };

  onStarClick = (e) => {
    let { id } = e.target;
    if (parseInt(id) < parseInt(this.state.reviewPost.rating)) {
      for (var j = 1; j < parseInt(this.state.reviewPost.rating) + 1; j++) {
        document.getElementById(`${j}`).className = "star-icon";
        // document.getElementById(`rate_${j}`).className = "fa fa-star";
      }
    }
    for (var i = 1; i < parseInt(id) + 1; i++) {
      document.getElementById(`${i}`).className = "star-icon filled";
      // document.getElementById(`rate_${i}`).className = "fa fa-star rateStar";
    }
    this.setState({
      reviewPost: {
        ...this.state.reviewPost,
        rating: id
      },
      ratingMessage: ""
    });
  };

  onRateClick = (e) => {
    let { id } = e.target;
    if (parseInt(id.split("_")[1]) < parseInt(this.state.reviewPost.rating)) {
      for (var j = 1; j < parseInt(this.state.reviewPost.rating) + 1; j++) {
        document.getElementById(`rate_${j}`).className = "fa fa-star";
        document.getElementById(`${j}`).className = "star-icon";
      }
    }
    for (var i = 1; i < parseInt(id.split("_")[1]) + 1; i++) {
      document.getElementById(`rate_${i}`).className = "fa fa-star rateStar";
      document.getElementById(`${i}`).className = "star-icon filled";
    }
    this.setState({
      reviewPost: {
        ...this.state.reviewPost,
        rating: id.split("_")[1],
      },
    });
  };

  ValidateEmail = (mail) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  reviewValid = () => {
    let isValid = true;
    let { name, rating, country } = this.state.reviewPost;
    if (
      name === "" ||
      // review === "" ||
      rating === "0" 
      /*||
      typeof parseInt(zipcode) ===
        "string" || email === '' || !this.ValidateEmail(email)*/ ||
      country === ""
    ) {
      isValid = false;
    }
    return isValid;
  };

  postReview = (e) => {
    e.preventDefault();
    const r = this.props.router;
    const productDetailsLangObject = require(`../public/locales/${getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)}/common.json`)
    if(this.state.reviewPost.rating === '0') return this.setState({ ratingMessage: "Rate us " })
    if(this.state.isVerfiy){
      if (this.reviewValid()) {
        postAPI("review/review", this.state.reviewPost)
          .then((res) => {
            this.setState({
              // successMessage: `${this.props.t(`languages.Successfully submitted`)}`
              successMessage: productDetailsLangObject.languages["Successfully submitted"]
            }, () => {
              setTimeout(() => {
                this.setState({
                  successMessage: ""
                })
              }, 3000)
            })
            document.getElementById("closeReviewModal").click();
          })
          .catch((error) => {
            this.setState({
              errorMessage: "Something Went Wrong!"
            }, () => {
              setTimeout(() => {
                this.setState({ errorMessage: "" })
              }, 3000)
            })
            console.log(error)
          });
      } else {
        this.setState({
          ValidationError: "Required Field*",
        });
      }
    }else{
      this.setState({
        verifyMessage: "Verify you are not a robot..."
      })
    }
  };

  captchaLoad = () => {
    console.log("captcha loadeddddddddddddddddddd!");
  }

  getTestimonials = (brandUid, categoryUid) => {
    if (brandUid && brandUid.length > 0) {
      getAPI(`testimony/productTestimony?buid=${brandUid}&cuid=${categoryUid}`)
        .then((res) => {
          let { status, data } = res.data;
          if (status === 1) {
            this.setState({
              testmonials: data,
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      getAPI(`testimony/productTestimony?cuid=${categoryUid}`)
        .then((res) => {
          let { status, data } = res.data;
          if (status === 1) {
            this.setState({
              testmonials: data,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  skusColorImageChange = (imageEle) => {
    document.getElementById(`pic-${this.state.picIndex}`).className =
      "tab-pane";
    if (imageEle.images.length > 0) {
      this.setState(
        { glasifierImage: storageUrl + imageEle.images[0].value },
        () => {
          document.getElementById(`pic-${this.state.picIndex}`).className =
            "tab-pane active";
        }
      );
    }
  };

  skucodeShow = (productSkus) => {
    let checksku = [];
    if (productSkus.length > 0) {
      productSkus.map((item) => {
        if (item.code !== "") {
          checksku.push(item.code);
        }
      });
      if (checksku.length > 1) {
        let a = checksku[0];
        let count = checksku.filter((num) => num == a);
        if (count.length == checksku.length) {
          return false;
        } else {
          return true;
        }
      } else {
        if (checksku.length === productSkus.length) {
          return true;
        }
        return false;
      }
    }
  };

  openReview = () => {
    if (this.state.reviewData.length > 0) {
      document.getElementById("reviewOpen").click();
    }
  };

  plusIndex = () => {
    if(this.state.glasifierImage){
      let imageIndex
      this.state.productImages.forEach((ele, ind) => {
        if(this.state.glasifierImage.includes(ele.value)){
          imageIndex = (ind+1)
        }
      })
      if(imageIndex){
        if(imageIndex < this.state.productImages.length && !this.state.productImages[imageIndex].video_id){
          if(imageIndex < this.state.productImages.length){
            document.getElementById(`pic-${this.state.picIndex}`).className = "tab-pane";
            this.setState({
              glasifierImage: storageUrl + this.state.productImages[imageIndex].value,
              picIndex: imageIndex
            }, () => {
              document.getElementById(`pic-${imageIndex}`).className = "tab-pane active";
            })
        }else{
          this.setState({ picIndex: imageIndex }, () => {
            return this.plusIndex()
          })
        }
        }else{
          document.getElementById(`pic-${this.state.picIndex}`).className = "tab-pane";
          this.setState({
            glasifierImage: storageUrl + this.state.productImages[0].value,
            picIndex: 0
          }, () => {
            document.getElementById(`pic-${0}`).className = "tab-pane active";
          })
        }
      }
    }
  };

  imageIndFind = (i) => {
    return i-1
  }

  minusIndex = async () => {
    if(this.state.glasifierImage){
      let imageIndex
      this.state.productImages.forEach((ele, ind) => {
        if(this.state.glasifierImage.includes(ele.value)){
          imageIndex = (ind-1)
        }
      })
      if(imageIndex || imageIndex === 0){
        if(imageIndex < 0){
          for(let i=0; i< this.state.productImages.length; i++){
            if(this.state.productImages[i].video_id){
              await this.setState({
                picIndex: i-1
              })
              break
            }else{
              await this.setState({ picIndex: this.state.productImages.length-1 })
            }
          }
          document.getElementById(`pic-${this.state.picIndex}`).className = "tab-pane";
          await this.setState({
            glasifierImage: storageUrl + this.state.productImages[this.state.picIndex].value,
            picIndex: imageIndex
          }, () => {
            document.getElementById(`pic-${imageIndex}`).className = "tab-pane active";
          })
        }else{
          document.getElementById(`pic-${this.state.picIndex}`).className = "tab-pane";
          await this.setState({
            glasifierImage: storageUrl + this.state.productImages[imageIndex].value,
            picIndex: imageIndex
          }, () => {
            document.getElementById(`pic-${this.state.picIndex}`).className = "tab-pane active";
          })
        }
      }
    }
  }

  verify = (response) => {
    if(response){
      this.setState({
        isVerfiy: true,
        verifyMessage: ""
      })
    }
  }

  render() {
    let productDetails = this.state.productList;
    let catSlug = productDetails?.category?.slug === this.state.catNeedleName ? "" : `-${productDetails?.category?.slug}`
    let { productGroups, isMultiColor } = this.state.productList;
    let {
      glasifierImage,
      picIndex,
      productRating,
      loader,
      testmonials,
      langObj,
    } = this.state;
    // const { t } = this.props;
    const r = this.props.router;
    const language = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    const productDetailsLangObject = require(`../public/locales/${language}/common.json`)

    const err_msg_box = {
      minWidth: "200px",
      width: "250px",
      display: "block",
      margin: "0 auto",
      color: "#ffffff",
  transform: "translate(-50%,-50%)",
  backgroundColor: "rgb(17 175 41)",
  padding: "20px 20px",
  borderRadius: "5px"
  }

  const suc_msg_box = {
    display: "block",
    margin: "0 auto",
    color: "#ffffff",
    minWidth: "250px",
  transform: "translate(-50%,-50%)",
  backgroundColor: "rgb(17 175 41)",
  padding: "20px 20px",
  borderRadius: "5px"
    
}

const card_center_msg =  {
  position: "absolute",
  top: "42px",
  left: "50%"
}

    return (
      <React.Fragment>
        {/* <MetaDecorator
          title={productDetails?.seoTitle ? productDetails?.seoTitle : ""}
          description={
            productDetails?.seoMetadesc ? productDetails?.seoMetadesc : ""
          }
          keywords={
            productDetails?.seoMetaKeyword ? productDetails?.seoMetaKeyword : ""
          }
          // ogTitle={productDetails?.seoTitle ? productDetails?.seoTitle : ""}
          // ogDescription={
          //   productDetails?.seoMetadesc ? productDetails?.seoMetadesc : ""
          // }
          // ogImage={productDetails?.images?.length>0 ? productDetails.images[0].value : ""}
          ogTitle={productDetails?.ogFields?.ogTitle ? productDetails?.ogFields?.ogTitle : "..."}
          ogDescription={productDetails?.ogFields?.ogDescription ? productDetails?.ogFields?.ogDescription : "..."}
          ogImage={productDetails?.ogFields?.ogImage ? productDetails?.ogFields?.ogImage : "..."}
        /> */}
        <div className="sm_modile_alert" style={card_center_msg}>

        {
          this.state.errorMessage !== ""
          ?
          <div className="animate__animated animate__fadeIn text-center" style={err_msg_box} role="alert">
                        {this.state.errorMessage}
                    </div>
                        :
                        null
                      }
                    {
                      this.state.successMessage !== ""
                      ?
                      <div className="animate__animated animate__fadeIn text-center" style={suc_msg_box} role="alert">
                        {this.state.successMessage}
                    </div>
                        :
                        null
                      }
                      </div>
          <div className="container">
          <ul className="breadcrumb1 mb-4 mb-lg-0">
            <li>
              <Link href="/">
                {/* {t(`languages.Home`)} */}
                {productDetailsLangObject.languages.Home}
                </Link>
            </li>
            {productDetails?.brand ? (
              <>
                <li> &gt; </li>
                <li>
                  <a
                    href={`/a/${productDetails?.brand?.slug}${catSlug}/${language}`}
                  >
                    {productDetails?.brand?.slug}
                  </a>
                </li>
              </>
            ) : null}
            {productDetails?.productType && !productDetails?.brand ? (
              <>
                <li> &gt; </li>
                <li>
                  <a
                    href={`/b/${productDetails?.productType?.slug}/${language}`}
                  >
                    {productDetails?.productType?.slug}
                  </a>
                </li>
              </>
            ) : null}
            {productDetails?.tagline ? (
              <>
                <li> &gt; </li>
                <li>
                  <a>{productDetails?.tagline}</a>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <section className="accessoriesSection pt-5 pb-5 mob-py-0">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <div className="row position-sticky">
                  <div className="col-md-2 col-sm-2 order-2 order-sm-1 sideThumb">
                    <ul className="preview-thumbnail nav nav-tabs mt-sm-0">
                      {/* {
                        loader
                          ?
                          <Skeleton count={2} width={130} height={100} />
                          :
                          null
                      } */}

                      {this.state.productImages.length > 0 &&
                        this.state.productImages.map((ele, index) => (
                          <>
                            {ele.type === 0 ? (
                              <li
                                onClick={() =>
                                  this.selectImage(ele.value, index)
                                }
                              >
                                <a
                                  data-target={"#pic-" + index}
                                  data-toggle="tab"
                                  style={{ cursor: "pointer" }}
                                >
                                  <Image
                                    src={storageUrl + ele.value}
                                    className="img-fluid"
                                    alt={imageNameToAltTag(storageUrl + ele.value)}
                                    height={100} width={100}
                                  />
                                </a>
                              </li>
                            ) : ele.type === 1 ? (
                              <li
                                onClick={() =>
                                  this.setState({
                                    isOpen: true,
                                    videoId: ele.video_id,
                                  })
                                }
                                className="tube-icon"
                              >
                                <a
                                  data-target={"#pic-" + index}
                                  data-toggle="tab"
                                  style={{ cursor: "pointer" }}
                                >
                                  <Image
                                    src={`https://img.youtube.com/vi/${ele.video_id}/0.jpg`}
                                    alt={imageNameToAltTag(ele.video_id)}
                                    height={100} width={100}
                                  />
                                  <i className="fab fa-youtube text-danger"></i>
                                </a>
                              </li>
                            ) : null}
                          </>
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
                    </ul>
                  </div>
                  <div className="col-md-10 col-sm-10 order-1 order-sm-2 pl-md-0 ">
                    <div className="preview-pic tab-content mb-sm-4 mb-md-0">
                      <ContextMenuTrigger id="same_unique_identifier">
                        <div className="tab-pane" id={"pic-" + picIndex}>
                          {loader ? (
                            <div className="text-center">
                              <Skeleton count={1} width={400} height={400} />
                            </div>
                          ) : (
                            <>
                            
                                {/* {this.state.productImages.length > 0 &&
                                  this.state.productImages.map((ele, index) => { */}
                                {/* return ( */}
                                {/* <div className="slides">
                                        <div className="slider-image"> */}
                                <ReactImageMagnify
                                  className="set_img_size"
                                  {...{
                                    smallImage: {
                                      alt: "...",
                                      isFluidWidth: true,
                                      src: glasifierImage,
                                    },
                                    largeImage: {
                                      src: glasifierImage,
                                      width: 1000,
                                      height: 1000,
                                    },
                                    pressMoveThreshold: 10,
                                    shouldUsePositiveSpaceLens: true,
                                    imageClassName: "image-magnify",
                                    enlargedImageContainerStyle: {
                                      zIndex: "9",
                                    },
                                  }}
                                />
                                {/* </div>
                                      </div> */}
                                {/* ); */}
                                {/* // })} */}

                                {/* Slider Next and Previous buttons */}
                                <a
                                  style={{ cursor: "pointer" }}
                                  className="prev"
                                  onClick={() => this.minusIndex()}
                                >
                                  ❮
                                </a>
                                <a
                                  style={{ cursor: "pointer" }}
                                  className="next"
                                  onClick={() => this.plusIndex()}
                                >
                                  ❯
                                </a>
                                {/* Slider Selection Bullets */}
                              {" "}
                              {/* slider container */}
                            </>
                          )}
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenu id="same_unique_identifier">
                        <MenuItem
                          data={{ imageUrl: glasifierImage }}
                          className="save_image"
                        >
                          <a href={glasifierImage} download>
                            Save image as...
                          </a>
                        </MenuItem>
                      </ContextMenu>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 productBox position-relative">
                <h1 className="pt-3 pt-sm-0">{productDetails?.tagline}</h1>
                {loader ? <Skeleton count={1} width={400} height={50} /> : null}

                <div className="reviewmain">
                  {Array.from({ length: Math.floor(productRating) }).map((ele, i) => (
                    <span key={i} className="star-icon filled">★</span>
                  ))}
                  {productRating - Math.floor(productRating) > 0 ? (
                    <span className="star-icon star-half">
                      <div className="star-half-icon">★</div>
                      <div className="star-full-icon">★</div>
                    </span>
                  ) : productRating < 5 ? (
                    <span className="star-icon">★</span>
                  ) : null}
                  {Array.from({ length: 4 - Math.floor(productRating) }).map(
                    (ele, i) => (
                      <span key={i} className="star-icon">★</span>
                    )
                  )}
                  <span className="reviews-text">
                    <span
                      className="d-none"
                      data-toggle="modal"
                      data-target="#myModal2"
                      id="reviewOpen"
                    ></span>
                    <a
                      type="button"
                      className="video-btn"
                      onClick={this.openReview}
                    >
                      {/* {this.state.reviewData.length} {t(`languages.reviews`)} */}
                      {this.state.reviewData.length} {productDetailsLangObject.languages.reviews}
                    </a>
                  </span>
                  <span className="reviews-text">
                    <a
                      type="button"
                      className="video-btn text-danger"
                      data-toggle="modal"
                      data-target="#myModal3"
                    >
                      {/* {t(`languages.WriteAReview`)} */}
                      {productDetailsLangObject.languages.WriteAReview}
                    </a>
                  </span>
                </div>
                <p>{ReactHtmlParser(this.state.productDesc)}</p>
                {loader ? (
                  <div className="marginbottpm">
                    <Skeleton count={5} width={500} />
                  </div>
                ) : null}

                <div className="productSize leftselect nav-tabs">
                  <div style={{ fontWeight: 900 }}>
                    {/* {t(`languages.Available_SKU`)} */}
                    {productDetailsLangObject.languages.Available_SKU}
                  </div>
                  <form className="form-inline">
                    <div className="row w-100">
                      {isMultiColor ? (
                        <>
                          <div className="col-12">
                            <div className="panel-group" id="accordion7401210">
                              {productGroups.length > 0 &&
                                productGroups.map((item, index) => (
                                  <div
                                    className="panel panel-default"
                                    key={index}
                                  >
                                    <div
                                      className="panel-heading"
                                      id="heading8122873" /*onClick={() => this.skusColorImageChange(index)}*/
                                    >
                                      <h5 className="panel-title">
                                        <a
                                          role="button"
                                          data-toggle="collapse"
                                          id="collapseanchor"
                                          className="accordion-plus-toggle collapsed"
                                          data-parent="#accordion7401210"
                                          href={"#collapse8122873" + index}
                                          aria-expanded="false"
                                          aria-controls={
                                            "collapse8122873" + index
                                          }
                                        >
                                          {ReactHtmlParser(item.sizeName)}
                                        </a>
                                      </h5>
                                    </div>
                                    <div
                                      id={"collapse8122873" + index}
                                      className="panel-collapse collapse"
                                      role="tabpanel"
                                      aria-labelledby="heading8122873"
                                      data-parent="#accordion7401210"
                                    >
                                      <div className="panel-body">
                                        <div className="size-grid-container">
                                          {item.productSkus.length > 0 &&
                                            item.productSkus.map((ele, i) => (
                                              <div
                                                className="item d-md-block d-lg-flex  d-flex border-right-0-md"
                                                key={i}
                                                onClick={() =>
                                                  this.skusColorImageChange(ele)
                                                }
                                                style={{ cursor: "pointer" }}
                                              >
                                                <div className="list-item">
                                                  <Image
                                                    src={
                                                      ele.images.length > 0 &&
                                                      storageUrl +
                                                        ele.images[0].value
                                                    }
                                                    className="img-fluid"
                                                    alt={imageNameToAltTag(ele.images.length > 0 && storageUrl + ele.images[0].value)}
                                                    height={100} width={100}
                                                  />
                                                </div>
                                                <div className="sku-size">
                                                  <p>{ele.size}</p>
                                                  <p>{ele.color}</p>
                                                  {this.skucodeShow(
                                                    item.productSkus
                                                  ) ? (
                                                    <p>
                                                      <strong>
                                                        {ele.code.length > 0
                                                          ? `${ele.code}`
                                                          : null}
                                                      </strong>
                                                    </p>
                                                  ) : null}
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {productGroups?.length > 0 &&
                            productGroups.map((ele, index) => (
                              <div className="col-xs-6 col-xl-6" key={index}>
                                <div
                                  className="needle-select"
                                  style={{ width: "100%" }}
                                >
                                  <label
                                    className="sku-size-hover "
                                    style={{
                                      textAlign: "left",
                                      justifyContent: "left",
                                      fontWeight: 900,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => this.loadGroupImages(ele)}
                                  >
                                    {ReactHtmlParser(ele?.sizeName)}
                                  </label>
                                  <div
                                    className={`sizediv ${this.state.tableshow}`}
                                    onClick={() => this.openModal(ele, index)}
                                  >
                                    <a
                                      className="showBtn"
                                      id={`productSize${index}`}
                                    >
                                      {/* {t(`languages.Product_Details`)} */}
                                      {productDetailsLangObject.languages.Product_Details}
                                    </a>
                                  </div>
                                  {this.state.modalIndex === index ? (
                                    <div
                                      id="table1C"
                                      className="sizetablemain hideme"
                                      style={
                                        !this.skucodeShow(ele?.productSkus)
                                          ? {
                                              display: this.state.display
                                                ? "block"
                                                : "",
                                              maxWidth: "220px",
                                              left: "unset",
                                            }
                                          : {
                                              display: this.state.display
                                                ? "block"
                                                : "",
                                            }
                                      }
                                      ref={this.wrapperRef}
                                    >
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <b>
                                                {/* {t(`languages.Product_Size`)} */}
                                                {productDetailsLangObject.languages.Product_Size}
                                              </b>
                                            </td>
                                            {this.skucodeShow(
                                              ele?.productSkus
                                            ) ? (
                                              <td>
                                                <b>
                                                  {/* {t(`languages.Code`)} */}
                                                  {productDetailsLangObject.languages.Code}
                                                </b>
                                              </td>
                                            ) : null}
                                          </tr>
                                          {this.state.skus.length > 0 ? (
                                            this.state.skus.map(
                                              (item, indx) => (
                                                <tr
                                                  key={indx}
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() =>
                                                    this.loadSkusImages(
                                                      item,
                                                      this.state.modalIndex
                                                    )
                                                  }
                                                >
                                                  <td>{item.size}</td>
                                                  {this.skucodeShow(
                                                    ele?.productSkus
                                                  ) ? (
                                                    <td bgcolor="fdf3f2">
                                                      {item.code}
                                                    </td>
                                                  ) : null}
                                                </tr>
                                              )
                                            )
                                          ) : (
                                            <tr className="text-center">
                                              <td>
                                                <b className="text-danger">
                                                  No Data Found
                                                </b>
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </div>
                  </form>
                </div>
                {/* <div className="productSize starsize">
                  <div className="row">
                    <div className="col-xs-8 col-lg-8">
                      <div style={{ fontWeight: 900, fontSize: '17px' }}>{t(`languages.Rate_our_product_quality`)}</div>
                      <i className="fa fa-star" aria-hidden="true" id='rate_1' style={{ cursor: 'pointer' }} onClick={this.onRateClick} />
                      <i className="fa fa-star" aria-hidden="true" id='rate_2' style={{ cursor: 'pointer' }} onClick={this.onRateClick} />
                      <i className="fa fa-star" aria-hidden="true" id='rate_3' style={{ cursor: 'pointer' }} onClick={this.onRateClick} />
                      <i className="fa fa-star" aria-hidden="true" id='rate_4' style={{ cursor: 'pointer' }} onClick={this.onRateClick} />
                      <i className="fa fa-star" aria-hidden="true" id='rate_5' style={{ cursor: 'pointer' }} onClick={this.onRateClick} />
                    </div>
                    <div className="col-xs-4 col-lg-4 leftsubmit">
                      <button type="button" className="video-btn mt-sm-0" data-toggle="modal" data-target="#myModal3">{t(`languages.Submit`)}</button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {testmonials.length > 0 ? (
          <div className="textSlider bestThing ">
            <div className="container pt-2 pb-2 pb-md-5 pt-md-5">
              <div className="text-center">
                <h2>
                  {/* {t(`languages.Testimonial`)} */}
                  {productDetailsLangObject.languages.Testimonial}
                </h2>
              </div>
              <div className="row">
                <div className="col-12">
                  <TestimonialSlider testmonials={testmonials} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.similarProductData.length > 0 ? (
          <div className="productSlider mt-5 detilsslider">
            <h2 className="section-heading mob-font-18">
              {/* {t(`languages.Similar_Products`)} */}
              {productDetailsLangObject.languages.Similar_Products}
            </h2>
            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p> */}
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <BestsellersSlider
                    similarProductData={this.state.similarProductData}
                    getDetailsthroughSimilarProducts={
                      this.getDetailsthroughSimilarProducts
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className="modal reviewform fade"
          id="myModal3"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModal3"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="closeReviewModal"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="reviewtitle">
                  {/* {t(`languages.WriteAReview`)} */}
                  {productDetailsLangObject.languages.WriteAReview}
                </div>
                <div className="reviewmain">
                  <span
                    className="star-icon"
                    id="1"
                    onClick={this.onStarClick}
                    style={{ cursor: "pointer" }}
                  >
                    ★
                  </span>
                  <span
                    className="star-icon"
                    id="2"
                    onClick={this.onStarClick}
                    style={{ cursor: "pointer" }}
                  >
                    ★
                  </span>
                  <span
                    className="star-icon"
                    id="3"
                    onClick={this.onStarClick}
                    style={{ cursor: "pointer" }}
                  >
                    ★
                  </span>
                  <span
                    className="star-icon"
                    id="4"
                    onClick={this.onStarClick}
                    style={{ cursor: "pointer" }}
                  >
                    ★
                  </span>
                  <span
                    className="star-icon"
                    id="5"
                    onClick={this.onStarClick}
                    style={{ cursor: "pointer" }}
                  >
                    ★
                  </span>
                </div>
                <span className="text-danger font-weight-normal" style={{ fontSize : "17px" }}>{this.state.ratingMessage}</span>
                <form>
                  <label>Name</label>
                  <input type="text" name="name" onChange={this.reviewChange} />
                  {this.state.reviewPost.name === "" ? (
                    <span className="spanValid">
                      {this.state.ValidationError}
                    </span>
                  ) : null}
                  {/* <label>E-mail</label>
                  <input type="email" name="email" onChange={this.reviewChange} />
                  {
                    this.state.reviewPost.email === '' || !this.ValidateEmail(this.state.reviewPost.email)
                      ?
                      <span className="spanValid">{this.state.ValidationError}</span>
                      :
                      null
                  } */}
                  {/* <label>Zip Code</label>
                  <input
                    type="number"
                    name="zipcode"
                    onChange={this.reviewChange}
                  />
                  {this.state.reviewPost.zipcode === "" ? (
                    <span className="spanValid">
                      {this.state.ValidationError}
                    </span>
                  ) : null} */}
                  <label>Country</label>
                  {/* <input type="text" name="country" /> */}
                  <Select
                    options={this.state.countries}
                    isSearchable={true}
                    onChange={this.reviewChange}
                  />
                  <label>Review</label>
                  <input
                    type="text"
                    name="review"
                    onChange={this.reviewChange}
                  />
                  {/* {this.state.reviewPost.review === "" ? (
                    <span className="spanValid">
                      {this.state.ValidationError}
                    </span>
                  ) : null} */}
                  <Recaptcha
                    sitekey={process.env.React_App_site_key}
                    render="explicit"
                    onloadCallback={this.captchaLoad}
                    verifyCallback={this.verify}
                  />
                  <span className="text-danger font-weight-normal" style={{ fontSize: "17px" }}>{this.state.verifyMessage}</span><br/>
                  <button onClick={this.postReview}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal review  fade"
          id="myModal2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModal2"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="reviewtitle">
                  {/* {t(`languages.Product_Reviews`)} */}
                  {productDetailsLangObject.languages.Product_Reviews}
                </div>
                {this.state.reviewData.length > 0 &&
                  this.state.reviewData.map((ele, index) => (
                    <div className="reviewtextmain" key={index}>
                      <div className="reviewmain">
                        {Array.from({ length: ele.rating }).map((ele, i) => (
                          <span key={i} className="star-icon filled">★</span>
                        ))}
                        {Array.from({ length: 5 - ele.rating }).map((ele, i) => (
                          <span key={i} className="star-icon">★</span>
                        ))}
                        <span className="reviews-text">
                          {moment(ele.createdAt).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <p>{ele.review}</p>
                      <span>
                        {ele.name} | {ele?.country}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
       

      </React.Fragment>
    
    );
  }
}

export default withRouter(ProductDetails)
