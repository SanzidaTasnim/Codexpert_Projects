import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const InsertPost = () => {
   const data = {
      title: '',
      content: '',
      userID: '',
      token: '',
      loader: false,
    };
    const [ inputData, setInputData ] = useState( data );
    const siteUrl = "http://rootsite.local";
    const token = localStorage.getItem( 'token' );
    const navigate = useNavigate();
      
    const handleChange = (e) => {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if( ! inputData.title || ! inputData.content ) {
        Swal.fire({
         title: 'Warning',
         text: 'All Fields Are Required!',
         icon: 'warning', // success, error, warning, info
       });
      }
      else {
         const newPost = {
            title: inputData.title,
            content: inputData.content,
          };
          const statusChangedPost = { ...newPost, status: 'publish' };
      
         axios.post(`${ siteUrl }/wp-json/wp/v2/posts` , statusChangedPost, {
            headers : {
               "Authorization" : `Bearer ${ token }`,
               'Content-Type': 'application/json',
            }
         })
         .then(( res ) => {
            setInputData( {
               ...inputData,
               loader: true,
               userID : res.data.author
            } )
            console.log( "res" , res );
         })
         .catch(( err ) => {
            console.log ( "err" , err);
         })
      }
    };
   if ( inputData.loader ){
      Swal.fire({
         title: 'Success!',
         text: 'Email Has Been Sent Successfully',
         icon: 'success', // success, error, warning, info
       });
      return navigate(`/post/${inputData.userID}`);
   } else {
      return (
         <div>
            <form action="" className="contain" onSubmit = { handleSubmit }>
            <div className="header">
               <h2>Create New Post</h2>
            </div>
            <div>
               <input
                  type = "text"
                  placeholder = "Post Title"
                  name = "title"
                  value = { inputData.title }
                  onChange = { handleChange }
               />
            </div>
            <div>
               <textarea 
                  name="content" 
                  type="text" 
                  placeholder="Post Content" 
                  cols="30" 
                  rows="10" 
                  value={ inputData.content } 
                  onChange={ handleChange } >
               </textarea> 
            </div>
            <div className="btn-div">
               <button type="submit" >Save Post</button>
            </div>
            </form>
       </div>
      )
   }
   
}
export default InsertPost;