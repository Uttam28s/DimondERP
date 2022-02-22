// import { rough } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
import { Rough } from "../js/apiList";
import { rough } from "../js/actions";

export const getRough = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(Rough.getRough.method, Rough.getRough.url, id)
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: rough.roughGet, payload: res.docs });
        // dispatch({ type: listing.chequeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getRoughPrefrence = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(Rough.getRoughPrefrence.method, Rough.getRoughPrefrence.url, id)
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: rough.roughPreference, payload: res.docs });
        // dispatch({ type: listing.chequeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getSortingData = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(Rough.getSortingData.method, Rough.getSortingData.url, id)
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: rough.sortingData, payload: res.docs });
        // dispatch({ type: listing.chequeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const addRough = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(Rough.addRough.method, Rough.addRough.url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const addSortingData = (data) => (dispatch) => {
  console.log("data", data);
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(Rough.addSortingData.method, Rough.addSortingData.url, data)
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
