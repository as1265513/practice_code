import {db} from '../db/firestore';

import Firebase from 'firebase/app'

const extractSnapshotData = snapshot =>
  snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

export const FetchChats = () =>
  db
    .collection('chats')
    .get()
    .then(extractSnapshotData)

    export const CreateChat = chat => 
    db.collection('chats')
    .add(chat)
    .then(docRef => docRef.id)

  
export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);

  await userRef.update({joinedChats: Firebase.firestore.FieldValue.arrayUnion(chatRef)})
  await chatRef.update({joinedUsers: Firebase.firestore.FieldValue.arrayUnion(userRef)})
}

export const SubscribeToChat = (ChatId,onSubscribe) =>
  db
  .collection('chats')
  .doc(ChatId)
  .onSnapshot(snapshot => {
    const chat ={id:ChatId,...snapshot.data()}
    onSubscribe(chat)
  })


export const SubscribeToProfile = (userId,onSubscribe) => 
  db
  .collection('profiles')
  .doc(userId)
  .onSnapshot(snapshot => onSubscribe(snapshot.data()))


export const sendChatMessage = (message,ChatId)=> 
  db.collection("chats").doc(ChatId).collection("messages").doc(message.timestamp).set(message)


  export const subscribeToMessages = (chatId, onSubscribe) =>
  db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .onSnapshot(snapshot => onSubscribe(snapshot.docChanges()))