import Input  from '../modules/inputs/Input';
import Button from '../modules/Button';
import { API_URL } from '../../consts';

interface INF_VideoComments {
  id: string;
  comments: Comment[]
}

export interface Comment {
  user: number;
  username: string;
  profile: string;
  created_at: string;
  text: string;
}

const VideoComment = ({ props } : { props: Comment }) => {
  return(
      <div className="video__comment flex gap--1 flex--g--1">
          <div className="comment__profile profile round">
            <img src={API_URL + props.profile} />
          </div>

          <div className='flex flex--col gap--05'>
            <div className='flex gap--05'>
              <p className="comment__user">{ props.username }</p>
              <p className="comment__date txt--muted">{ props.created_at } ago</p>
            </div>
            <p className="comment__text">{ props.text }</p>
          </div>
      </div>
  )
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
