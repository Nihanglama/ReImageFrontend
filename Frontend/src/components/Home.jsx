import "./home.css";
import { useState ,useEffect} from "react";
function Home() {
    const images = [
        'test1.jpeg', 
        'test2.jpeg',
        'test3.jpeg',
      ];
    
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
      useEffect(() => {
        const slideshowInterval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
    
        return () => clearInterval(slideshowInterval);
      }, [images.length]);
  return (
    <div id="landing-div">
      <div id="content">
        <div id="inner">
          <span>Image Enchancement</span>
          <h1>Art of Restoration</h1>
          <h1>ReImage</h1>
          <p>
            Presenting you Image restoration tools empowered by neural network,
          </p>
          <p>Transforming Images, One Click at a Time</p>
          <p>with ease of use</p>
          <button id="try-btn">
            <a href="">Try Now</a>
          </button>
        </div>
        <div  id="image-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            position:'absolute'

          }}
        />
      ))}
    </div>
      </div>
      <div id="footer">
        <a href="#about-dev">About Developer</a>
        <a href="#">About ReImage</a>
        <a href="#">leave message</a>
      </div>
      <div id="about-dev">
        <h2>Meet our Developers</h2>
        <div id="content">
            <img src="/test1.jpeg" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sint saepe nam ipsam vero doloribus nihil pariatur porro corporis, harum amet, assumenda eligendi esse rerum earum magnam accusamus, odio necessitatibus!
            </p>
        </div>
        <div id="content">
            <img src="/test2.jpeg" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt vitae autem quia quidem excepturi laborum, veniam optio aliquam, nam rerum, corrupti laudantium nulla dolorum sapiente ea id voluptates est placeat!</p>
        </div>
        <div id="content">
            <img src="/test3.jpeg" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sint laudantium obcaecati libero perspiciatis odio esse ad odit. Placeat nisi consequatur cum velit recusandae fugit, corrupti eligendi ad aperiam id.</p>
        </div>
      </div>
    </div>

  );
}
export default Home;
