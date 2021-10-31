//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";

export class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loginStatus:null,
    }
  }
  responseGoogle=(response)=>{
    //console.log(response);
    //console.log(response.profileObj.email);
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
      const upload = (file) =>{
        var uploadFile = file.target.files[0];

        const target = { Bucket:"kennyuploadbucket", Key:uploadFile.name, Body:uploadFile };
        const creds = {accessKeyId:"AKIA6QNEXQQR35TZXHEZ"};
        try {
          const parallelUploads3 = new Upload({
            client: new S3Client({region:"ap-east-1", credentials:creds}),
            //tags: [...], // optional tags
            //queueSize: 4, // optional concurrency configuration
            //partSize: 5MB, // optional size of each part
            leavePartsOnError: false, // optional manually handle dropped parts
            params: target,
          });

          parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress);
          });

          parallelUploads3.done();
        } catch (e) {
          console.log(e);
        }

      }
      return (
        <>
          <input type="file" onChange={upload}/>
        </>
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
