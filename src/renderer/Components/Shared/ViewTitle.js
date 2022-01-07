import React from 'react';


export default function ViewTitle({text="Choose your channel",children}) {

  return (
    <div className="chat-name-container">
      <div className="name">{text}</div>
      <div>{children}</div>
    </div>
  )
}