import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/supabaseClient.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { set } from 'react-hook-form';

const Verify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[loading,setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
              const {data, error} = await supabase.from("User").insert({
                id: session.user.id,
                name: session.user.user_metadata.name || "",
                email: session.user.email,
                phone_no: session.user.user_metadata.phone_no || "",
                type: session.user.user_metadata.type || "renter",
              })
              if(error){
                console.error("Error creating user profile:", error);
                navigate('/login');
                return;
              }
              dispatch(login({ userData: session.user }));
              navigate('/');
            } else {
              setLoading(false);
            }
        });
    }, []);

  return (
    <div>
      {loading ? <span>Verifying your email, please wait...</span> : <span>If you are not redirected automatically, please <a href="/login" className='text-blue-800'>login</a> again after verifying your email.</span>}
    </div>
  )
}

export default Verify
