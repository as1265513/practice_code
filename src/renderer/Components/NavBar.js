import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/auth';
 
 
import { Redirect } from 'react-router-dom';
import BackButton from "./Shared/BackButton";

export default function Navbar({canGoBack,view}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user =useSelector(({auth})=>auth.user)
  

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {canGoBack&&<BackButton />}
          { view !== 'Settings' &&
            <Link
              to="/settings"
              className="btn btn-outline-success ml-2">Settings
            </Link>
          }
        </div>
        <div className="chat-navbar-inner-right">
         
          {!user&& <Link
            to="/"
            className="btn btn-outline-success ml-2">Login</Link>}
            { user &&
            <>
            <img src={user.avatar} alt="user" className="avatar ml-5"/>
             <span className="logged-in-user btn-margin">Hi {user.username}</span>
            <button
              onClick={() => dispatch(logout())}
              className="btn btn-outline-danger ml-2">Logout
            </button>
            </>
          }
        </div>
      </nav> 
    </div>
  );
}
