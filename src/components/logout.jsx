import React from 'react';
import firebase from '../config/firebaseConfig';

const LogOut = () => {

    const logOutUser = () => {
        firebase.auth().signOut();
    }
    return(
        <div className="hidden sm:flex sm:items-center">
          
          <button onClick={logOutUser} className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-red-600 hover:border-red-600">Log out</button>
        </div>
    );

}

export default LogOut;