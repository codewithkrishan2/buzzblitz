import { useEffect, useState } from 'react';
import Base from './../Components/Base';
import { signUp } from '../Services/UserService';
import {toast} from 'react-toastify';


function Signup() {

  const [data,setData] = useState({
    name :'',
    email :'',
    password :'',
    about :'',
  });

  const [error, setError] = useState({
    errors :{},
    isError :false
  });

  const handleChange = (event, property) => {
    
    //setting the value dynamically
    setData({...data, [property]:event.target.value});

  };

  //Resetting the form using reset button
  const resetData =()=>{
    setData({
      name :'',
      email :'',
      password :'',
      about :'',
    });
  };

  //Submitting the form using submit button
  const submitForm = (event) => {
    event.preventDefault();
    console.log(data);
    //data validation
    if(data.name.trim() == "" || data.email.trim()=="" || data.password.trim()=="" || data.about.trim()==""){
      toast.error("All fields are required");
      return;
    } 
    //calling the server API for sending data
    signUp(data).then((resp)=>{
      console.log(resp);
      console.log("success");
      toast.success("Signup Successful");
      setData({
        name :'',
        email :'',
        password :'',
        about :'',
      });
    }).catch((err)=>{
      console.log(err);
      console.log("error");})
    ;
  };


  return (
    <Base>
      <div className="container mx-auto p-4 flex justify-center items-center mt-5">
        <form className="max-w-md w-full " onSubmit={submitForm}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-bold text-3xl text-center leading-7 text-gray-900">Signup for Post Your Blogs</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      placeholder='Full Name'
                      id="name"
                      onChange={(e) => handleChange(e,'name')}
                      value={data.name}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder='Enter your email eddress here...'
                      onChange={(e) => handleChange(e,'email')}
                      value={data.email}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Create Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder='Create your password here...'
                      onChange={(e) => handleChange(e,'password')}
                      value={data.password}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div >
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        placeholder='Write a few sentences about yourself...'
                        rows={3}
                        onChange={(e) => handleChange(e,'about')}
                        value={data.about}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // defaultValue={''}
                      />
                    </div>
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
              Create Account
            </button>
          </div>
        </form>

      </div>


    </Base>
  )
}

export default Signup

//http://localhost:8080/api/v1/auth/register