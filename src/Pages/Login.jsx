import { useState } from 'react';
import Base from '../Components/Base'
import { toast } from 'react-toastify';
import { loginUser } from '../Services/UserService';
import { doLogIn } from '../Auth/Index';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../Context/UserContext';

function Login() {


  const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username:'',
    password:''
  });

  //Resetting the form using reset button
  const resetData =()=>{
    setLoginDetails({
      username :'',
      password :''
    }); 
  };

  const handleChange = (event, field) => {
    const actualValue =  event.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue
    });
  };


  const handleFormSubmit = (event) => {
    event.preventDefault({ passive: false });
    //console.log(loginDetails);
    //validation
    if(loginDetails.username.trim() == "" || loginDetails.password.trim()==""){
      toast.error("Username or password is required");
      return;
    }

    //submitting to server to generate token

    loginUser(loginDetails).then((data)=>{
      //save the data to local storage
      doLogIn(data, () => {

        userContextData.setUser({
          data:data.user,
          login:true
        })

        // redirect to dashboard page
        navigate("/user/dashboard");
      });

      toast.success("Logged in successfully");
    }).catch(error=>{
      console.log("Error in login");
      console.log(error);
      if (error.response.status == 400 || error.response.status == 404) {
        toast.error(error.response.data.message);
      }else{
        toast.error("Something went wrong on server");
      }
    })
    ;

  };


  return (
    <Base>
      <div className="container mx-auto p-4 flex justify-center items-center mt-5">
        <form className="max-w-md w-full "  onSubmit={handleFormSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-bold text-3xl leading-7 text-gray-900 text-center">Login to Your Account</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={loginDetails.username}
                      onChange={(e)=>handleChange(e, 'username')}
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={loginDetails.password}
                      onChange={(e) => handleChange(e, 'password')}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="reset"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={resetData}
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-full bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Base>
  )
}

export default Login