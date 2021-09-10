import axios from "axios";
import { Baseurl } from "./BaseUrl";

export const postAPI = (path, data) => {
    const token = localStorage.getItem("userToken");
    return axios({
        method: "post",
        url: Baseurl + path,
        headers: { "content-type": "application/json", Authorization: "Bearer " + token },
        data: data,
    });
};

export const postFile = (path, file) => {
    // const token = localStorage.getItem('userToken');
    let formData = new FormData();
    formData.append("file", file);
    const config = {
        headers: {
            "content-type": "multipart/form-data",
            // 'Authorization': 'Bearer ' + token,
        },
    };

    return axios.post(Baseurl + path, formData, config);
};

export const putAPI = (path, data) => {
    const token = localStorage.getItem("userToken");
    return axios({
        method: "put",
        url: Baseurl + path,
        headers: { "content-type": "application/json", Authorization: "Bearer " + token },
        data: data,
    });
};

export const getAPI = (path) => {
    const token = localStorage.getItem("userToken");
    return axios({
        method: "get",
        url: Baseurl + path,
        headers: { "content-type": "application/json", Authorization: "Bearer " + token },
    });
};

export const deleteAPI = (path, data) => {
    // const token = localStorage.getItem('SignUpidToken' );
    return axios({
        method: "delete",
        url: Baseurl + path,
        // headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token},
        data: data,
    });
};

export const postPublicAPI = (path, data) => {
    return axios({
        method: "post",
        url: Baseurl + path,
        headers: { "content-type": "application/json" },
        data: data,
    });
};
