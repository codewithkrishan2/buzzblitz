
import { Link, NavLink } from 'react-router-dom';
import { BASE_URL } from '../Services/Helper';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUserDetail, isLoggedIn } from '../Auth/Index';
import userContext from '../Context/UserContext';

function Post({ post = { userId: -1, postTitle: "Future-Proofing Your Tech: Staying Ahead in a Rapidly Changing World", postContent: "lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, voluptates. " }, deletePost }) {

    const userContextData = useContext(userContext);

    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    }, [])


    return (
        <>
            <article
                className="rounded-lg border border-gray-100 bg-white shadow-xl m-3"
            >
                {
                    (post) && (
                        <img
                            alt="post image header"
                            src={BASE_URL + '/post/image/' + post.postImage}
                            className="lg:h-60 w-full object-cover"
                        />
                    )
                }

                <div className="p-4 sm:p-6">

                    <Link to={'/post/' + post.postId}>
                        <h3 className="text-lg font-medium text-gray-900">
                            {post.postTitle}
                        </h3>
                    </Link>

                    <div
                        dangerouslySetInnerHTML={{ __html: post.postContent.substring(0, 100) + '...' }}
                        className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
                    >

                    </div>

                    <div

                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                    >
                        <NavLink to={'/post/' + post.postId}>
                            Find out more
                        </NavLink>


                        <span
                            aria-hidden="true"
                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                        >
                            &rarr;
                        </span>
                    </div>

                    {userContextData.user.login && (user && user.userId === post.user.userId ? 
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            
                            onClick={() => deletePost(post)}
                            className="rounded-full bg-orange-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Delete Post
                        </button>
                        <Link className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            to={`/user/update-post/${post.postId}`}
                        >
                            Edit Post
                        </Link>
                    </div> : '')
                    }
                    
                </div>
            </article>
        </>
    )
}

export default Post