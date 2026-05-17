import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import ForbiddenPage from '../Components/ForbiddenPage';

const AdminPrivateRout = ({children}) => {



    const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (user?.role !== 'admin') {
    return <ForbiddenPage></ForbiddenPage>;
  }

  return children
};

export default AdminPrivateRout;