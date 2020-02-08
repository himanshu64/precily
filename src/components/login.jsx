import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import firebase from '../config/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   const [error, setError] = useState('');
    
   
    const handleSubmit = (event) => {
        console.log("on login click");
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then((user)=>{
                history.push('/dashboard');
                toast("Login Success",{type:toast.TYPE.SUCCESS});
            })
            .catch((error) => {
                setError({error:error})
                toast("Login Error",{type:toast.TYPE.ERROR});
                })


    }
    useEffect(() => {
      if(props.authenticated){
        history.push('/dashboard');
      }else{
        history.push('/')
      }
    }, [props.authenticated,history]);
  
    return (
       
        <div className="bg-gray-100 font-sans w-full  m-0 w-full min-h-screen p-10">

<ToastContainer position={toast.POSITION.BOTTOM_CENTER}/>
       <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-4/5 sm:w-1/3 ">
        
            <div>
    {error ? <div className="text-red-500 p-4 text-md">{error.message}</div>: null} 
            </div>
  
        <form onSubmit={handleSubmit}>
        <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-auto" >
        <h1 className="mb-8 text-3xl text-center font-semibold tracking-widest">Sign <span className="text-red-500"> In</span></h1>
            <div className="mb-4">
              <label className="block text-grey-darker tracking-widest text-sm font-bold mb-2" htmlFor="email">
                Email
        </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" name="email"  id="email" type="email" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="mb-6">
              <label className="block text-grey-darker tracking-widest text-sm font-bold mb-2" htmlFor="password">
                Password
        </label>
              <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" name="password"  id="password" type="password" placeholder="******************" value={password} onChange={(event)=> setPassword(event.target.value)}/>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded" type="submit">
                Sign In
        </button>
  
            </div>
          </div>
        </form>
  
        </div>
      </div> 
      </div>

    );
  }
  export default  Login;
  