import Input from "../modules/inputs/Input";
import Button from "../modules/Button";
import { API_URL } from "../../consts";
import { useEffect, useState } from "react";
import { useCommentVideoMutation, useGetVideoCommentsQuery } from "../../services/videoApi";
import Loader from "../layouts/Loader";
import { handleResponse } from "../funcs/utilFuncs";
import { loggedAction } from "../funcs/authFuncs";
import { useAuth } from "../../hooks/useAuth";

interface INF_VideoComments {
  videoId: number | string;
  id: string;
}

export interface Comment {
  user: number;
  username: string;
  profile: string;
  created_at: string;
  text: string;
}

const VideoComment = ({ props }: { props: Comment }) => {
  return (
    <div className="video__comment flex gap--1 flex--g--1">
      <div className="comment__profile profile round">
        <img src={API_URL + props.profile} />
      </div>

      <div className="flex flex--col gap--05">
        <div className="flex gap--05">
          <p className="comment__user">{props.username}</p>
          <p className="comment__date txt--muted">{props.created_at} ago</p>
        </div>
        <p className="comment__text">{props.text}</p>
      </div>
    </div>
  );
};

const VideoComments = ({ props }: { props: INF_VideoComments }) => {
  const { isLogged } = useAuth();
  const { data: comments, refetch: getComments } = useGetVideoCommentsQuery({ video_id: props.videoId });
  const [commentVideo, {  }] = useCommentVideoMutation()
  const [text, setText] = useState('');

  if(comments)
    return (
      <div id={props.id} className="main-video__comments">
        <h2 className="comments__head">{ comments.length } Comments</h2>

        <div className="comments__form flex flex--col gap--05 flex--al--end">
          <Input
            props={{
              setter: setText,
              placeholder: "Add a comment",
              type: "textarea",
              name: "text",
              realType: "oneWord",
              id: "comment-input",
              value: text
            }}
          />
          
          <Button
            props={{
              content: "Comment",
              action: () => loggedAction(isLogged, async() => {
                setText('');

                commentVideo({ video_id: props.videoId, text })
                  .unwrap()
                  .then(res => getComments())
                  .catch(res => handleResponse(res))
              }, true),

              loaderCls: "button--loader",
              workCondition: text.length > 0
            }}
          />
        </div>

        <div className="flex flex--col gap--2-5">
          {comments.map((comment, idx) => (
            <VideoComment key={idx} props={comment} />
          ))}
        </div>
      </div>
    );
  else
    return <Loader radius={20} />
};

export default VideoComments;
