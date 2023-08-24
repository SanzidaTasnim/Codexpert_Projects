import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader/Loader";

export default function ShowPost() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [ loading, setLoading ] = useState( true );
  const siteUrl = "http://rootsite.local";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${siteUrl}/wp-json/wp/v2/posts?author=${id}`)
      .then(response => {
         setTimeout(() => {
            setPosts(response.data);
            setLoading( false );
         }, 1000);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [id]);

  const handleLogOut = () => {
   localStorage.removeItem( "token" );
   localStorage.removeItem( "userName" );
   navigate("/");
  }

  return (
   <div>
      {
         loading ? <Loader />: 
         <div>
            <div className="w-100 p-3 mb-3 bg-white ">
            <div className=" text-center h2 d-flex justify-content-between px-5 mx-5">
               <span>
               User Posts
               </span>
               <button className="btn btn-primary" onClick = { handleLogOut }> LogOut </button>
            </div>
         </div>
         {
            posts.map( post => (
               <div key={ post.id } className="card text-center w-75 m-auto mt-3">
                  <div className="card-body">
                     <h5 className="card-title"> { post.title.rendered }</h5>
                     <p className="card-text" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                  </div>
                  <div className="card-footer text-muted">
                     <h6> 2 days ago</h6>
                  </div>
               </div>
            )
            )}
         </div>
      }
      
 </div>
  )
}
