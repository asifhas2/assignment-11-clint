import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import AdminDashboardHome from './Admin Dashboard/AdminDashboardHome';
import UserDashboardHome from './User Dashboard/UserDashboardHome';

const DashBoardHome = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data}=useQuery({
        queryKey:['users',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    })

    if(data?.role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
   
};

export default DashBoardHome;