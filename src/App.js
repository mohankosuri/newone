import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { Logincontext } from '../src/contexts/UserContext'
import { Themecontext } from './Context/ThemeContext';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import Products from './components/Products';
import { Route, Routes, Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Form from './components/Form';
import Video from './components/Video';
import Count from './components/CounterContext';
import { UserContext, UserProvider } from './components/UserContext';
import Home from './components/Home';
import Profile from './components/Profile';
import { StoreProvider } from './contexts/StoreContext';


function App() {

   const [flag, setFlag] = useState(false)

   const [theme, setTheme] = useState("Mohan")
   const [user, setUser] = useState([]);
   const [profile, setProfile] = useState([]);

   const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
   });

   useEffect(
      () => {
         if (user) {
            axios
               .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                  headers: {
                     Authorization: `Bearer ${user.access_token}`,
                     Accept: 'application/json'
                  }
               })
               .then((res) => {
                  setProfile(res.data);
               })
               .catch((err) => console.log(err));
         }
      },
      [user]
   );

   const logOut = () => {
      googleLogout();
      setProfile(null);
   };


   const [name, setName] = useState("krishna")

   const [count, setCount] = useState(0)

    

   const [movies, setMovies] = useState([])



   const increment = () => {
      setCount(count + 1)
   }

   useEffect(() => {
      const fetchmovies = async () => {
         const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr';
         const options = {
            method: 'GET',
            headers: {
               'X-RapidAPI-Key': '8d5a988d4fmsh76b78ab88329b45p14286bjsn418dbed7c5e1',
               'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
         }; 

         try {
            const response = await fetch(url, options);
            const result = await response.json()




            setMovies(result)
            console.log("res is", result);
         } catch (error) {
            console.error(error);
         }
      }

      fetchmovies()
   }, [])

   console.log("movies", movies)

   return (<div>
      {profile ? (
         <div>


            <Themecontext.Provider value={{ theme, setTheme, movies, logOut, profile, setProfile, }}>
               <StoreProvider>
                  <UserProvider>
                     <Logincontext.Provider value1={name}>
                        <UserContext.Provider value={[count, increment]}>
                           <Navbar />

                           <Routes>
                              <Route path='/' element={<Home />}></Route>
                              <Route path='/Dashboard' element={<Dashboard />}></Route>
                              <Route path='/products' element={<Products />} ></Route>
                              <Route path='/AboutUs' element={<AboutUs />}></Route>
                              <Route path='/ContactUs' element={<ContactUs />}></Route>
                              <Route path='/Cart' element={<Cart />}></Route>
                              <Route path='/Form' element={<Form />}></Route>
                              <Route path='/profile' element={<Profile />}></Route>


                           </Routes>


                        </UserContext.Provider>
                     </Logincontext.Provider>
                  </UserProvider>
               </StoreProvider>
            </Themecontext.Provider>
         </div>


      ) : (
         <div className="min-h-screen flex items-center justify-center bg-gray-600">
            <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md">
               <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>



               <button
                  onClick={login}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
               >
                  <svg
                     className="w-6 h-6 mr-2"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12h18M12 21l-1.58-1.58C13.68 18.26 14 17.16 14 16v-2h-2v2a4 4 0 01-7.9 1.2L4.7 18.7a8 8 0 0114.56-6.37c.24-.6.4-1.24.47-1.9H12v-2h8.62a10 10 0 00-18.24 6.5z"
                     ></path>
                  </svg>
                  Login with Google
               </button>
            </div>
         </div>
      )}
   </div>)





}

export default App;
