import React from 'react';
import { useGetVideosQuery } from '../../services/videoApi';
import Videos from '../combines/Videos';
import Video from '../modules/Video';

const Home = () => {
  const { data } = useGetVideosQuery();

  return(
    <div className="home-container">
      <div className="videos">
        { data && <Videos props={{ videos: data }} /> }
      </div> 
    </div>   
  )
};

export default Home;
