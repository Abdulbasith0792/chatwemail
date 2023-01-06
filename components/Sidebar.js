import { Avatar, IconButton , Button} from '@material-ui/core';
import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from "react-firebase-hooks/firestore"
import Chat from './Chat';


function Sidebar() {

  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat with');
        if(!input) return null;

        if(EmailValidator.validate(input)
        && !chatAlreadyExists(input)
         && input !== user.email){
          db.collection('chats').add({
            users : [user.email, input],
          })
        }
    };

    const chatAlreadyExists = (recipientEmail) => 
        !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user=> user === recipientEmail)?. length > 0);
    

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
        <IconsContainer>
            <IconButton>
            <ChatIcon style={{color:"white"}} /> 
            </IconButton>
            <IconButton>
            <MoreVertIcon style={{color:"white"}} />
            </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='search in chats'/>
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {/* chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    border-right:1px solid grey;
    height :100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll ;
    background-color: #3E4142 
 ;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    color: whitesmoke;
    :hover{
        /* color: black; */
    }
`;
const SidebarButton = styled(Button)`
    width: 100%;
    /* border-radius: 0; */
    &&& {
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    background-color: #e5857b;
    }
    :hover{
      opacity: 0.9;
      /* color: white; */
    }
`;


const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;
const SearchInput = styled.input`
    outline-width: 0;
    flex: 1;
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color:#DEDEDE  ;
    color: black;
`;
const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid grey;
    /* background-color: #0A2647 ;
     */
    background-color: #3E4142  ;
    color: white;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    /* margin: 10px; */
    
    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
    color: white;
    
`;

