

import './App.global.css';
import React,{useEffect} from "react";
import Home from "./View/Home";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Settings from "./View/Settings";
import WeleCome from "./View/WeleCome";

import Chat from "./View/Chat";

import {useDispatch,useSelector} from 'react-redux';


import {listenToAuthChanges} from './actions/auth';
import LoadingView from './Components/Shared/LoadingView';
import { listenToConnectionChanges } from './actions/app';
import Notification from './utility/Notification'
import ChatCreat from './View/ChatCreat';
import { checkUserConnection } from './actions/connection';

type userData={
uid: string,
userName:string,

}
type user={
  user:userData,
  isChecking:boolean,
}

type auth ={
  auth:user,
}
type appT={
  isOnline:boolean,
}
type appreducer={
  app:appT
}
// interface unsubFromUserConnectionType{
//   uid:string,
// }
// type unsubFromUserConnection={
//   unsubFromUserConnection:unsubFromUserConnectionType
// }

function AuthRoute({children, ...rest}:any) {
  const user = useSelector(({auth}:auth) => auth.user)
  const onlyChild = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={props =>
          user ?
            React.cloneElement(onlyChild, {...rest, ...props}) :
            <Redirect to="/" />
      }
    />
  )
}

export default function App() {
  // debugger
  const dispatch = useDispatch()
  
  const isChecking =useSelector(({auth}:auth)=>auth.isChecking)
  const isOnline = useSelector(({app}:appreducer) => app.isOnline);
  const user = useSelector(({auth}:auth) => auth.user);
  

  useEffect(()=>{
    const unsubscribe = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());
 

    Notification.setup();
    return () => {
      unsubscribe()
      unsubFromConnection();
      
    }
  },[])
  useEffect(() => {
    let unsubFromUserConnection:any;
    if (user?.uid) {
      debugger
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    }
  }, [dispatch, user])
  
  if(isChecking)
  {
    return <LoadingView />
  }

  if (!isOnline) {
    return <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
  }

  
 
  
  return (
 
      <Router>
      
        <div className="content-wrapper">
          <Switch>
          <Route path="/" exact>
              <WeleCome />
          </Route>
          <AuthRoute path="/Home">
            <Home />
          </AuthRoute>
          <AuthRoute path="/CreateChat">
            <ChatCreat />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <Chat />
          </AuthRoute>
          <AuthRoute path="/Settings">
            <Settings />
          </AuthRoute>
          
          </Switch>
        </div>
      </Router>
  
  );
}




