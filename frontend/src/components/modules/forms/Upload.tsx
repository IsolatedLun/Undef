import { useEffect, useState } from "react"
import { useAutoState } from "../../../hooks/useAutoState"
import MultiForm from "../../combines/MultiForm"
import { generateThumbnail } from "../../funcs/utilFuncs"
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
    const [index, setIndex] = useState(0)
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


    const videoUpload = (
        <>
          <div className="upload__split">
          <label data-label='Upload video'
                htmlFor='video-input' 
                className='input--label input--primary'>
                
                <img src="" id='video-preview' />
                <video className='hidden' id='video-input-video'
                  onLoadedData={(e) => (e.target as HTMLVideoElement).currentTime = videoTime}
                  onSeeked={(e) => {
                    const videoEl = e.target as HTMLVideoElement;
                    generateThumbnail(videoEl, videoTime);
      
                    if(videoTime < 5) {
                      setVideoTime(videoTime + 1);
                      videoEl.currentTime = videoTime;
                    }
                  }} />
                    
                <input 
                onInput={(e) => {
                  useAutoState(e, setNewVideo, newVideo);
                  setVideoTime(1);
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

              <Button props={{ content: 'Next', action: () => null }} />
            </div>
          </div>

          <div className="upload__thumbnail-previews">
            <div className="thumbnail__preview input--primary cust">
              <img id="thumbnail-preview-1" src=""/>
            </div>

            <div className="thumbnail__preview input--primary cust">
              <img id="thumbnail-preview-2" src=""/>
            </div>
          
            <div className="thumbnail__preview input--primary cust">
              <img id="thumbnail-preview-3" src=""/>
            </div>

            <div className="thumbnail__preview input--primary cust">
              <img id="thumbnail-preview-4" src=""/>
            </div>
          
            <div className="thumbnail__preview input--primary cust">
              <img id="thumbnail-preview-5" src=""/>
            </div>
          
          
          </div>
        </>
    )

    const videoUploadForm = <Form props={{ id: '0', children: videoUpload }} />

  return (
    <div className="upload--form">
        <FormCompletion completions={completions} currIdx={index} />
        <MultiForm forms={[videoUploadForm]} index={index} indexFunc={setIndex} />
    </div>
  )
}

export default Upload