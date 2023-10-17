import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './Pages/User-Routes/Userdashboard';
import Privateroute from './Components/Privateroute';
import ProfileInfo from './Pages/User-Routes/ProfileInfo';
import PostPage from './Pages/PostPage';
import UserProvider from './Context/UserProvider';
import Categories from './Pages/Categories';
import UpdateBlog from './Pages/UpdateBlog';

function App() {

  return (
    <UserProvider>
    <BrowserRouter>
      <ToastContainer position='bottom-center' />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/user" element={<Privateroute />} >
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile-info/:userId" element={<ProfileInfo />} />
          <Route path="update-post/:postId" element={<UpdateBlog />} />
        </Route>
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
