import React, { useEffect, useRef, useCallback } from 'react';
import AvailableChatsList from '../Components/AvailableChatsList';
import ChatMessagesList from '../Components/ChatMessageList';
import ChatUserList from '../Components/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import { useParams } from 'react-router-dom';
import { withBaseLayout } from 'renderer/layouts/BaseLayout';
import { useDispatch, useSelector } from 'react-redux';

import {
  subscribeToChat,
  subscribeToProfile,
  sendChatMessage,
  subscribeToMessages,
  subscribeToMessages,
  registerMessageSubscription,
} from '../actions/chat';

import LoadingView from '../Components/Shared/LoadingView';
import Messenger from 'renderer/Components/Messenger';

function Chat() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messagesSub = useSelector(({chats}) => chats.messagesSubs[id])
  const joinedUsers = activeChat?.joinedUsers;
  const peopleWatchers = useRef({});
  useEffect(() => {
    const unsubscribe = dispatch(subscribeToChat(id));
    dispatch(subscribeToMessages(id));
    if (!messagesSub)  {
      const unsubFromMessages = dispatch(subscribeToMessages(id));
      dispatch(registerMessageSubscription(id, unsubFromMessages));
    }
    return () => {
      unsubscribe();
      unsubscribeToJoinedUsers();
    };
  }, []);
  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = useCallback(
    (jUsers) => {
      jUsers.forEach((user) => {
        if (!peopleWatchers.current[user.uid]) {
          peopleWatchers.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const unsubscribeToJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);
  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id));
    },
    [id]
  );
  if (!activeChat?.id) {
    return <LoadingView text="Loging Chats ...." />;
  }
  debugger;
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel ${activeChat?.name}`} />
        <ChatMessagesList messages={messages} />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  );
}
export default withBaseLayout(Chat, { canGoBack: true });
