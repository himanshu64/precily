import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import LogOut from './logout'

const Navbar = (props) => {
    
  useEffect(() => {
    console.log("auth ",props.authenticated);
  }, [props.authenticated])
    return (
        
	<div className="bg-white shadow">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <div>
          <img className="w-12 h-12" src="https://media-exp1.licdn.com/dms/image/C510BAQFcLTUAWZ9FpA/company-logo_200_200/0?e=1589414400&v=beta&t=AjMayYRcQCiXsvMp71qeGrcTN5__4QN-ycRSMkDO9_o" alt="" srcSet=""/>
        </div>

        <div className="hidden sm:flex sm:items-center">
          
          {
            props.authenticated 
            ? ( <React.Fragment>
              <Link to="/dashboard" className="text-gray-800 text-sm text-widest font-semibold hover:text-red-600 mr-4">Dashboard</Link>
              <Link to="/profile" className="text-gray-800 text-sm text-widest font-semibold hover:text-red-600 mr-4">Profile</Link></React.Fragment>)
          : (
            <React.Fragment>
              <Link to="/" className="text-gray-800 text-sm text-widest font-semibold hover:text-red-600 mr-4">Login</Link>
          <Link to="/register" className="text-gray-800 text-sm text-widest font-semibold hover:text-red-600 mr-4">Register</Link>
            </React.Fragment>
          ) }
        </div>
        {
    props.authenticated ? (<LogOut/>) : (null)
        }

        

        
      </div>
    </div>
  </div>

    );
}
export default Navbar;