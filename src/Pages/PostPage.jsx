import { Link, useParams } from "react-router-dom"
import Base from "../Components/Base"
import { useEffect, useState } from "react";
import { createComment, loadPostById } from "../Services/PostService";
import { toast } from "react-toastify";
import { BASE_URL } from "../Services/Helper";
import { isLoggedIn } from "../Auth/Index";

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content: ''
  });

  useEffect(() => {
    //Loading the post details by postId
    loadPostById(postId).then(data => {
      console.log(data);
      setPost(data)
    }).catch(error => {
      toast.error("Failed to load the post, Please Try Again");
      console.log(error)
    });
  }, []);

  //Date Function
  const printDate = (numbers) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    };
    return new Date(numbers).toLocaleDateString('en-US', options);
  }

  // const contentFieldChanged = (data) => {
  //   setComment({ content: data });
  // };

  const submitComment = () => {


    if(!isLoggedIn()){
      toast.error("Please Login to Comment");
      return
    }

    if(comment.content.trim() === undefined || comment.content.trim() === ""){
      toast.error("Comment is required");
      return;
    }

    createComment(comment, post.postId)
    .then(data => {
      toast.success("Comment Added Successfully");
      setPost({
        ...post,
        comments: [...post.comments, data.data]
      });
      setComment({
        content: ''
      })
      console.log(data);
    }).catch(error => {
      toast.error("Something went wrong...");

      console.log(error);
    })
  }

  return (
    <Base>

      {/* Breadcrumb Starts Here */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 ml-4 text-sm text-gray-600">
          <li>
            <Link
              to={'/'}
              className="block transition hover:text-gray-700"
            >
              <span className="sr-only"> Home </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <Link to={'/'}
              className="block transition hover:text-gray-700">
              {
                (post) && (
                  <span>{post.postCategory.categoryTitle}
                  </span>
                )
              }
            </Link>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <Link to={'/'}
              className="block transition hover:text-gray-700">
              {
                (post) && (
                  <span>{post.postTitle}
                  </span>
                )
              }
            </Link>
          </li>
        </ol>
      </nav>
      {/* Breadcrumb Ends Here */}

      {/* Post Content Starts Here */}

      {/* <!--Container--> */}
      <div className="w-full my-1 rounded-lg shadow-lg">

        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" >

          {/* <!--Title--> */}
          {
            (post) && (
              <div className="font-sans">
                <p className="text-base md:text-sm text-orange-700 font-bold">&lt; {" "}
                  <Link to={"/"} className="text-base md:text-sm text-orange-700 font-bold no-underline hover:underline">
                    BACK TO HOME
                  </Link>
                </p>
                <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
                  {<span> {post.postTitle}</span>}
                </h1>
                <p className="text-sm md:text-base font-normal text-gray-600">Category :
                  <span> {post.postCategory.categoryTitle} </span>
                </p>
                <p className="text-sm md:text-base font-normal text-gray-600">Published on :
                  <span> {printDate(post.postAddedDate)} </span>
                </p>
                <p className="text-sm md:text-base font-normal text-gray-600">Published By :
                  {<span> {post.user.name}</span>}
                </p>

              </div>
            )
          }

        </div>



        {/* <!--Divider--> */}
        <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

        <div className="container px-4">
          {/* Images */}
          <div className="image">
            {
              (post) && (
                <img src={BASE_URL + '/post/image/' + post.postImage}
                  className="h-auto max-w-50 mx-auto rounded-lg object-cover shadow-xl object-center"
                  alt="post" />
              )
            }
          </div>
          {
            (post) && (
              <div dangerouslySetInnerHTML={{ __html: post.postContent }} className="my-4" />
            )
          }
        </div>

        {/* <!--Divider--> */}
        <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

        {/* <!--Tags --> */}
        <div className="text-base md:text-sm text-gray-500 px-4 mb-4">
          Tags: <a href="#" className="text-base md:text-sm text-orange-700 no-underline hover:underline">Link</a> . <a href="#" className="text-base md:text-sm text-orange-700 no-underline hover:underline">Link</a>
        </div>

        {/* <!--Subscribe--> */}
        <div className="container px-4">
          <div className="font-sans bg-gradient-to-b from-orange-100 to-gray-100 rounded-lg shadow-xl p-4 text-center">
            <h2 className="font-bold break-normal text-xl md:text-3xl">Subscribe to my Newsletter</h2>
            <h3 className="font-bold break-normal text-gray-600 text-sm md:text-base">Get the latest posts delivered right to your inbox</h3>
            <div className="w-full text-center pt-4">
              <form >
                <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                  <input type="email" placeholder="youremail@example.com" className="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                  <button type="submit" className="flex-1 mt-4 block md:inline-block appearance-none bg-orange-700 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-orange-400">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- /Subscribe--> */}



        {/* <!--Author--> */}
        <div className="flex w-full items-center font-sans px-4 py-12">
          <img className="w-10 h-10 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of Author" />
          <div className="flex-1 px-2">
            <p className="text-base font-bold md:text-xl leading-none mb-2">Jo Bloggerson</p>
            <p className="text-gray-600 text-xs md:text-base">Minimal Blog Tailwind CSS template by</p>
          </div>
          <div className="justify-end">
            <button className="bg-transparent border border-gray-500 hover:border-orange-700 text-xs text-gray-500 hover:text-orange-700 font-bold py-2 px-4 rounded-full">Read More</button>
          </div>
        </div>
        {/* <!--/Author--> */}

        {/* <!--Divider--> */}
        <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

        {/* <!--Next & Prev Links--> */}
        <div className="font-sans flex justify-between content-center px-4 pb-12">
          <div className="text-left">
            <span className="text-xs md:text-sm font-normal text-gray-600">&lt; Previous Post</span><br />
            <p><a href="#" className="break-normal text-base md:text-sm text-orange-700 font-bold no-underline hover:underline">Blog title</a></p>
          </div>
          <div className="text-right">
            <span className="text-xs md:text-sm font-normal text-gray-600">Next Post &gt;</span><br />
            <p><a href="#" className="break-normal text-base md:text-sm text-orange-700 font-bold no-underline hover:underline">Blog title</a></p>
          </div>
        </div>
        {/* <!--/Next & Prev Links--> */}
        {/* <!--Divider--> */}
        <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

        {/* Comments Starts Here */}
        {/* Post Content Ends Here */}
        <div className="w-full items-center font-sans px-4 py-2">
          <p className="text-base font-bold md:text-xl leading-none mb-2">Comments ({post ? post.comments.length : 0})</p>

          <div>
            <p>Add Comments here:</p>
            {/* <form onSubmit={submitComment}> */}

            <textarea

              className="mt-2 p-4 w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm"
              rows="4"
              placeholder="Have your say..."
              value={comment.content}
              onChange={(event) => setComment({"content" : event.target.value })}
            />
            <div className="mt-2 flex items-center justify-end gap-x-6">
              <button
              onClick={submitComment}
                // type="submit"
                className="rounded-full bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                Create Post
              </button>
            </div>
            {/* </form> */}
          </div>

          {
            post && post.comments.map((c, index) => (
              <div className="flex border rounded my-2" key={index}>
                <p className="text-gray-600 text-xs md:text-base py-3 ml-4 hover:border-pink-600" >&gt; {c.content} </p>
              </div>
            ))
          }


        </div>
        {/* Comments Ends Here */}
      </div>


    </Base >
  )
}

export default PostPage