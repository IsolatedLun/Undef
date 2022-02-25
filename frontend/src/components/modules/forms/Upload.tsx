import { useEffect, useState } from "react"
import { useAutoState } from "../../../hooks/useAutoState"
import MultiForm from "../../combines/MultiForm"
import ThumbnailPreviews from "../../combines/ThumbnailPreviews"
import { generateThumbnail, previewImage, resetThumbnails } from "../../funcs/utilFuncs"
import Button from "../Button"
import Form from "../Form"
import FormCompletion, { INF_FomrCompletion } from "../FormCompletion"
import Input from "../inputs/Input"
import InputPart from "../inputs/InputPart"

interface INF_VideoUpload {
  channel: number;
  title: string;
  description: string;
  thumbnail: File | null;
  video: File | null;
}

const Upload = () => {
    const previewAmt: number = 4

    const [index, setIndex] = useState(0)
    const [previewIdx, setPreviewIdx] = useState(1)
    const [videoTime, setVideoTime] = useState(1);
    const [newVideo, setNewVideo] = useState<INF_VideoUpload>({
      channel: -1,
      title: '',
      description: '',
      thumbnail: null,
      video: null
    });

    const completions: INF_FomrCompletion[] = [
      {idx: 1, text: 'Video'},
      {idx: 2, text: 'Publish'},
    ]

    function meow() {
      console.log('meow')
    }

    const videoUpload = (
        <>
          <div className="upload__split">
          <label data-label='Upload video'
                htmlFor='video-input' 
                className='upload__input-label input--label input--primary'>
                
                <img src="" id='thumbnail-preview-0' className="upload__selected-preview" />
                <video className='' id='video-input-video'
                  onLoadedData={(e) => (e.target as HTMLVideoElement).currentTime = videoTime}
                  onSeeked={(e) => {
                    const videoEl = e.target as HTMLVideoElement;
                    generateThumbnail(videoEl, previewIdx);
      
                    if(previewIdx < previewAmt && videoTime < videoEl.duration) {
                      setVideoTime(videoTime + previewIdx);
                      setPreviewIdx(previewIdx + 1)
                      videoEl.currentTime = videoTime;
                    }
                  }} />
                    
                <input 
                onInput={(e) => {
                  const target = e.target as HTMLVideoElement;
                  (document.getElementById('thumbnail-preview-0') as HTMLImageElement).src = '';

                  useAutoState(e, setNewVideo, newVideo);
                  resetThumbnails(previewAmt);
                  setVideoTime(1);
                  setPreviewIdx(1);
                }}
                
                id='video-input'
                className='input--primary input--file'
                type="file" 
                accept='video/*'
                name='video'

                data-real-type='video'
                />

            </label>

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

    const videoUploadForm = <Form props={{ id: '0', children: videoUpload }} />
    const publishUploadForm = <Form props={{ id: '1', children: <>esh</> }} />

  return (
    <div className="upload--form">
        <FormCompletion completions={completions} currIdx={index} />
        <MultiForm forms={[videoUploadForm, publishUploadForm]} index={index} indexFunc={setIndex} />
    </div>
  )
}

export default Upload