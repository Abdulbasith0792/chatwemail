import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';
import moment from 'moment';

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <Container>
      <TypeOfMessage>{message.message}
      <TimeStamp>{message.timestamp ? moment(message.timestamp).format('LT') : "..."}</TimeStamp>
      </TypeOfMessage>
    </Container>
  )
}

export default Message

const Container = styled.div``;

const MessageElement = styled.p`

width: fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
/* background-color: whitesmoke; */
position: relative;
text-align: right;
min-width: 60px;
`;
const Sender = styled(MessageElement)`
margin-left: auto;
background-color: #e5857b;
`;

const Reciever = styled(MessageElement)`
text-align: left;
background-color: #DEDEDE;
`;

const TimeStamp = styled.span`
    color: black;
    padding:6px;
    font-size: 9px ;
    /* position: absolute; */
    bottom: 0;
    text-align: right;
    right: 0;
    /* margin-top: 5px; */
`;