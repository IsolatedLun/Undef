import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { useAutoState } from "../../../hooks/useAutoState"
import { useUploadVideoMutation } from "../../../services/channelApi"
import MultiForm from "../../combines/MultiForm"
import Radios from "../../combines/Radios"
import ThumbnailPreviews from "../../combines/ThumbnailPreviews"
import { constructFormData, isValidFile, validateForm } from "../../funcs/formFuncs"
import { dataUrlToFile, generateThumbnail, handleResponse, previewImage, 
  resetThumbnails } from "../../funcs/utilFuncs"
import Button, { toggleButton } from "../../modules/Button"
import Form from "../../modules/Form"
import FormCompletion, { INF_FomrCompletion } from "../../modules/FormCompletion"
import Input from "../../modules/inputs/Input"
import InputPart from "../../modules/inputs/InputPart"

interface INF_VideoUpload {
  channel_id: number;
  user_id: number;
  title: string;
  description: string;
  thumbnail: File | null;
  video: File | null;
  visibility: string;
}

const Upload = () => {
    const { user } = useAuth();
    const [uploadVideo, { isSuccess }] = useUploadVideoMutation();
    const navigate = useNavigate();
    const previewAmt: number = 4
    const { channel_id } = useParams();
    const [visibility, setVisibility] = useState('1');

    const [index, setIndex] = useState(0)
    const [previewIdx, setPreviewIdx] = useState(1)
    const [videoTime, setVideoTime] = useState(1);
    const [newVideo, setNewVideo] = useState<INF_VideoUpload>({
      channel_id: Number(channel_id),
      user_id: user.id,
      title: '',
      description: '',
      thumbnail: null,
      video: null,
      visibility: visibility,
    });

    const completions: INF_FomrCompletion[] = [
      {idx: 1, text: 'Video'},
      {idx: 2, text: 'Publish'},
    ]

    const videoUpload = (
        <>
          <div className="upload__split">
            <div className="form__part">
            <label data-label='Upload video'
                  htmlFor='video-input' 
                  className='upload__input-label input--label input--primary'>
                  
                  <img src="" id='thumbnail-preview-0' className="upload__selected-preview" />
                  <video className='' id='video-input-video'
                    onLoadedData={(e) => (e.target as HTMLVideoElement).currentTime = videoTime}
                    onSeeked={async(e) => {
                      const videoEl = e.target as HTMLVideoElement;
                      const thumbnailUrl = generateThumbnail(videoEl, previewIdx);
        
                      if(previewIdx < previewAmt && videoTime < videoEl.duration) {
                        setVideoTime(videoTime + previewIdx);
                        setPreviewIdx(previewIdx + 1)
                        videoEl.currentTime = videoTime;
                      }

                      else
                        setNewVideo({ ...newVideo, thumbnail: await dataUrlToFile(thumbnailUrl) });
                    }} />
                      
                  <input 
                  onInput={(e) => {
                    if(isValidFile((e.target as HTMLInputElement).files![0], 'video') === true) {
                      (document.getElementById('thumbnail-preview-0') as HTMLImageElement).src = '';

                      useAutoState(e, setNewVideo, newVideo);
                      resetThumbnails(previewAmt);
                      setVideoTime(1);
                      setPreviewIdx(1);
                    }
                  }}
                  
                  id='video-input'
                  className='input--primary input--file form__inpt'
                  type="file" 
                  accept='video/*'
                  name='video'

                  data-real-type='video'
                  />

              </label>
              <ul id="video-input-help-list" className="part__help-list"></ul>
            </div>

            <div className="input__parts">
              <InputPart props={{ label: 'Title', setter: setNewVideo, data: newVideo,
              inputData: { name: 'title', realType: 'string', type: 'text', placeholder: 'Enter title' }, 
                id: 'title'}} />

              <InputPart props={{ label: 'Description', setter: setNewVideo, data: newVideo,
              inputData: { name: 'description', realType: 'string', type: 'textarea' }, 
                id: 'description'}} />

              <Button props={{ content: 'Next', action: () => setIndex(index + 1) }} />
            </div>
          </div>

          <div className="upload__thumbnail-previews">
            <Input props={{ name: 'thumbnail', realType: 'image', 
              type: 'file', setter: setNewVideo, data: newVideo, labelCls: 'dashed', 
                placeholder: 'Upload thumbnail', id: 'thumbnail-input', 
                cb: previewImage, cbParams: [document.getElementById('thumbnail-preview-0')], 
                cbOverride: false }} />
            
            <ThumbnailPreviews id={'video-input'} amt={previewAmt} name={'thumbnail'}
              setter={setNewVideo} data={newVideo} />
          </div>
        </>
    )

    const publish = (
      <>
        <div data-real-type='radios' id='visibility-input'
          className="input--radios form__inpt form__part flex flex--col gap--1">

          <Radios props={{ name: 'visibility', setter: setVisibility, radios: [
            { value: '1', title: 'Public', text: 'Your video is visible to everyone.' },
            { value: '2', title: 'Unlisted', text: 'Your video is only accessible by a link.' },
            { value: '3', title: 'Private', text: 'Your video is only visible to you.' },
          ] }} />
          <ul id='visibility-input-help-list' className="part__help-list"></ul>
        </div>
        
        <Button props={{ content: 'Publish', action: () => {
          if(validateForm('form__inpt', undefined, true)) {
            const btn = document.getElementById('publish-video-btn') as HTMLButtonElement;
            toggleButton(btn);

            uploadVideo({ videoData: constructFormData(newVideo), channel_id })
              .unwrap()
              .then(res => handleResponse(res, { redirectTo: `/channels/${channel_id}` }, btn))
              .catch(res => handleResponse(res, undefined, btn))
          }
        }, modifiers: 'mt--1', id: 'publish-video-btn', loaderCls: 'button--loader' }} />
      </>
    )

    const videoUploadForm = <Form props={{ id: '0', children: videoUpload }} />
    const publishUploadForm = <Form props={{ id: '1', children: publish }} />

  return (
    <div className="upload--form">
        <FormCompletion completions={completions} currIdx={index} />
        <MultiForm forms={[videoUploadForm, publishUploadForm]} index={index} indexFunc={setIndex} />
    </div>
  )
}

export default Upload