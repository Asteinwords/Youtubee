
import './App.css';
import React, { useEffect, useState } from "react";
import Navbar from './Component/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import Allroutes from "../src/Allroutes";
import { BrowserRouter as Router } from 'react-router-dom';
import Drawersliderbar from '../src/Component/Leftsidebar/Drawersliderbar';
import Createeditchannel from './Pages/Channel/Createeditchannel';
import Videoupload from './Pages/Videoupload/Videoupload';
import { fetchallchannel } from './action/channeluser';
import { getallvideo } from './action/video';
import { getallcomment } from './action/comment';
import { getallhistory } from './action/history';
import { getalllikedvideo } from './action/likedvideo';
import { getallwatchlater } from './action/watchlater';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({
    display: "none"
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallchannel());
    dispatch(getallvideo());
    dispatch(getallcomment());
    dispatch(getallhistory());
    dispatch(getalllikedvideo());
    dispatch(getallwatchlater());
  }, [dispatch]);

  const toggledrawer = () => {
    if (toggledrawersidebar.display === "none") {
      settogledrawersidebar({
        display: "flex",
      });
    } else {
      settogledrawersidebar({
        display: "none",
      });
    }
  };

  const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
  const [videouploadpage, setvideouploadpage] = useState(false);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AQVHE3W4SG0wzV-O-YKDOmX5wr1nIzq99AXR0aA15L4Re0zfsjuBZrD1DDn-w5C5MqDHYPu0UJTROdTl", // 🔁 Replace with your real client ID
        currency: "USD",                         // ✅ Use USD for all transactions
      }}
    >
      <Router>
        {videouploadpage && <Videoupload setvideouploadpage={setvideouploadpage} />}
        {editcreatechanelbtn && (
          <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />
        )}
        <Navbar seteditcreatechanelbtn={seteditcreatechanelbtn} toggledrawer={toggledrawer} />
        <Drawersliderbar toggledraw={toggledrawer} toggledrawersidebar={toggledrawersidebar} />
        <Allroutes seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage} />
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;

// App.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from './Component/Navbar/Navbar';
// import { useDispatch } from 'react-redux';
// import Allroutes from "../src/Allroutes";
// import { BrowserRouter as Router } from 'react-router-dom';
// import Drawersliderbar from '../src/Component/Leftsidebar/Drawersliderbar';
// import Createeditchannel from './Pages/Channel/Createeditchannel';
// import Videoupload from './Pages/Videoupload/Videoupload';
// import { fetchallchannel } from './action/channeluser';
// import { getallvideo } from './action/video';
// import { getallcomment } from './action/comment';
// import { getallhistory } from './action/history';
// import { getalllikedvideo } from './action/likedvideo';
// import { getallwatchlater } from './action/watchlater';
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// function App() {
//   const [toggledrawersidebar, settogledrawersidebar] = useState({ display: "none" });
//   const dispatch = useDispatch();

//   // For login input and OTP method/theme
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [otpMethod, setOtpMethod] = useState('');
//   const [theme, setTheme] = useState('dark');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     dispatch(fetchallchannel());
//     dispatch(getallvideo());
//     dispatch(getallcomment());
//     dispatch(getallhistory());
//     dispatch(getalllikedvideo());
//     dispatch(getallwatchlater());
//   }, [dispatch]);

//   // Get user IP address
//   const getUserIP = async () => {
//     try {
//       const res = await axios.get('https://api.ipify.org?format=json');
//       return res.data.ip;
//     } catch (err) {
//       console.error('Failed to get IP:', err);
//       return null;
//     }
//   };

//   const handleLogin = async () => {
//     const ip = await getUserIP();
//     if (!ip) {
//       setMessage('Unable to detect IP address.');
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         email,
//         mobile,
//         ip,
//       });
  
//       if (response.data.success) {
//         setTheme(response.data.theme);
//         setOtpMethod(response.data.method);
//         setMessage(`OTP sent via ${response.data.method.toUpperCase()}`);
//       } else {
//         setMessage('Failed to send OTP');
//       }
//     } catch (err) {
//       console.error('OTP send error:', err);
//       setMessage('Failed to send OTP. Please check the mobile number format and server logs.');
//     }
//   };
  
//   useEffect(() => {
//     // Apply theme styles dynamically
//     if (theme === 'white') {
//       document.body.style.backgroundColor = 'white';
//       document.body.style.color = 'black';
//     } else {
//       document.body.style.backgroundColor = '#121212';
//       document.body.style.color = 'white';
//     }
//   }, [theme]);

//   const toggledrawer = () => {
//     if (toggledrawersidebar.display === "none") {
//       settogledrawersidebar({ display: "flex" });
//     } else {
//       settogledrawersidebar({ display: "none" });
//     }
//   };

//   const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
//   const [videouploadpage, setvideouploadpage] = useState(false);

//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId: "AQVHE3W4SG0wzV-O-YKDOmX5wr1nIzq99AXR0aA15L4Re0zfsjuBZrD1DDn-w5C5MqDHYPu0UJTROdTl",
//         currency: "USD",
//       }}
//     >
//       <Router>
//         {/* Login section for OTP & theme demo */}
//         <div style={{ padding: 20 }}>
//           <h2>Login with Email and Mobile</h2>
//           <input
//             placeholder="Email (for OTP email)"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             style={{ marginBottom: 10, width: '300px' }}
//           /><br />
//           <input
//             placeholder="Mobile number (for OTP SMS)"
//             type="tel"
//             value={mobile}
//             onChange={e => setMobile(e.target.value)}
//             style={{ marginBottom: 10, width: '300px' }}
//           /><br />
//           <button onClick={handleLogin}>Login</button>
//           <p>{message}</p>
//           {otpMethod && <p>OTP sent via: {otpMethod.toUpperCase()}</p>}
//         </div>

//         {videouploadpage && <Videoupload setvideouploadpage={setvideouploadpage} />}
//         {editcreatechanelbtn && <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />}
//         <Navbar seteditcreatechanelbtn={seteditcreatechanelbtn} toggledrawer={toggledrawer} />
//         <Drawersliderbar toggledraw={toggledrawer} toggledrawersidebar={toggledrawersidebar} />
//         <Allroutes seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage} />
//       </Router>
//     </PayPalScriptProvider>
//   );
// }

// export default App;
