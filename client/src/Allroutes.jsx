import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search'
import Videopage from './Pages/Videopage/Videopage'
import Channel from './Pages/Channel/Channel'
import Library from './Pages/Library/Library'
import Likedvideo from './Pages/Likedvideo/Likedvideo'
import Watchhistory from './Pages/Watchhistory/Watchhistory'
import Watchlater from './Pages/Watchlater/Watchlater'
import Yourvideo from './Pages/Yourvideo/Yourvideo'
import SubscriptionPage from './Component/SubscriptionPage'
import Login from './Component/Login/Login'
import OtpVerify from './Component/Otpverify'
import ProtectedRoute from './Component/ProtectedRoutes'
import LoginWarning from './Component/LoginWarning'

const Allroutes = ({ seteditcreatechanelbtn, setvideouploadpage }) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:Searchquery' element={<Search />} />

      <Route
        path='/videopage/:vid'
        element={
          <ProtectedRoute>
            <Videopage />
          </ProtectedRoute>
        }
      />

      <Route path='/Library' element={<Library />} />
      <Route path='/Likedvideo' element={<Likedvideo />} />
      <Route path='/Watchhistory' element={<Watchhistory />} />
      <Route path='/Watchlater' element={<Watchlater />} />
      <Route path='/Yourvideo' element={<Yourvideo />} />
      <Route path='/subscribe' element={<SubscriptionPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/otp-verify' element={<OtpVerify />} />
      <Route path='/login-warning' element={<LoginWarning />} />

      <Route
        path='/channel/:cid'
        element={
          <Channel
            seteditcreatechanelbtn={seteditcreatechanelbtn}
            setvideouploadpage={setvideouploadpage}
          />
        }
      />
    </Routes>
  );
};

export default Allroutes;
