import { useEffect, useState } from "react"
import AddPost from "../../Components/AddPost"
import Base from "../../Components/Base"
import { getCurrentUserDetail } from "../../Auth/Index";
import { deletePostService, loadPostsByUser } from "../../Services/PostService";
import { toast } from "react-toastify";
import Post from "../../Components/Post";


const Userdashboard = () => {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData();
  }, [])

  //Load Post Data
  function loadPostData(){
    loadPostsByUser(getCurrentUserDetail().userId).then(data => {
      console.log(data);
      setPosts([...data]);
    }).catch(error => {
      console.log(error);
      toast.error("Failed to load the posts")
    })
  }


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
      <AddPost />
      <h1 className="my-4 text-5xl font-extrabold leading-tight">Your Total Posts : ({posts.length})</h1>
      {
        posts.map((post, index) => {
          return (
            <Post
              post={post}
              key={index}
              deletePost={deletePost}
            />
          )
        })
      }
    </Base>
  )
}

export default Userdashboard