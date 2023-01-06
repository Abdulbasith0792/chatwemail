import {Circle} from "better-react-spinkit"

import React from 'react'

function Loading() {
  return (
    <center style={{display:"grid", placeItems:"center", height: '100vh', backgroundColor : '#6D6F71 '}}>
      <div>
        <img src="https://1000logos.net/wp-content/uploads/2018/05/Gmail-Logo-2013.png" alt="" height={150} style={{marginBottom:10}} />
        <Circle  color="#e5857b" size={70}/>
      </div>
    </center>
  )
}

export default Loading
