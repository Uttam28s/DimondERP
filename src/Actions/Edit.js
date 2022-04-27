import {fetchUrl} from "../js/fetchUrl";
import {Edit} from "../js/apiList";




export const editMainRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.editMainRough.method, Remove.editMainRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });

export const editOfficeAndFactory = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.editOfficeAndFactory.method, Remove.editOfficeAndFactory.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });

export const editOfficeSubPacket = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.editOfficeSubPacket.method, Remove.editOfficeSubPacket.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });

export const editOfficeReturnRough = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Remove.editOfficeReturnRough.method, Remove.editOfficeReturnRough.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
