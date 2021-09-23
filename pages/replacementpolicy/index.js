import React, { Component } from 'react'
// import Footer from './Footer/Footer';
import { postAPI, postFile, getAPI } from '../../utils/api';
import { Baseurl, storageUrl } from '../../utils/BaseUrl';
import { withRouter } from 'next/router';
// import { withTranslation } from 'react-i18next';
import MetaDecorator from '../../utils/MetaDecorator';
import { getCurrentLocaleFromUrl, projectLanguages } from '../../utils/helperFunctions';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

class Replacementpolicy extends Component {
    state = {
        contactPayload: {
            "name": "",
            "email": "",
            "address": "",
            "zipcode": "",
            "phone": "",
            "defect": "",
            "productLength": "",
            "productName": "",
            "productType": "",
            "productSize": "",
            "image": "",
            "purchaseReciept": ''
        },
        contactPayloadError: {
            "nameError": false,
            "emailError": false,
            "addressError": false,
            "zipcodeError": false,
            "phoneError": false,
            "defectError": false,
            "productNameError": false,
            "imageError": false,
            "productTypeError": false,
            "productSizeError": false,
        },
        productToggle: false,
        productTogglehook: false,
        templateData: [],
        seoTitle: '',
        langObj: {},
        lang_i: '',
        successMessage: "",
        errorMessage: "",
        imageUpload: false
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.i18n.language.split('-')[0] !== prevProps.language && prevProps.language !== "") {
    //         this.setState({
    //             lang_i: this.props.i18n.language.split('-')[0]
    //         }, () => {
    //             let { lang_i } = this.state
    //             let oldroute = this.props.location.pathname
    //             let oldrouteSplit = oldroute.split('/')
    //             oldrouteSplit.splice(oldrouteSplit.length - 1, 1, lang_i)
    //             let newroute = oldrouteSplit.join('/')
    //             this.props.history.push(newroute)
    //             getAPI(`template/getMenuTemplates/16?lang=${this.state.lang_i}`)
    //                 .then(res => {
    //                     const { status, data } = res.data
    //                     if (status === 1) {
    //                         if (data.length > 0) {
    //                             if (data[0].adminMenuUid === 16 && data[0].type === "topBanner") {
    //                                 this.setState({
    //                                     templateData: data[0].templateData
    //                                 }, () => {
    //                                     let metas = document.getElementsByTagName("title");
    //                                     this.setState({
    //                                         seoTitle: metas[metas.length - 1]
    //                                     })
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 }).catch(err => console.log(err));
    //         })
    //     }
    // }

    // componentDidMount() {
    //     // window.scrollTo(0, 0)
    //     // const { language } = this.props;
    //     const r = this.props.router;
    //     const lang  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
    //     // let langus = localStorage.getItem("languages")
    //     // if(langus && !langus.includes(lang)){
    //     //     this.props.history.push("/NotFound")
    //     // }
    //     // let lang = 'en'
    //     if (lang) {
    //         this.setState({
    //             lang_i: lang
    //         }, () => {
    //             getAPI(`template/getMenuTemplates/16?lang=${this.state.lang_i}`)
    //                 .then(res => {
    //                     const { status, data } = res.data
    //                     if (status === 1) {
    //                         if (data.length > 0) {
    //                             if (data[0].adminMenuUid === 16 && data[0].type === "topBanner") {
    //                                 this.setState({
    //                                     templateData: data[0].templateData
    //                                 }, () => {
    //                                     let metas = document.getElementsByTagName("title");
    //                                     this.setState({
    //                                         seoTitle: metas[metas.length - 1]
    //                                     })
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 }).catch(err => console.log(err));
    //         })
    //     }
    // }


    validateForm = async () => {
        let { name, email, address, zipcode, phone, defect, productName, image, productType, productSize } = this.state.contactPayload
        let isValid = true
        let namereg = /^[a-zA-Z ]{2,30}$/
        let emailreg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // let zipcodereg = /(^\d{6}$)|(^\d{5}-\d{4}$)/
        if (name.length < 1 || !namereg.test(name)) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, nameError: true
                }
            })
        }
        if (email.length < 1 || !emailreg.test(String(email).toLowerCase())) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, emailError: true
                }
            })
        }
        if (address.length < 1) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, addressError: true
                }
            })
        }
        if (!Number(zipcode)) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, zipcodeError: true
                }
            })
        }
        if (!Number(phone)) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, phoneError: true
                }
            })
        }
        if (defect.length < 1) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, defectError: true
                }
            })
        }
        if (productName.length < 1) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, productNameError: true
                }
            })
        }
        if (image.length < 1) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, imageError: true
                }
            })
        }
        if (productType.length < 1) {
            isValid = false
            await this.setState({
                contactPayloadError: {
                    ...this.state.contactPayloadError, productTypeError: true
                }
            })
        }
        if (this.state.productToggle || this.state.productTogglehook) {
            if (productSize.length < 1) {
                isValid = false
                await this.setState({
                    contactPayloadError: {
                        ...this.state.contactPayloadError, productSizeError: true
                    }
                })
            }
        }
        return isValid
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({
            contactPayload: {
                ...this.state.contactPayload, [name]: value
            },
            contactPayloadError: {
                ...this.state.contactPayloadError, [`${name}Error`]: false
            }
        })
        {console.log(this.state)}
        if (name === "productType") {
            let val = value.split(" ")
            if (val[val.length - 1] === "Needles") {
                this.setState({
                    productToggle: true,
                    productTogglehook: false
                })
            } else if (val[val.length - 1] === "Hook") {
                this.setState({
                    productTogglehook: true,
                    productToggle: false
                })
            }
            else {
                this.setState({
                    productToggle: false,
                    productTogglehook: false
                })
                {console.log(this.state)}
            }
        }
    }

    chooseImage = (e) => {
        if(e.target.files.length > 0){
            this.setState({ imageUpload: true })
            postFile('upload/upload/testImage', e.target.files[0])
                .then(res => {
                    this.setState({
                        contactPayload: {
                            ...this.state.contactPayload,
                            image: storageUrl + res.data.data[0].s3key
                        },
                        contactPayloadError: {
                            ...this.state.contactPayloadError, imageError: false
                        },
                        imageUpload: false
                    });
                }).catch(err => console.log(err))
        }
    }

    choosepurchaseReciept = (e) => {
        if(e.target.files.length>0){
            postFile('upload/upload/testImage', e.target.files[0])
                .then(res => {
                    this.setState({
                        contactPayload: {
                            ...this.state.contactPayload,
                            purchaseReciept: storageUrl + res.data.data[0].s3key
                        }
                        // contactPayloadError: {
                        //     ...this.state.contactPayloadError, purchaseRecieptError: false
                        // }
                    });
                }).catch(err => console.log(err))
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let isvalid = await this.validateForm()
        if (isvalid) {
            postAPI('replacement/product', this.state.contactPayload)
                .then(res => {
                    let { data, status } = res.data
                    if (status === 1) {
                        for (const key in this.state.contactPayload) {
                            this.setState({
                                contactPayload: {
                                    ...this.state.contactPayload, [key]: ""
                                },
                                successMessage: /*`${this.props.t(`languages.Successfully submitted`)}`*/"Successfully submitted"
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        successMessage: ""
                                    })
                                }, 3000)
                                document.getElementById("myFile").value = ""
                                document.getElementById("myFileR").value = ""
                                window.scrollTo(0, 0)
                            })
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        errorMessage: "Something went wrong"
                    }, () => {
                        setTimeout(() => {
                            this.setState({errorMessage: ""})
                        }, 3000)
                    })
                })
        }
    }

    render() {
        const { contactPayload, productToggle, productTogglehook, contactPayloadError, templateData, langObj } = this.state
        // const { t } = this.props
        const r = this.props.router;
        const {allTemplates} = this.props
        const lang = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)

        const data = allTemplates.filter(temp => Object.keys(temp)[0] === lang)[0]
        const pageData = data[lang]
        const language  = getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)
        const replacementPolicyLangObj = require(`../../public/locales/${language}/common.json`)
        const err_msg_box = {
            minWidth: "200px",
            width: "250px",
            display: "block",
            margin: "0 auto",
            color: "#ffffff",
        //     minWidth: "250px",
        // color: "#fff",
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
        // color: "#fff",
        transform: "translate(-50%,-50%)",
        backgroundColor: "rgb(17 175 41)",
        padding: "20px 20px",
        borderRadius: "5px"
      }
      
      const card_center_msg =  {
        position: "absolute",
        top: "62px",
        left: "50%",
        "zIndex": "9999"
      }

        return (
            <React.Fragment>
                <MetaDecorator
                    title={pageData?.ogFields?.ogTitle  ?  pageData?.ogFields?.ogTitle : ""}
                    description={pageData?.ogFields?.ogDescription  ? pageData?.ogFields?.ogDescription : ""}
                    // keywords={keywords}
                    ogTitle={pageData?.ogFields?.ogTitle  ?  pageData?.ogFields?.ogTitle : ""}
                    ogDescription={pageData?.ogFields?.ogDescription  ? pageData?.ogFields?.ogDescription : ""}
                    ogImage={pageData?.ogFields?.ogImage  ? pageData?.ogFields?.ogImage : ""}
                />
                {/* <div className="sm_modile_alert" style={card_center_msg}>
                    
                     {
                        this.state.successMessage !== ""
                        ?
                    <div className="animate__animated animate__fadeIn text-center" style={suc_msg_box} role="alert">
                        {this.state.successMessage}
                    </div>
                        :
                        null
                    }
                    </div> */}
                <section id="contactusmain">
                    <div className="contactinnerwrap">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <h1 className="text-center">
                                {/* {t(`languages.ProductReplacement`)}  */}
                                {replacementPolicyLangObj.languages.ProductReplacement}
                                </h1>
                                <div className="sets-container" dangerouslySetInnerHTML={{ __html:  pageData.templateData[0].header }} />
                            </div>
                            <div className="col-sm-12 col-md-12 mt-90">
                                <div className="contactformmsin">
                                    <form className="row">
                                        <label style={{ textAlign: 'left' }}><strong>
                                            {/* {t(`languages.Customer_Details`)} */}
                                            {replacementPolicyLangObj.languages.Customer_Details}
                                            </strong><span> (
                                            {/* {t('languages.Only_required_to_facilitate_the_replacement_process')} */}
                                            {replacementPolicyLangObj.languages.Only_required_to_facilitate_the_replacement_process}
                                            )</span></label>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Name`)}  */}
                                                {replacementPolicyLangObj.languages.Name}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="name" placeholder value={contactPayload.name} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.nameError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.only_Alphabet_Required`)} */}
                                                        {replacementPolicyLangObj.languages.only_Alphabet_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Address`)}Address */}
                                                {replacementPolicyLangObj.languages.Address}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="address" placeholder value={contactPayload.address} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.addressError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.Field_Required`)} */}
                                                        {replacementPolicyLangObj.languages.Field_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Zip_Code`)} */}
                                                {replacementPolicyLangObj.languages.Zip_Code}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="zipcode" placeholder value={contactPayload.zipcode} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.zipcodeError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.only_Numeric_Required`)} */}
                                                        {replacementPolicyLangObj.languages.only_Numeric_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Phone`)} */}
                                                {replacementPolicyLangObj.languages.Phone}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="phone" placeholder value={contactPayload.phone} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.phoneError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.only_Numeric_Required`)} */}
                                                        {replacementPolicyLangObj.languages.only_Numeric_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Email<span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="email" placeholder value={contactPayload.email} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.emailError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.Invalid_Email`)} */}
                                                        {replacementPolicyLangObj.languages.Invalid_Email}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Defect`)} */}
                                                {replacementPolicyLangObj.languages.Defect}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="defect" placeholder value={contactPayload.defect} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.defectError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.Field_Required`)} */}
                                                        {replacementPolicyLangObj.languages.Field_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <label style={{ textAlign: 'left' }}><strong>
                                            {/* {t(`languages.Product_Details`)} */}
                                            {replacementPolicyLangObj.languages.Product_Details}
                                            </strong></label>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Product_Name`)} */}
                                                {replacementPolicyLangObj.languages.Product_Name}
                                                 <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" name="productName" placeholder="Enter the product name e.g. Ginger, Zing...etc." value={contactPayload.productName} onChange={this.handleChange} />
                                            {
                                                contactPayloadError.productNameError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.Field_Required`)} */}
                                                        {replacementPolicyLangObj.languages.Field_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Product_Type`)}  */}
                                                {replacementPolicyLangObj.languages.Product_Type}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <select className="select2" name="productType" value={contactPayload.productType} onChange={this.handleChange}>
                                                <option>
                                                    {/* {t(`languages.Select_product_type`)}  */}
                                                    {replacementPolicyLangObj.languages.Select_product_type}
                                                    </option>
                                                <option value="Single Pointed Needles">
                                                    {/* {t(`languages.Single_Pointed_Needles`)} */}
                                                    {replacementPolicyLangObj.languages.Single_Pointed_Needles}
                                                    </option>
                                                <option value="Double Pointed Needles">
                                                    {/* {t(`languages.Double_Pointed_Needles`)} */}
                                                    {replacementPolicyLangObj.languages.Double_Pointed_Needles}
                                                    </option>
                                                <option value="Fixed Circular Needles">
                                                    {/* {t(`languages.Fixed_Circular_Needles`)} */}
                                                    {replacementPolicyLangObj.languages.Fixed_Circular_Needles}
                                                    </option>
                                                <option value="Interchangeable Circular Needles">
                                                    {/* {t(`languages.Interchangeable_Circular_Needles`)} */}
                                                    {replacementPolicyLangObj.languages.Interchangeable_Circular_Needles}
                                                    </option>
                                                <option value="Single Ended Crochet Hook">
                                                    {/* {t(`languages.Single_Ended_Crochet_Hook`)} */}
                                                    {replacementPolicyLangObj.languages.Single_Ended_Crochet_Hook}
                                                    </option>
                                                <option value="Double Ended Crochet Hook">
                                                    {/* {t(`languages.Double_Ended_Crochet_Hook`)} */}
                                                    {replacementPolicyLangObj.languages.Double_Ended_Crochet_Hook}
                                                    </option>
                                                <option value="Afghan/Tunisian Crochet Hook">
                                                    {/* {t(`languages.Afghan_Tunisian_Crochet_Hook`)} */}
                                                    {replacementPolicyLangObj.languages.Afghan_Tunisian_Crochet_Hook}
                                                    </option>
                                                <option value="Accessories">
                                                    {/* {t(`languages.Accessories`)} */}
                                                    {replacementPolicyLangObj.languages.Accessories}
                                                    </option>
                                                <option value="Others">
                                                    {/* {t(`languages.Others`)} */}
                                                    {replacementPolicyLangObj.languages.Others}
                                                    </option>
                                            </select>
                                        </div>
                                        {
                                            contactPayloadError.productTypeError
                                                ?
                                                <span className="text-danger">
                                                    {/* {t(`languages.Field_Required`)} */}
                                                    {replacementPolicyLangObj.languages.Field_Required}
                                                    *</span>
                                                :
                                                null
                                        }
                                        {
                                            productToggle
                                                ?
                                                <>
                                                    <div className="col-sm-6 needle-box needle">
                                                        <label>
                                                            {/* {t(`languages.Needle_Length`)} */}
                                                            {replacementPolicyLangObj.languages.Needle_Length}
                                                            </label>
                                                        <input type="text" name="productLength" placeholder value={contactPayload.productLength} onChange={this.handleChange} />
                                                    </div>
                                                    <div className="col-sm-6 needle-box needle">
                                                        <label>
                                                            {/* {t(`languages.Needle_Size`)}  */}
                                                            {replacementPolicyLangObj.languages.Needle_Size}
                                                            <span style={{ color: 'red' }}>*</span> </label>
                                                        <input type="text" name="productSize" placeholder value={contactPayload.productSize} onChange={this.handleChange} />
                                                        {
                                                            contactPayloadError.productSizeError
                                                                ?
                                                                <span className="text-danger">
                                                                    {/* {t(`languages.Field_Required`)} */}
                                                                    {replacementPolicyLangObj.languages.Field_Required}
                                                                    *</span>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </>
                                                :
                                                null
                                        }

                                        {
                                            productTogglehook
                                                ?
                                                <div className="col-sm-6 needle-box needle">
                                                    <label>
                                                        {/* {t(`languages.Needle_Size`)}  */}
                                                        {replacementPolicyLangObj.languages.Needle_Size}
                                                        <span style={{ color: 'red' }}>*</span> </label>
                                                    <input type="text" name="productSize" placeholder value={contactPayload.productSize} onChange={this.handleChange} />
                                                    {
                                                        contactPayloadError.productSizeError
                                                            ?
                                                            <span className="text-danger">
                                                                {/* {t(`languages.Field_Required`)} */}
                                                                {replacementPolicyLangObj.languages.Field_Required}
                                                                *</span>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                :
                                                null
                                        }

                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Upload_Product_Image`)} */}
                                                {replacementPolicyLangObj.languages.Upload_Product_Image}
                                                <span style={{ color: 'red' }}>*</span></label>
                                            <input type="file" id="myFile" name="image" onChange={this.chooseImage} accept="image/x-png,image/gif,image/jpeg" />
                                            {
                                                contactPayloadError.imageError
                                                    ?
                                                    <span className="text-danger">
                                                        {/* {t(`languages.Field_Required`)} */}
                                                        {replacementPolicyLangObj.languages.Field_Required}
                                                        *</span>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <label>
                                                {/* {t(`languages.Product_receipt`)} */}
                                                {replacementPolicyLangObj.languages.Product_receipt}
                                                </label>
                                            <input type="file" id="myFileR" name="purchaseReciept" onChange={this.choosepurchaseReciept} accept="image/x-png,image/jpeg, application/pdf" />
                                            {/* {
                                                contactPayloadError.purchaseRecieptError
                                                    ?
                                                    <span className="text-danger">{t(`languages.Field_Required`)}*</span>
                                                    :
                                                    null
                                            } */}
                                        </div>
                                        <button onClick={this.handleSubmit} disabled={this.state.imageUpload}>
                                            {/* {t(`languages.Submit`)}  */}
                                            {replacementPolicyLangObj.languages.Submit}
                                            </button>
                                        <span className="text-success">{this.state.successMessage}</span>
                                        <span className="text-danger">{this.state.errorMessage}</span>
                                    </form>
                                </div>
                            </div>
                            <div className="sets-container  my-30" dangerouslySetInnerHTML={{ __html: pageData.templateData[0].footer }} />
                            {/* <p style={{ fontSize: '18px', textAlign: 'left', margin: '30px 20px' }}>We are committed to providing products of high quality and performance to all of our customers. Please do write to us at <a href="mailto:support@knitpro.eu">support@knitpro.eu</a>  if you need any additional information regarding any of our product related policies.</p> */}
                        </div>
                    </div>
                </section>
                {/* <Footer allLanguage={this.props.allLanguage} langObj={langObj} /> */}
            </React.Fragment>
        )
    }
}


export async function getStaticProps() {

    
    //   const languageRes = await fetch (`${Baseurl}language/language?lang=en`)
    //   const languageData = await languageRes.json()
    //   const allLanguage = languageData.data
    const getPageProps = async (lang) => {
        const res = await fetch(`${Baseurl}template/getMenuTemplates/16?lang=${lang}`)
        const data = await res.json()
        const templateArray = data.data
        const template = (templateArray.filter(temp => temp.type === 'topBanner'))[0]
        return ({ [lang]: template })
    }
        
    
    return {
        props: {
            allTemplates: [
                await getPageProps(projectLanguages[0]),
                await getPageProps(projectLanguages[1])
            ]
        }
    };
}

// export default withRouter(withTranslation()(Replacementpolicy))

// export async function getStaticProps ({ locale }) {
//     return {
//         props: {
//           ...await serverSideTranslations(locale, ['common']),
//         },
//       }
//   }

export default withRouter(Replacementpolicy)