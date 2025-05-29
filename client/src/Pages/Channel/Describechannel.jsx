import React, { useEffect, useState } from 'react';
import './Describechannel.css';
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from "axios";

const Describechannel = ({ setvideouploadpage, cid, seteditcreatechanelbtn }) => {
  const channel = useSelector(state => state.chanelreducer);
  const currentuser = useSelector(state => state.currentuserreducer);
  const currentchannel = channel.find(c => c._id === cid);

  const [points, setPoints] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${cid}`);
        setPoints(res.data.points || 0);
      } catch (err) {
        console.error("Error fetching points", err);
      }
    };
    fetchPoints();
  }, [cid]);

  return (
    <div className="container3_chanel">
      <div className="chanel_logo_chanel">
        <b>{currentchannel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_chanel">
        <b>{currentchannel?.name}</b>
        <p>{currentchannel?.desc}</p>
        {points !== null && <p><strong>Points:</strong> {points}</p>}
      </div>
      {currentuser?.result._id === currentchannel?._id && (
        <>
          <p className="editbtn_chanel" onClick={() => seteditcreatechanelbtn(true)}>
            <FaEdit />
            <b>Edit Channel</b>
          </p>
          <p className="uploadbtn_chanel" onClick={() => setvideouploadpage(true)}>
            <FaUpload />
            <b>Upload Video</b>
          </p>
        </>
      )}
    </div>
  );
};

export default Describechannel;
