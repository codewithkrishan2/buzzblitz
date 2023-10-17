import { myAxios } from "./Helper";

export const signUp = (user) => {
    return myAxios.post('/auth/register',user)
    .then((response) => response.data);
};


export const loginUser =(loginDetail)=>{
    return myAxios.post('/auth/login',loginDetail)
    .then((response) => response.data);
};


//Get Posts by Category
export const loadPostsByCategory = (categoryId) => {
    return myAxios.get(`/categories/${categoryId}/posts`)
    .then((response) => response.data);
}

//Getting User by userId from the server
export const getUserByUserId = (userId) => {
    return myAxios.get(`/user/${userId}`)
    .then((response) => response.data);
}