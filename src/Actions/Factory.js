import {fetchUrl} from "../js/fetchUrl";
import {Factory} from "../js/apiList";
import {factory} from "../js/actions";


export const assignFactory = (data) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data Factory", data);
        fetchUrl(Factory.assignFactory.method, Factory.assignFactory.url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });


export const getFactoryList = (id) => (dispatch) =>
    new Promise((resolve, reject) => {
        console.log("TCL: data", id);
        fetchUrl(Factory.getFactoryList.method, `${Factory.getFactoryList.url}`, id)
            .then((res) => {
                // console.log("res", res);
                id && Object.keys(id) && dispatch({type: factory.factoryGet, payload: {data: res.data, totalCarat: res.totalCarat}});
                // dispatch({ type: listing.chequeTotal, payload: res });
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });


export const getFactorySubList = (id) => (dispatch) =>
    new Promise((resolve, reject) => {
        // console.log("TCL: data", id);
        fetchUrl(Factory.getSubFactory.method, Factory.getSubFactory.url, id)
            .then((res) => {
                // console.log("res", res);
                //    dispatch({type: Factory.FactorySubGet, payload: res.docs});
                // dispatch({ type: listing.chequeTotal, payload: res });
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });

export const getFactorypacketSrNo = (id) => (dispatch) =>
    new Promise((resolve, reject) => {
        //  console.log("TCL: data11112", id, `${Factory.getFactorySr.url}?roughId=${id.FactoryId}}?srno=${id.srno}`, id);
        fetchUrl(Factory.getFactorySr.method, `${Factory.getFactorySr.url}`, id)
            .then((res) => {
                console.log("res", res);
                // dispatch({ type: Factory.FactorySubGet, payload: res.docs });
                // dispatch({ type: listing.chequeTotal, payload: res });
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });



export const createFactoryPacket = (data) => (dispatch) => {
    new Promise((resolve, reject) => {
        console.log("TCL: data", data);
        fetchUrl(
            Factory.createFactoryPacket.method,
            Factory.createFactoryPacket.url,
            data
        )
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
};


export const returnFactoryPacket = (data) => (dispatch) => {
    new Promise((resolve, reject) => {
        // console.log("returnFactoryPacket", data);
        fetchUrl(
            Factory.returnFactoryPacket.method,
            Factory.returnFactoryPacket.url,
            data
        )
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
};



export const returnFactorySubPacket = (data) => {
    new Promise((resolve, reject) => {
        console.log("returnFactorySubPacket", data);
        fetchUrl(
            Factory.returnFactorySubPacket.method,
            Factory.returnFactorySubPacket.url,
            data
        )
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
}