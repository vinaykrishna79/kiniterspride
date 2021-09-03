import React, { Component } from 'react';
import moment from 'moment';
import Link from "next/link";
import Select from "react-select";
import { getAPI, postAPI } from '../utils/api';
import { getCurrentLocaleFromUrl } from '../utils/helperFunctions';
import { withRouter } from 'next/router';

class SideBarMenu extends Component {
    state = {
        email: "",
        language: {},
        errorMessage: "",
        message: ""
    }

    componentDidMount() {
        this.getLanguages();
      }

    handleChange = (e) => {
        if (e?.target) {
          this.setState({ email: e.target.value });
        } else {
          this.setState({ language: e });
        }
      };

      getLanguages() {
        getAPI(`language/language?lang=en`)
          .then((res) => {
            this.setState({ allLanguage: res.data.data }, () => {
              let languages = this.state.allLanguage.map((lang, index) => {
                return {
                  label: lang["name"],
                  value: lang["shortName"],
                };
              });
              this.setState({ languages: languages });
            });
          })
          .catch((err) => console.log("Header lang error: ", err));
      }

      submitNews = (e) => {
        const r = this.props.router;
        const sideBarMenuLangObj = require(`../public/locales/${getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)}/common.json`)
        e.preventDefault();
        let { email, language } = this.state;
        if (email !== "" && language?.value) {
          postAPI("newsletter/subscribe", {
            email: email,
            language: language.value,
          })
            .then((res) => {
              let { message, status } = res.data;
              if (status === 1) {
                this.setState({
                  email: "",
                  language: "",
                  // errorMessage: `${this.props.t(`languages.Successfully submitted`)}`,
                  message: sideBarMenuLangObj.languages["Successfully submitted"],
                }, () => {
                    setTimeout(() => {
                        this.setState({ message: "" });
                      }, 2000);
                });
              } else if (status === 2) {
                this.setState({
                  errorMessage: message,
                });
                setTimeout(() => {
                  this.setState({ errorMessage: "" });
                }, 2000);
              }
            })
            .catch((error) => {
              this.setState({
                errorMessage: 'Something Went Wrong!'
              }, () => {
                  setTimeout(() => {
                      this.setState({ errorMessage: "" });
                    }, 2000);
              });
              console.log(error)
            });
        }
      };

    render() {
        const { allCateg, allArchive, monthlyBlog, t } = this.props
        const { languages } = this.state;
        const r = this.props.router;
        const sideBarMenuLangObj = require(`../public/locales/${getCurrentLocaleFromUrl(r.asPath, r.locales, r.defaultLocale)}/common.json`)
        const btnClass = {
            "margin": "10px 0",
            "padding": "12px 20px",
            "fontSize": "16px",
            "background": "#d91b5c",
            "color": "#fff",
            "textDecoration": "none",
            "width": "fit-content",
            "cursor": "pointer"
            }
        const err_msg_box = {
                "padding": "10px 30px 10px 30px",
                "width": "fit-content",
                "borderRadius": "5px",
                "position": "relative"
                }

        // const archive_style = {
        //   "margin": "0 0 20px 0",
        //   "padding": "20px 30px",
        //   "height": "260px",
        //   "overflow": "auto",
        //   "text-align": "justify"
        // }
        return (
            <React.Fragment>
                <div className="sidebar-box">
                    <h3 className="sidebar-heading sans-font">
                      {/* {t(`languages.GET NEWSLETTER`)} */}
                      {sideBarMenuLangObj.languages["GET NEWSLETTER"]}
                      </h3>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <label
                        className="emailaddress"
                        htmlFor="exampleInputEmail1"
                      >
                        {/* {t(`languages.Select_your_preferred_language`)} */}
                        {sideBarMenuLangObj.languages.Select_your_preferred_language}
                      </label>
                      <Select
                        value={this.state.language}
                        onChange={this.handleChange}
                        options={languages}
                        placeholder="Select Language"
                        className="selct-language"
                      />
                    <div className="btn-b">
                        <p style={btnClass} onClick={(e) => this.submitNews(e)} >
                          {/* {t(`languages.Join Knitpro`)} */}
                          {sideBarMenuLangObj.languages["Join Knitpro"]}
                          </p>
                    </div>
                    <span className="text-center text-danger" style={err_msg_box}>{this.state.errorMessage}</span>
                    <span className="text-center text-success" style={err_msg_box}>{this.state.message}</span>
                </div>

                <div className="sidebar-box">
                    <h3 className="sidebar-heading sans-font">
                      {/* {t(`languages.CATEGORIES`)} */}
                      {sideBarMenuLangObj.languages.CATEGORIES}
                      </h3>
                    <ul className="categories">
                        {
                            allCateg.length > 0 && allCateg.map((ele, index) => (
                                <li key={index}>
                                    <a onClick={() => this.props.categoryWiseBlogs(ele.uid)}>{ele.name} <span>({ele.blogs})</span></a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="sidebar-box">
                    <h3 className="sidebar-heading sans-font">
                      {/* {t(`languages.ARCHIVES`)} */}
                      {sideBarMenuLangObj.languages.ARCHIVES}
                      </h3>
                    <ul className="categories"> 
                      <div className="panel-group" id="accordion7401210">
                              {allArchive?.length > 0 && allArchive.map((ele, index) => (
                                  <div
                                    className="panel panel-default"
                                    key={index}
                                  >
                                    <div
                                      className="panel-heading"
                                      id="heading8122873"
                                    >
                                        <a
                                          role="button"
                                          data-toggle="collapse"
                                          id="collapseanchor"
                                          // className="accordion-plus-toggle collapsed"
                                          style={{"color": "#000000"}}
                                          data-parent="#accordion7401210"
                                          href={"#collapse8122873" + index}
                                          aria-expanded="false"
                                          aria-controls={
                                            "collapse8122873" + index
                                          }
                                        >
                                          <i className="fa fa-caret-right mr-2" aria-hidden="true"></i>
                                          <span className="post-count-link mr-2">{ele.year}</span>
                                    <span className="post-count">({ele.count})</span>
                                        </a>
                                    </div>
                                    <div
                                      id={"collapse8122873" + index}
                                      className="panel-collapse collapse"
                                      role="tabpanel"
                                      aria-labelledby="heading8122873"
                                      data-parent="#accordion7401210"
                                      style={{"padding": "0px 15px"}}
                                    >
                                        {
                                            ele.months.length > 0 && ele.months.map((item, i) => {
                                              return(
                                                <li key={i}>
                                                    <a className="post-count-link mr-2" onClick={() => monthlyBlog(item, item.count)}>{moment(item.months).format('MMMM')}</a>
                                                    <span className="post-count">({item.count})</span>
                                                </li>
                                              )
                                            })
                                        }
                                    
                                    </div>
                                  </div>
                                ))}
                            </div>
                            </ul>
                            </div>


            </React.Fragment>
        )
    }
}

export default withRouter(SideBarMenu)