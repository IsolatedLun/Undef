import Input from "../modules/inputs/Input";
import Button from "../modules/Button";
import { API_URL, ELLIPSE_V_ICO, FLAG_ICO, TRASH_ICO } from "../../consts";
import { useEffect, useState } from "react";
import { useCommentVideoMutation, useDeleteVideoCommentMutation, useGetVideoCommentsQuery } from "../../services/videoApi";
import Loader from "../layouts/Loader";
import { handleResponse, unFocusGlb } from "../funcs/utilFuncs";
import { loggedAction } from "../funcs/authFuncs";
import { useAuth } from "../../hooks/useAuth";
import ContextMenu, { INF_ContextMenuOption } from "../modules/ContextMenu";
import { INF_User } from "../../slices/auth-slice";
import { popup } from "../funcs/popupFuncs";

interface INF_VideoComments {
  videoId: number | string;
  id: string;
}

export interface Comment {
  id: number;
  user: number;
  username: string;
  profile: string;
  created_at: string;
  text: string;

  deletor: Function;
}

function createCommentContextMenu(props: Comment, deletor: Function, user?: INF_User) {
  let options: INF_ContextMenuOption[] = [{ icon: FLAG_ICO, text: 'Report' }];
  
  if(user && props.user === user.id)
    options.push({ icon: TRASH_ICO, text: 'Remove', action: () => deletor(props.id) });
    
  return options;
}

const VideoComment = ({ props, user, deletor }: { props: Comment, user?: INF_User, deletor: Function }) => {
  const commentContextMenu = <ContextMenu 
    props={{ id: 'comment-context-' + props.user, 
      options: createCommentContextMenu(props, deletor, user) }} />

  return (
    <div className="video__comment flex gap--1 flex--g--1">
      <div className="comment__profile profile round">
        <img src={API_URL + props.profile} />
      </div>

      <div className="flex flex--col gap--05 flex--g--1">
        <div className="flex justify--between">
          <div className="flex gap--05">
            <p className="comment__user">{props.username}</p>
            <p className="comment__date txt--muted">{props.created_at} ago</p>
          </div>

          <Button props={{ content: ELLIPSE_V_ICO, action: () => null,
            contextMenu: commentContextMenu, passEvent: true, modifiers: 'comment__option icon--small' }} />
        </div>
        <p className="comment__text">{props.text}</p>
      </div>
    </div>
  );
};

const VideoComments = ({ props }: { props: INF_VideoComments }) => {
  const { isLogged, user } = useAuth();
  const { data: comments, refetch: getComments } = useGetVideoCommentsQuery({ video_id: props.videoId });
  const [commentVideo, {  }] = useCommentVideoMutation();
  const [deleteComment, {  }] = useDeleteVideoCommentMutation();

  const [text, setText] = useState('');
  const [toDelete, setToDelete] = useState<number>(-1);

  useEffect(() => {
    if(toDelete > -1)
      deleteComment(toDelete).unwrap()
        .then(res => {
          popup('Comment removed.', 'Info');
          getComments();
          unFocusGlb();
        })
        .catch(res => handleResponse(res));

  }, [toDelete])

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
            <VideoComment key={idx} props={comment} user={user} deletor={setToDelete} />
          ))}
        </div>
      </div>
    );
  else
    return <Loader radius={20} />
};

export default VideoComments;