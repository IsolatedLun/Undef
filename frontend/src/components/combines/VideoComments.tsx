import Input  from '../modules/Input';
import React from 'react';
import Button from '../modules/Button';
import VideoComment from '../modules/VideoComment';

interface INF_VideoComments {
  id: string;
}

const VideoComments = ({ props }: { props: INF_VideoComments }) => {
  return(
      <div id={props.id} className="main-video__comments">
          <h2 className="comments__head">Comments</h2>
          
          <div className="comments__form flex flex--col gap--05 flex--al--end">
            <Input props={{ setter: () => null, data: '', placeholder: 'Add a comment',
            type: 'text', default: true }} />
            <Button props={{ content: 'Post', default: true, isIcon: false, action: () => null }} />
          </div>

          <div className="flex flex--col gap--2-5">
            <VideoComment />
          </div>
      </div>
  )
};

export default VideoComments;
