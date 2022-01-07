import React,{useEffect} from 'react';
import JoinedChatList from '../Components/JoinedChatList';
import AvailableChatList from '../Components/AvailableChatsList';
import ViewTitle from '../components/shared/ViewTitle';

import FetchChats from '../api/chats';

import {db} from '../db/firestore'
import {useSelector,useDispatch} from 'react-redux'

import {fetchChats} from '../actions/chat'
import { Redirect } from 'react-router-dom';
import LoadingView from 'renderer/Components/Shared/LoadingView';
import {withBaseLayout} from 'renderer/layouts/BaseLayout';
import { Link } from 'react-router-dom';
export default function Home() {

  const dispatch = useDispatch()

  const joined = useSelector(({chats}) =>  chats.joined)
  const available = useSelector(({chats}) =>  chats.available)

  const user =useSelector(({auth})=>auth.user)


 useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])
 

  

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    
      <div className="row no-gutters fh">
        <div className="col-3 fh ">
          <JoinedChatList chats={joined} />
         
        </div>
        <div className="col-9 fh">
          <ViewTitle text={"Choose your Chats"} >
          <Link to="/CreateChat" className="btn btn-outline-primary" >New</Link>
          </ViewTitle>
          <AvailableChatList chats={available} />
        </div>
      </div>
      
  )
}

export default withBaseLayout(Home);