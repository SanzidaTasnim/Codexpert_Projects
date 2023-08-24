import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Form() {
  const data = {
    username: '',
    userNiceName: '',
    password: '',
    loggedIn: false,
    error: '',
  };
  const [ inputData, setInputData ] = useState( data );
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username : inputData.username,
      password : inputData.password
    }

    const siteUrl = "http://rootsite.local";

    axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token` , loginData )
      .then( response => {
        if ( undefined === response.data.token ){
          setInputData({
            ...inputData,
            error : response.data.message
          })
          return;
        }
        const { token, user_nicename, user_email } = response.data;
      
        localStorage.setItem( 'token', token );
				localStorage.setItem( 'userName', user_nicename );

        setInputData({
          ...inputData,
          token : token,
          email : user_email,
          userNiceName : user_nicename,
          loggedIn : true,
        })
        
      }).catch(err => {
        setInputData({
          ...inputData,
          error : err.response.data
        })
        if (err.response.status !== 200) {
          Swal.fire({
            title: 'Unauthorized',
            text : "You're not authorized!",
            icon : 'warning', // success, error, warning, info
          });
        }
      })
    
    if( ! inputData.username || ! inputData.password ) {
      Swal.fire({
        title: 'Warning',
        text : 'All Fields Are Required!',
        icon : 'warning', // success, error, warning, info
      });
    }
  };
  
  if ( inputData.loggedIn && localStorage.getItem( "token" ) ){
    return navigate("/post");
  } else {
    return (
      <div>
        <form action="" className="contain" onSubmit={ handleSubmit }>
          <div className="header">
            <h2>Login Form</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Your Username"
              name="username"
              value={inputData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
            />
          </div>
          <div className="btn-div">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
