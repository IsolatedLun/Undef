import React from 'react';
import Video from '../modules/Video';

const Home = () => {
  return(
    <div className="home-container">
      <div className="videos">
        <Video props={{ title: 'esh' }} />  
      </div> 
    </div>   
  )
};

export default Home;
