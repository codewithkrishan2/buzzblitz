import { Outlet , Navigate} from "react-router-dom"
import { isLoggedIn } from "../Auth/Index"


const Privateroute = () =>{
    
    // if (isLoggedIn()) {
    //     return <Outlet/>
    // } else {
    //     return <Navigate to = {"/login"} />
    // }

    // or else we can write same thins as in one line?

    return isLoggedIn() ? <Outlet/> : <Navigate to = {"/login"} />

}

export default Privateroute