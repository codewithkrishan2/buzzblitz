import { myAxios, privateAxios } from "./Helper";

//CreatePosts 
export const createPost = (postData) =>{
    // console.log(postData);
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/createPost`, postData).then(response => {return response.data}); 
};


//Get All Posts
export const loadAllPosts = ( pageNumber, pageSize )=>{
    return myAxios.get(`/posts/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postAddedDate&sortDir=desc`).then(response=>response.data);
};


//Get Post By Id
export const loadPostById = ( postId )=>{
    return myAxios.get(`/post/${postId}`).then(response=>response.data);
}

//Create Comments
export const createComment = (comment,postId) =>{
    return privateAxios.post(`/post/${postId}/comment`,comment)
}

//Upload post banner Image 
export const uploadPostImage = (image,postId) =>{
    let formData = new FormData();
    formData.append('image',image);
    return privateAxios.post(`/post/image/upload/${postId}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => response.data);
};

//Load posts by user (userId)
export const loadPostsByUser = (userId) =>{
    return privateAxios.get(`/user/${userId}/posts`).then(response=>response.data);
}

//Delete Post
export const deletePostService = (postId) =>{
    return privateAxios.delete(`/post/delete/${postId}`).then(response=>response.data);
}


//Update Post
export const updatePostService = (post,postId) =>{
    //console.log("From Post Service");
    return privateAxios.put(`/post/update/${postId}`, post).then(response=>response.data);
}