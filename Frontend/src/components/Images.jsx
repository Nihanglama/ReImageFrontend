import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './images.css'

function GetImages() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [status,setStatus]=useState(false)


  //delete image 
    const delete_image = async (id) => {
      try {
        const token=localStorage.getItem('token')
        const response = await axios.delete(`/api/delete_image/${id}`,
        {
            headers:{
                'Authorization': 'Token '+token,
            },
            
        });
        
        window.location.reload()
        alert(response.data.message)
      } catch (error) {
       
        if(error.response){
            console.log(error.response)
        }
      }
    };

    //get image
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token=localStorage.getItem('token')
        const response = await axios.get('/api/get',
        {
            headers:{
                'Authorization': 'Token '+token,
            },
        });
        setStatus(true)
        setImages(response.data);
        console.log(response.data)
      } catch (error) {
        setStatus(false)
        if(error.response){
            console.log(error.response)
        }
      }
    };
    fetchImages();
  }, []); 

  useEffect(() => {
    const isUserLoggedIn = !!localStorage.getItem('token');
    if (!isUserLoggedIn) {
        navigate('/login', { replace: true });

    }
  }, [navigate]); 

  return (
    <div id='list-image'>
      {images.length > 0 ? (
    images.map((image) => (
        <div key={image.id} id='image-content'>
            <img key={image.id} src={image.image_uri} alt={image.name} />
            <span>Name: {image.name}</span>
            <button onClick={() => delete_image(image.id)}>Delete Image</button>
            <button>Convert Image</button>
        </div>
    ))
) : (
    <h1 id='noimage'>No images to display.</h1>
)}
    </div>
  );
}

export default GetImages;
