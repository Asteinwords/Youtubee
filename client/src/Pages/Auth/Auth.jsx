import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { setcurrentuser } from '../../action/currentuser'
import './Auth.css'

const Auth = ({ user, setauthbtn, seteditcreatechanelbtn }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setcurrentuser(null))
    localStorage.clear()
    googleLogout()
  }

  return (
    <div className="Auth_container" onClick={() => setauthbtn(false)}>
      <div className="Auth_container2" onClick={e => e.stopPropagation()}>
        <div className="User_Details">
          <div className="Chanel_logo_App">
            {user?.result.name
              ? user?.result.name.charAt(0).toUpperCase()
              : user?.result.email.charAt(0).toUpperCase()}
          </div>
          <div className="email_auth">{user?.result.email}</div>
        </div>

        <div className="btns_Auth">
          {user?.result.name ? (
            <Link to={`/channel/${user?.result?._id}`} className="btn_Auth">
              Your Channel
            </Link>
          ) : (
            <button
              className="btn_Auth"
              onClick={() => seteditcreatechanelbtn(true)}
            >
              Create Your Own Channel
            </button>
          )}
          <button className="btn_Auth" onClick={logout}>
            <BiLogOut />
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
