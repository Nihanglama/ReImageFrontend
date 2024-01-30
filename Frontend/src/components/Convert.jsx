import axios from "axios"
import { useState,useEffect } from "react";
import "./convert.css"
import { useNavigate } from "react-router-dom";


function ConvertImg(props){
    const [img,setImg]=useState(null)
    const navigate=useNavigate()
    const id=props.passedData

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const token=localStorage.getItem('token')
            const response = await axios.get(`/api/convert_image/${id}`,
            {
                headers:{
                    'Authorization': 'Token '+token,
                },
                
            });
            setImg(response.data)
          } catch (error) {
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

    return(
        <div id="converted_image">
         {img && ( 
            <img src={img.image} alt=" this is conveted image" />)}
        </div>
       
    )
}

export default ConvertImg