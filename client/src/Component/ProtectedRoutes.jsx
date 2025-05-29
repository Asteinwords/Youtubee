import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(state => state.currentuserreducer);
  return currentUser ? children : <Navigate to="/login-warning" />;
};

export default ProtectedRoute;
