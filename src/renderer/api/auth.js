import firebase from 'firebase/app'

import 'firebase/auth'
import { constants } from 'original-fs';
import { db } from 'renderer/db/firestore';

const createUserProfile=userProfile=>
{
    debugger
    return db
.collection("profiles")
.doc(userProfile.uid)
.set(userProfile)}


export const getUserProfile = uid =>
  db
    .collection('profiles')
    .doc(uid)
    .get()
    .then(snanpshot =>  snanpshot.data())
 
export async function register({email, password,username,avatar}){
        const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userProfile = {uid: user.uid, username, email, avatar, joinedChats: []}
        await createUserProfile(userProfile)
        return userProfile;
}

export const logout=()=> firebase.auth().signOut();

export const login = async ({email, password}) => {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const userProfile = await getUserProfile(user.uid);
    return userProfile;
  }
export const onAuthChanges = onAuth => 
    firebase.auth().onAuthStateChanged(onAuth)