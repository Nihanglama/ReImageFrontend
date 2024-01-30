import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './upload.css';
import { useNavigate } from 'react-router-dom';
// import ConvertImg from './Convert';

function Upload() {
  const [img,setImg]=useState(null)
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status,setStatus]=useState(false);
  const [error,setError]=useState([])
  const token = localStorage.getItem('token');
  const [id,setId]=useState(null)
  const navigate=useNavigate()



  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.files[0];
    setImage(droppedImage);
  };
  const handleClick=(e)=>{
    setImage(null)
    setStatus(false)
  }

  const handleUpload = async () => {
    if (!image) {
      alert('Please select a PNG image');
      return;
    }
    if (!name.trim()) {
      alert('Name is required');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token '+token,
        },
      });
      console.log('Upload success:', response.data.id);
        setId(response.data.id)
        setStatus(true)
      setError([])
      setName('');
    } catch (error) {
      
      if (error.response) {
        setError(["You are not authorized .",error.response.status,error.response.statusText])
      } else if (error.request) {
        setError([error.request])
      } else {
        setError([error.message])
      }
    } finally {
      setLoading(false);
    }
  };

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


  return (
    <div id='image-handle'>
      <div className='image-handle'>
        <div id='change-img'>
          {image && (
            <img src={URL.createObjectURL(image)} alt="Selected" />
          )}
          <label
            htmlFor="upload-input"
            className="custom-file-upload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            Drop or click here
          </label>
          <input
            type="file"
            accept="image/png"
            id="upload-input"
            onClick={handleClick}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <input
          type="text"
          name='name'
          placeholder='Name of image'
          value={name}
          onChange={handleNameChange}
        />
        <button onClick={handleUpload}>Upload Image</button>
        {status && <button onClick={fetchImages} >Convert</button>}
        
         {img && ( <div id="converted_image">
            <img src={img.image} alt=" this is conveted image" /> </div>)}
        
        {loading && <p id='uploading'>Uploading...</p>}
        {error && <p id='uploading'>{error}</p> }
        
      </div>
    </div>
  );
}

export default Upload;
