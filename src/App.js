//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';


export class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loginStatus:null,
    }
  }
  responseGoogle=(response)=>{
    //console.log(response);
    console.log(response.profileObj.email);
    if (response.profileObj.email === "kennyyuen1988@gmail.com"){
      this.setState({
        loginStatus:"success",
      });
    }
    else {
      this.setState({
        loginStatus:"fail",
      });
    }
  }
  render(){
    if(this.state.loginStatus==="success"){
      return (
        <div>
          <form action="/action_page.php">
            <input type="file" id="myFile" name="filename" />
            <input type="submit" />
          </form>
        </div>
      );
    }
    else if (this.state.loginStatus==="fail") {
      return (
        <div>
          <GoogleLogin
            clientId="254151262298-ttqkn6va71g542lt0jufbcvl5miri8vk.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <div style={{color:'red'}}>You need permission!</div>
        </div>
      );
    }
    else{
      return (
        <div>
          <GoogleLogin
            clientId="254151262298-ttqkn6va71g542lt0jufbcvl5miri8vk.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      );
    }
    
  }
}

export default App;
