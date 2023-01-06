import styled from 'styled-components'
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { Avatar } from '@mui/material';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Message from './Message';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('');
    const endOfMessagesRef = useRef(null)
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
    
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
    );
    const showMessages = () => {
        if (messagesSnapshot){
             return messagesSnapshot.docs.map((message) => (
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
             ))
        }
        else{
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    }

    const ScrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block: "start",
        });
    }
  const sendMessage = (e) => {
        e.preventDefault();
        //update the last seen
        db.collection('users').doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true} 
        );
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message :input,
            user:user.email,
            photoURL : user.photoURL,
        });
        setInput('');
        ScrollToBottom();
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
   return (
    <Container>
      <Header>
       {recipient ? (
           <Avatar src={recipient?.photoURL}/>
         ) : (
              <Avatar>{recipientEmail[0]}</Avatar>
            )}

        <HeaderInformation>
            <h3 style={{marginTop: '10px'}}>
                {recipientEmail}
{recipientSnapshot ? (
    <p style={{fontSize : 'x-small'}}>Last active: {' '}
    {recipient?.lastSeen?.toDate() ? (
        <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
    ) : "Unavailable"}
    </p>
) : (
    <p> Loading last active... </p>
)}

    
            </h3>
            
            </HeaderInformation>
            <HeaderIcons>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef}/>
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
        <MicIcon />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen


const Container = styled.div``;
const Header = styled.div`
    position: sticky;
    background-color: #3E4142 ;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 7px;
    padding-top: 4px;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid grey;
    color: white;

`;

const HeaderInformation = styled.div`
    
    margin-left: 15px;
    flex: 1;

    > h3{
        margin-bottom: 3px ;
        padding: 0px;
    }
    > p {
        font-size: xx-small;
    }
`;

const HeaderIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IconButton = styled.div``;
const MessageContainer = styled.div`
    padding: 30px;
    background-color:#6D6F71  ;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`

margin-bottom: 50px;
`;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: #3E4142 ;
z-index: 100;
color: white;
`;

const Input = styled.input`
flex: 1;
align-items: center;
position: sticky;
padding: 20px;
background-color: #6D6F71 ;
border-radius: 10px;
margin-left: 15px;
margin-right: 15px;
border: none;
outline: none;
color: white;
font-size: 18px;
font-weight: bold;
cursor: white;
:hover{

}
`;