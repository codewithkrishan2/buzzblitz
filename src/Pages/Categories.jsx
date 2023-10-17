import Base from './../Components/Base';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadPostsByCategory } from './../Services/UserService';
import { toast } from 'react-toastify';
import Post from '../Components/Post';
import { useState } from 'react';
import { deletePostService } from '../Services/PostService';

function Categories() {

  const [posts, setPosts] = useState([])

  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);
    loadPostsByCategory(categoryId).then(data => {
      setPosts([...data])
      console.log(data);
    }).catch(error => {
      console.log(error);
      toast.error("Failed to load the posts")
    })
  }, [categoryId]);

  //function to delete post 
  const deletePost = (post) => {
    // going to delete post
    deletePostService(post.postId).then(res => {
      console.log(res);
      toast.success("Post deleted successfully")
      let newPosts = posts.filter((p) => p.postId != post.postId)
      setPosts([...newPosts])
    }).catch(error => {
      console.log(error);
      toast.error("Failed to delete the post")
    })
  }

  return (

    <Base>

      <h1>From Category Feed</h1>
      <h1>Artical Total Count :  ( {posts.length} )</h1>

      {
        posts && posts.map((post) => (

          <Post deletePost={deletePost} post={post} key={post.postId} />
        ))
      }
      {
        posts && posts.length === 0 && <h1 className="mt-4 text-5xl font-extrabold leading-tight text-center">There is no Posts for the available Category</h1>
      }

      <div>

        {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              onClick={() => changePage(postContent.pageNumber - 1)}
              disabled={postContent.pageNumber == 0}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </a>
            <a
              onClick={() => changePage(postContent.pageNumber + 1)}
              disabled={postContent.lastPage}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing
                <span className="font-medium">1</span>
                to
                <span className="font-medium">10</span>
                of
                <span className="font-medium"> {postContent?.totalElements} </span>
                results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  onClick={() => changePage(postContent.pageNumber - 1)}
                  disabled={postContent.pageNumber == 0}
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"

                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </a>

                {
                  [...Array(postContent.totalPages)].map((item, index) => (

                    <Link
                      onClick={() => changePage(index)}
                      key={index}
                      active={(index == postContent.pageNumber).toString()}
                      className="relative inline-flex items-center active:bg-violet-700 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-400 focus:z-20 focus:outline-offset-0"
                    >
                      {index + 1}
                    </Link>

                  ))

                }
                <a
                  onClick={() => changePage(postContent.pageNumber + 1)}
                  disabled={postContent.lastPage}
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>

              </nav>
            </div>
          </div>
        </div> */}
      </div>

    </Base>

  )
}

export default Categories