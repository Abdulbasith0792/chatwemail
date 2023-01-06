import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { Button } from '@material-ui/core'
import {auth, provider} from "../firebase"

function Login() {

  const signIn = () =>{
    auth.signInWithPopup(provider).catch(alert);
  }
  return (
    <Container>
        <Head>
          <title>Login</title>
        </Head>
        <LoginContainer>
          <Logo 
            src="https://1000logos.net/wp-content/uploads/2018/05/Gmail-Logo-2013.png" height={60} 
          />
          <Button onClick={signIn} variant='outlined' style={{backgroundColor: "#e5857b"}}>Sign In with Google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display:grid;
  place-items: center;
  height: 100vh;
  background-color: #6D6F71 ;
`;

const LoginContainer = styled.div`
  padding: 100px;
  background-color: #3E4142;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;

const Logo = styled.img`
  width: 200px;
  height: 120px;
  margin-bottom: 50px;
`;
