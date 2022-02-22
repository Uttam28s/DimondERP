// import { rough } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
import { Office } from "../js/apiList";
import { office } from "../js/actions";

export const getOfficeList = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(Office.getOffice.method, Office.getOffice.url, id)
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: office.officeGet, payload: res.docs });
        // dispatch({ type: listing.chequeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getOfficeSubList = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(Office.getSubOffice.method, Office.getSubOffice.url, id)
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: office.officeSubGet, payload: res.docs });
        // dispatch({ type: listing.chequeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getpacketSrNo = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(Office.getOfficeSr.method, Office.getOfficeSr.url, id)
      .then((res) => {
        console.log("res", res);
        // dispatch({ type: office.officeSubGet, payload: res.docs });
        // dispatch({ type: listing.chequeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

// export const getRoughPrefrence = () => (dispatch) =>
//   new Promise((resolve, reject) => {
//     // console.log("TCL: data", id);
//     fetchUrl(Rough.getRoughPrefrence.method, Rough.getRoughPrefrence.url)
//       .then((res) => {
//         // console.log("res", res);
//         dispatch({ type: rough.roughPreference, payload: res.docs });
//         // dispatch({ type: listing.chequeTotal, payload: res });
//         resolve(res);
//       })
//       .catch((e) => {
//         reject(e);
//       });
//   });

// export const getSortingData = (id) => (dispatch) =>
//   new Promise((resolve, reject) => {
//     // console.log("TCL: data", id);
//     fetchUrl(Rough.getSortingData.method, Rough.getSortingData.url, id)
//       .then((res) => {
//         // console.log("res", res);
//         dispatch({ type: rough.sortingData, payload: res.docs });
//         // dispatch({ type: listing.chequeTotal, payload: res });
//         resolve(res);
//       })
//       .catch((e) => {
//         reject(e);
//       });
//   });

export const assignOffice = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(Office.assignOffice.method, Office.assignOffice.url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const createSubPacket = (data) => (dispatch) => {
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      Office.createOfficePacket.method,
      Office.createOfficePacket.url,
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

export const returnOfficePacket = (data) => (dispatch) => {
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      Office.returnOfficePacket.method,
      Office.returnOfficePacket.url,
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

// export const editCheque = (id, data) => dispatch =>
//   new Promise((resolve, reject) => {
//     // console.log("TCL: data", id);
//     fetchUrl(
//       localStorage.getItem("reversePin") === "205" ? "Post" : "patch",
//       `/cheque/edit/${id}`,
//       data
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });

// export const deleteCheque = id => dispatch =>
//   new Promise((resolve, reject) => {
//     // console.log("TCL: data", id);
//     fetchUrl(
//       localStorage.getItem("reversePin") === "205" ? "Post" : "delete",
//       `/cheque/delete/${id}`
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });

// export const filterCheque = id => dispatch =>
//   new Promise((resolve, reject) => {
//     // console.log("TCL: data", id);
//     fetchUrl(
//       localStorage.getItem("reversePin") === "205" ? "Post" : "get",
//       `/cheque/filter`,
//       id
//     )
//       .then(res => {
//         dispatch({ type: listing.chequeListing, payload: res.docs });
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });
