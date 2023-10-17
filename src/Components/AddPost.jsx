import { useEffect, useState } from 'react';
import { loadAllCategories } from './../Services/CategoryService';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { createPost as doCreatePost } from '../Services/PostService';
import { getCurrentUserDetail } from '../Auth/Index';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { uploadPostImage } from '../Services/PostService';

const AddPost = () => {

    const editor = useRef(null);
    //const [content, setContent] =  useState('');
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);

    const [post, setPost] = useState({
        postTitle: '',
        postContent: '',
        categoryId: 0
    });

    const [image, setImage] = useState(null);

    // Field Change function for bi-directional data binding
    const fieldChanged = (event) => {
        //console.log(event);
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const contentFieldChanged = (data) => {
        setPost({ ...post, postContent: data });
    };

    useEffect(() => {

        //getting the current user details from auth file's method. 
        setUser(getCurrentUserDetail());

        //Loading the categories
        loadAllCategories().then((data) => {
            // console.log(data);
            setCategories(data);
        }).catch(error => {
            // console.log(error);
        });
    }, []);

    //Create Post Function
    const createPost = (event) => {
        
        event.preventDefault();
        // console.log(post);

        //Validations:
        if (post.postTitle.trim() === undefined || post.postTitle.trim() === "") {
            toast.error("Post Title is required");
            return;
        }
        if (post.postContent.trim() === undefined || post.postContent.trim() === "") {
            toast.error("Post Content is required");
            return;
        }
        if (post.categoryId === "" || post.categoryId == null || post.categoryId === 0) {
            toast.error("Please Select one Categrory");
            return
        }

        //Submit the form on the server.
        post['userId'] = user.userId;
        doCreatePost(post).then(data => {

            uploadPostImage(image, data.postId).then(data =>{
                toast.success("Image Uploaded Successfully");
            }).catch(error=>{
                toast.error("Image Upload Failed");
                console.log(error);
            })

            toast.success("Post Created Successfully");
            setPost({
                postTitle: '',
                postContent: '',
                categoryId: 0
            });
        }).catch(error => {
            console.log(error);
            toast.error("Post Creation Failed");
        });
    };

    //handling image upload event function
    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    return (
        <>
            <div className="w-full p-4 border-4 mt-1 rounded-lg shadow-lg">
                {/* {JSON.stringify(post)} */}
                <form className="w-full" onSubmit={createPost} >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <h2 className="font-bold text-3xl leading-7 text-gray-900"> What's On Your Mind</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="postTitle"
                                        className="relative block border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <input
                                            type="text"
                                            id="postTitle"
                                            name="postTitle"
                                            className="peer block w-full border-3 py-2 px-2 bg-transparent placeholder-transparent focus:outline-none focus:ring-0 shadow-sm ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Post Title"
                                            onChange={fieldChanged}
                                        />

                                        <span
                                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                        >
                                            Post Title
                                        </span>
                                    </label>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="headerImage"
                                        className="relative block border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <div className=" flex justify-center  border border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input 
                                                        id="file-upload" 
                                                        name="file-upload" 
                                                        type="file" className="sr-only" 
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                        <span
                                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                        >
                                            Post Header Image
                                        </span>
                                    </label>
                                </div>

                                

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="postContent"
                                        className="relative block  border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        {/* <textarea
                                            type="text"
                                            id="postContent"
                                            rows={7}
                                            className="peer block w-full  border-3 py-2 px-2 bg-transparent placeholder-transparent focus:outline-none focus:ring-0 shadow-sm ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Post Content"
                                        /> */}
                                        <JoditEditor
                                            ref={editor}
                                            onChange={contentFieldChanged}
                                        />

                                        <span
                                            className="pointer-events-none absolute start-2.5 left-0 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                        >
                                            Post Content
                                        </span>
                                    </label>
                                </div>

                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="categoryTitle"
                                        className="relative block  border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <select
                                            type="text"
                                            id="categoryTitle"
                                            className="peer block w-full  border-3 py-2 px-2 bg-transparent placeholder-transparent focus:outline-none focus:ring-0 shadow-sm ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Post Content"
                                            name="categoryId"
                                            onChange={fieldChanged}
                                            defaultValue={0}
                                        >

                                            <option disabled value={0} >--Select category--</option>
                                            {
                                                categories.map((category) => (
                                                    <option value={category.categoryId} key={category.categoryId} >
                                                        {category.categoryId} - &nbsp;
                                                        {category.categoryTitle}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                        <span
                                            className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                        >
                                            Post Category
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="reset"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="rounded-full bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                        >
                            Create Post
                        </button>
                    </div>
                </form >
            </div >


        </>
    )
}

export default AddPost