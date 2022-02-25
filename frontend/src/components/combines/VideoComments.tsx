import Input  from '../modules/inputs/Input';
import React from 'react';
import Button from '../modules/Button';
import VideoComment, { Comment } from '../modules/VideoComment';

interface INF_VideoComments {
  id: string;
  comments: Comment[]
}

const VideoComments = ({ props }: { props: INF_VideoComments }) => {
  return(
      <div id={props.id} className="main-video__comments">
          <h2 className="comments__head">Comments</h2>
          
          <div className="comments__form flex flex--col gap--05 flex--al--end">
            <Input props={{ setter: () => null, data: '', placeholder: 'Add a comment',
            type: 'text', name: 'text', realType: 'string', id: 'comment-input' }} />
            <Button props={{ content: 'Post', action: () => null }} />
          </div>

          <div className="flex flex--col gap--2-5">
            {
              props.comments.map((comment, idx) => (
                <VideoComment key={idx} props={comment} />
              ))
            }
          </div>
      </div>
  )
};

export default VideoComments;
