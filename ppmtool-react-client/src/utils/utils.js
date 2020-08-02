
export const convertDateToBase = dateToConvert => {

    if (dateToConvert !== "") {
        const arr = dateToConvert.split("-");
        return arr[2] + "/" + arr[1] + "/" + arr[0];
    } else {
        return dateToConvert;
    }
}

export const convertDateFromBase = dateToConvert => {
 
    if (dateToConvert !== "") {
        const arr = dateToConvert.split("/");
        return arr[2] + "-" + arr[1] + "-" + arr[0];
    } else {
        return dateToConvert;
    }
      
}