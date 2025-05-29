import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setThemeFromApp }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpMethod, setOtpMethod] = useState('');
  const [theme, setTheme] = useState('dark');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Get user IP address
  const getUserIP = async () => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json');
      return res.data.ip;
    } catch (err) {
      console.error('Failed to get IP:', err);
      return null;
    }
  };

  // Handle login and send OTP
  const handleLogin = async () => {
    const ip = await getUserIP();
    if (!ip) {
      setMessage('Unable to detect IP address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        mobile,
        ip,
      });

      if (response.data.success) {
        const newTheme = response.data.theme || 'dark';
        setTheme(newTheme);
        setThemeFromApp(newTheme);
        setOtpMethod(response.data.method || 'email');
        setMessage(`OTP sent via ${response.data.method.toUpperCase()}`);

        // Save user info locally (optional)
        setLoggedInUser({ email });
        localStorage.setItem('Profile', JSON.stringify({ email }));

        // Navigate to OTP verification page, passing email as state
        navigate('/otp-verify', { state: { email } });
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.error('OTP send error:', err);
      setMessage('OTP sent to Email.');
    }
  };

  // Apply theme styles to body
  useEffect(() => {
    if (theme === 'white') {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    } else {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = 'white';
    }
  }, [theme]);

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 20 }}>Login with Email and Mobile</h2>

      {!loggedInUser ? (
        <>
          <input
            placeholder="Email (for OTP email)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 10, width: '100%', padding: 8 }}
          />
          <input
            placeholder="Mobile number (for OTP SMS)"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ marginBottom: 10, width: '100%', padding: 8 }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: '#ef4444', // red-500
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Login
          </button>
        </>
      ) : (
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#e53e3e',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {loggedInUser.email.charAt(0).toUpperCase()}
          </div>
          <span>{loggedInUser.email}</span>
        </div>
      )}

      <p style={{ marginTop: 15, color: '#f87171' }}>{message}</p>
      {otpMethod && <p>OTP sent via: {otpMethod.toUpperCase()}</p>}
    </div>
  );
};

export default Login;


// import React, { useState, useEffect } from 'react';
// import { BiUserCircle } from 'react-icons/bi';
// import axios from 'axios';

// const Login = ({ setThemeFromApp }) => {
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpMethod, setOtpMethod] = useState('');
//   const [theme, setTheme] = useState('dark');
//   const [message, setMessage] = useState('');
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Get user IP
//   const getUserIP = async () => {
//     try {
//       const res = await axios.get('https://api.ipify.org?format=json');
//       return res.data.ip;
//     } catch {
//       return null;
//     }
//   };

//   // Send OTP
//   const handleLogin = async () => {
//     const ip = await getUserIP();
//     if (!ip) {
//       setMessage('Unable to detect IP address.');
//       return;
//     }
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/login', {
//         email, mobile, ip,
//       });
//       if (data.success) {
//         setTheme(data.theme);
//         setThemeFromApp(data.theme);
//         setOtpMethod(data.method);
//         setMessage(`OTP sent via ${data.method.toUpperCase()}`);
//         setOtpSent(true);
//       } else {
//         setMessage('Failed to send OTP');
//       }
//     } catch {
//       setMessage('Error sending OTP. Check inputs.');
//     }
//   };

//   // Verify OTP
//   const handleVerifyOTP = async () => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/verify-otp', {
//         email, mobile, otp,
//       });
//       if (data.success) {
//         setLoggedInUser({ email });
//         localStorage.setItem('Profile', JSON.stringify({ email }));
//         setMessage('Login successful!');
//       } else {
//         setMessage('Invalid OTP. Try again.');
//       }
//     } catch {
//       setMessage('Error verifying OTP.');
//     }
//   };

//   // Apply theme
//   useEffect(() => {
//     if (theme === 'white') {
//       document.body.classList.add('bg-white', 'text-black');
//       document.body.classList.remove('bg-gray-900', 'text-white');
//     } else {
//       document.body.classList.add('bg-gray-900', 'text-white');
//       document.body.classList.remove('bg-white', 'text-black');
//     }
//   }, [theme]);

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Login with Email &amp; Mobile</h2>

//       {!loggedInUser ? (
//         <>
//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder="Email (for OTP email)"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//           <input
//             className="w-full mb-3 p-2 border rounded"
//             placeholder="Mobile number (for OTP SMS)"
//             type="tel"
//             value={mobile}
//             onChange={e => setMobile(e.target.value)}
//           />

//           {!otpSent ? (
//             <button
//               onClick={handleLogin}
//               className="flex items-center justify-center gap-2 w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition"
//             >
//               <BiUserCircle size={20} />
//               <span>Sign in</span>
//             </button>
//           ) : (
//             <>
//               <input
//                 className="w-full mb-3 mt-4 p-2 border rounded"
//                 placeholder="Enter OTP"
//                 type="text"
//                 value={otp}
//                 onChange={e => setOtp(e.target.value)}
//               />
//               <button
//                 onClick={handleVerifyOTP}
//                 className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded transition"
//               >
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </>
//       ) : (
//         <div className="flex items-center gap-3 mt-6">
//           <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold">
//             {loggedInUser.email.charAt(0).toUpperCase()}
//           </div>
//           <span className="text-lg">{loggedInUser.email}</span>
//         </div>
//       )}

//       {message && <p className="mt-4 text-center text-red-400">{message}</p>}
//       {otpMethod && otpSent && (
//         <p className="mt-2 text-center text-gray-300">
//           OTP sent via: <b>{otpMethod.toUpperCase()}</b>
//         </p>
//       )}
//     </div>
//   );
// };

// export default Login;

