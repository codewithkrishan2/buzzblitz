import { useEffect, useContext } from 'react'
import Base from '../../Components/Base'
import userContext from '../../Context/UserContext'
import { useParams } from 'react-router-dom'
import { getUserByUserId } from '../../Services/UserService';
import { useState } from 'react';
import ViewUserProfile from '../../Components/ViewUserProfile';

function ProfileInfo() {

  const [user, setUser] = useState();
  const object = useContext(userContext)

  const { userId } = useParams();

  useEffect(() => {
    getUserByUserId(userId).then(data => {
      console.log(data);
      setUser({ ...data });
    })
  }, [])

  const userView = () => {
    return (
      <div >
        <div className="m-5">
          <ViewUserProfile user={user}/>
        </div>
      </div>
    )
  }

  return (
    <Base>
      { user ? userView() : 'Loading User Information...' }
    </Base>

  )
}

export default ProfileInfo