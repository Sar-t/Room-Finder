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
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
            dispatch(login({ userData: session.user }));
            navigate('/');
            } else {
            // Ask user to log in
            }
        });
        setLoading(false);
    }, []);

  return (
    <div>
      {loading ? <span>Verifying your email, please wait...</span> : <span>If you are not redirected automatically, please <a href="/login" className='text-blue-800'>login</a> again after verifying your email.</span>}
    </div>
  )
}

export default Verify
