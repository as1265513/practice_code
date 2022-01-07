import React,{useState} from 'react';
import LoginForm from 'renderer/Components/LoginForm';
import RegisterForm from 'renderer/Components/RegisterForm';

import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingView from 'renderer/Components/Shared/LoadingView';


export default function WeleCome() {
  const [isLoginView,setIsLoginView] = useState(true)


 
  const user =useSelector(({auth})=>auth.user)
  const isCheckingLogin =useSelector(({auth})=>auth.login.isChecking)
  const isCheckingRegister =useSelector(({auth})=>auth.register.isChecking)



  const isOptInText = isLoginView ? 
            ['Need An account?',"Register"] 
          :['Already have an account?','Login'];


    if (isCheckingRegister||isCheckingLogin) {
      return <LoadingView />
    }
  
    if (user) {
      return <Redirect to="/home" />
    }
  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView?<LoginForm />:<RegisterForm />}
        <small className="form-text text-muted mt-2">{isOptInText[0]}
          <span
            onClick={() => setIsLoginView(!isLoginView)}
            className="btn-link ml-2">{isOptInText[1]}</span></small>
      </div>
    </div>
  )
}
