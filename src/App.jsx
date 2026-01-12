import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import { supabase } from '../Supabase/supabaseClient.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  // 1. On page load
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      dispatch(login({ userData: session.user }));
    } else {
      dispatch(logout());
    }
  });
  
  // 2. Auth state listener
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      dispatch(login({ userData: session.user }));
    } else {
      dispatch(logout());
    }
  });

  // ✅ Correct cleanup
  return () => {
    subscription.unsubscribe();
  };
}, [dispatch]);


  return (
    <div className='min-h-screen flex flex-wrap content-between 	bg-slate-100 text-slate-900 '>
      <div className='w-full h-screen block'>
        <Header/>
        <main className='mt-[65px]'>
          <Outlet /> {/* This is where the child routes will be rendered */}
        </main>
        <Footer />
      </div>  
    </div>
  );
}

export default App;
