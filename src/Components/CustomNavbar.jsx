import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { doLogOut, getCurrentUserDetail, isLoggedIn } from './../Auth/Index';
import userContext from '../Context/UserContext';

function CustomNavbar() {

  const userContextData = useContext(userContext);

  let navigate = useNavigate();

  //Hamburger Menu Handler
  const [isHamburgerExpanded, setIsHamburgerExpanded] = useState(false);
  const handleHamburgerToggle = () => {
    setIsHamburgerExpanded(!isHamburgerExpanded);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const closeDropdown = (event) => {
      if (isOpen && !event.target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    }
  }, [isOpen]);

  //conditional change login/get started buttons based on whether the user is logged in or not
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());

  }, [login]);

  //function to logout the user
  const logout = () => {
    doLogOut(() => {
      //User has been logged out
      //Now, set login to false
      setLogin(false);
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate("/");
    });
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-3 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="mr-3 h-12"
              alt="logo"
            />
          </Link>

          <div className="flex items-center lg:order-2">

            {
              login && (

                <>

                  <Link to="/user/dashboard"
                    className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    {user.name}
                  </Link>

                  <Link to={`/user/profile-info/${user.userId}`}
                    className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Profile
                  </Link>

                  <Link className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  onClick={logout}
                  >
                    Logout
                  </Link>
                </>

              )
            }


            {

              !login && (

                <>

                  <Link
                    to="/login"
                    className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-5 focus:outline-none"
                  >
                    Get started
                  </Link>

                </>

              )



            }

            <div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden ml-4">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={handleHamburgerToggle}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Mobile Menu</span>

                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>

                  <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${isHamburgerExpanded ? 'block' : 'hidden'
              } w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                  }
                >
                  About Me
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                    } border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/github"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                    } border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                  }
                >
                  Github
                </NavLink>
              </li>

              <li>
                <div
                  className={`block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0 dropdown-container`}
                  onClick={toggleDropdown}
                >
                  Dropdown
                  <span className="ml-2">&#9662;</span>
                </div>
                {isOpen && (
                  <ul className="absolute top-full bg-white border border-gray-100 mt-1 px-4 py-0 rounded-lg shadow-md">
                    <li>
                      <NavLink to="/facebook"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                          } border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                        }
                      >
                        Facebook
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/instagram"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                          } border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                        }
                      >
                        Instagram
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/youtube"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                          } border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                        }
                      >
                        Youtube
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/snap"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                          } border-b border-gray-100 hover-bg-gray-50 lg:hover-bg-transparent lg:border-0 hover-text-orange-700 lg:p-0`
                        }>
                        Snapchat
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default CustomNavbar;
