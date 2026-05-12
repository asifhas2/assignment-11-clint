import React, { useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.patch(
                `/dashboard/${user.email}`
            );
            return res.data;
        },
        onSuccess: () => {
       
            queryClient.invalidateQueries(['user', user.email]);
        }
    });

    useEffect(() => {
        if (user?.email) {
            mutate();
        }
    }, [user, mutate]);

    return (
        <div className="text-center">
            <h2>Payment Successful 🎉</h2>
        </div>
    );
};

export default PaymentSuccess;