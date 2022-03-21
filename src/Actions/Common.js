export const getUnusedList = (id) => (dispatch) =>
    new Promise((resolve, reject) => {
        //  console.log("TCL: data111", id, Office.unusedList.method, `${Office.unusedList.url}${id ? `?${id}` : ""}`);
        fetchUrl(Office.unusedList.method, `${Office.unusedList.url}${id ? `?${id}` : ""}`)
            .then((res) => {
                //  console.log("TCL: data111", res);
                resolve(res);
            })
            .catch((e) => {
                reject(e);
                //console.log("TCL: data111", e);


            });
    });