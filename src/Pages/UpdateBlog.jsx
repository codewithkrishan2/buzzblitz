import { useNavigate, useParams } from 'react-router-dom';
import Base from './../Components/Base';
import { useContext, useEffect, useRef, useState } from 'react';
import userContext from '../Context/UserContext';
import { loadPostById, updatePostService } from './../Services/PostService';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { loadAllCategories } from '../Services/CategoryService';
import { PhotoIcon } from '@heroicons/react/24/solid';

function UpdateBlog() {
    const editor = useRef(null);
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const object = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {

        //Loading the blog post from the server
        loadPostById(postId).then(data => {
            setPost({ ...data, categoryId: data.postCategory.categoryId })
        })
            .catch(error => {
                console.log(error);
                toast.error("Failed to load the blog post")
            })
    }, [])

    useEffect(() => {
        //Loading the categories
        loadAllCategories().then((data) => {
            // console.log(data);
            setCategories(data);
        }).catch(error => {
            // console.log(error);
        });

        if (post) {
            if (post.user.userId != object.user.data.userId) {
                navigate('/');
                toast.error("You are not authorized to edit this post");
            }
        }
    }, [post])

    const handleChange = (event, fieldName) => {
        setPost({
            ...post,
            [fieldName]: event.target.value
        })
    }

    //Update the blog post
    const updatePost = (event) => {
        event.preventDefault();
        console.log(post);
        updatePostService({
            ...post,
            postCategory: {
                categoryId: post.categoryId
            }
        }, post.postId).then(res => {
            //console.log(res);
            toast.success("Blog post updated successfully")
        }).catch(error => {
            //console.log(error);
            toast.error("Failed to update the blog post")
        })
    }

    const updateHtml = () => {
        return (
            <div className="w-full p-4 border-4 mt-1 rounded-lg shadow-lg">
                {/* {JSON.stringify(post)} */}
                <form className="w-full" onSubmit={updatePost}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <h2 className="font-bold text-3xl leading-7 text-gray-900"> Update Your Post </h2>
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
                                            value={post.postTitle}
                                            onChange={(event) => handleChange(event, 'postTitle')}
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
                                                            accept="image/*"
                                                        // value={post.postImage}
                                                        // onChange={handleFileChange}

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

                                        <JoditEditor
                                            ref={editor}
                                            value={post.postContent}
                                            onChange={newContent => setPost({ ...post, postContent: newContent })}
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
                                            placeholder="Post Content"
                                            name="categoryId"
                                            // defaultValue={0}
                                            onChange={(event) => handleChange(event, 'categoryId')}
                                            value={post.categoryId}
                                            className="peer block w-full  border-3 py-2 px-2 bg-transparent placeholder-transparent focus:outline-none focus:ring-0 shadow-sm ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            Update Post
                        </button>
                    </div>
                </form >
            </div >
        )
    }
    return (
        <Base>
            <h1> {postId}</h1>
            {post && updateHtml()}
        </Base>
    )
}

export default UpdateBlog