import {fetchUrl} from "../js/fetchUrl";
import {Remove} from "../js/apiList";




export const removeMainRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.removeMainRough.method, Remove.removeMainRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });


export const removeOfficeRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.removeOfficeRough.method, Remove.removeOfficeRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });

export const removeFactoryRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.removeFactoryRough.method, Remove.removeFactoryRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });


export const removeOfficeSubRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.removeOfficeSubRough.method, Remove.removeOfficeSubRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });

export const removeFactorySubRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.removeFactorySubRough.method, Remove.removeFactorySubRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });