import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { loadAllCategories } from './../Services/CategoryService';
import { toast } from 'react-toastify';


function CategorySideMeny() {

    const [category, setCategory] = useState([]);
    useEffect(()=>{
            loadAllCategories().then(data=>{
                setCategory([...data]);
                console.log(data);
            }).catch(error=>{
                console.log(error);
                toast.error("Failed to load the categories");
            })
    },[])

    return (
        <div>

            <div className='ml-4 w-full mt-3'>
                <h2>Categories</h2>
                <hr className='w-full ' />

                <ul className="py-2">
                    <li className="py-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block  duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                                } border-b border-gray-100 hover:bg-gray-500 lg:hover:bg-transparent lg:border hover:text-orange-700 lg:p-0`
                            }
                        >
                            All Category
                        </NavLink>
                    </li>
                        {
                            category && category.map((cat, index)=>{
                                return(
                                    <li key={index} className='mt-1'>
                                    <NavLink
                                        to={`/categories/${cat.categoryId}`}
                                        className={({ isActive }) =>
                                            `block  duration-200 ${isActive ? 'text-orange-700' : 'text-gray-700'
                                            } border-b border-gray-100 hover:bg-gray-500 lg:hover:bg-transparent lg:border hover:text-orange-700 lg:p-0`
                                        }
                                        
                                    >
                                        {cat.categoryTitle}
                                    </NavLink>
                                    </li>
                                )
                            })
                         }
                </ul>

            </div>

        </div>
    )
}

export default CategorySideMeny