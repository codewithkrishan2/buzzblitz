// is logged in
export const isLoggedIn = () => {
    return localStorage.getItem("data") ? true : false;
};


// do log in (Set in Local Storage)
export const doLogIn = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};


// do log out(remove from local storage)
export const doLogOut = (next) => {
   localStorage.removeItem("data");
   next();
};


// get current user
export const getCurrentUserDetail = () => {

    if (isLoggedIn())
        return JSON.parse(localStorage.getItem("data")).user;
    else
        return undefined;

};

export const getToken = ()=>{
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token;    
    }
    else{
        return null;
    }
};