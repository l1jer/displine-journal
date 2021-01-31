import React from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props){
  return <h1>Welcome back!</h1>
}

function GuestGreeting(props){
  return <h1>Please sign up.</h1>
}

// 根据用户是否登陆来决定显式哪一行 greeting
function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn){
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('greeting')
);