import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getCurrentUserDetail, isLoggedIn } from "../Auth/Index";

const ViewUserProfile = ({ user }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setCurrentUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    }, [])

    return (
        <div>
            <div className="border rounded-xl bg-white shadow mt-5 pt-5">
                <div>
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl inset-x-0 top-0 flex items-center justify-center text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="mt-5 text-center border-b pb-12">
                    <h1 className="text-4xl uppercase font-medium text-gray-700">{user.name}</h1>
                    <p className="mt-5 text-gray-500"><span className='font-bold'>USER ID :</span> BUZZK{user.userId}BLITZ</p>
                    <p className="mt-5 text-gray-500"><span className='font-bold'>CONTACT INFO :</span>  {user.email}</p>
                    {
                        user.roles.map((role) => {
                            return (
                                <p className="mt-5 text-gray-500" key={role.id}><span className='font-bold'>ROLES :</span> {role.name}</p>
                            )
                        })
                    }

                </div>
                <div className="mt-8 flex flex-col border-b justify-center">
                    <p className="text-gray-600 text-center font-light lg:px-16">{user.about}</p>
                    <button
                        className="text-indigo-500 py-2 px-4  font-medium mt-4"
                    >
                        Show more
                    </button>
                </div>

                {
                    currentUser ? (currentUser.userId==user.userId) ? (
                        <div className="my-6 mr-6 flex items-center justify-end gap-x-6">
                            <Link className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    ):'' : ''
                }

            </div>

        </div>
    )
}

export default ViewUserProfile