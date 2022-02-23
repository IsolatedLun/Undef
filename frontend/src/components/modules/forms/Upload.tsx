import { useState } from "react"
import MultiForm from "../../combines/MultiForm"
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
        <div className="upload__split">
          <Input props={{ name: 'video', realType: 'video', type: 'file', placeholder: 'Upload video' }} />
          <div className="input__parts">
            <InputPart props={{ label: 'Title', inputData: 
              { name: 'title', realType: 'string', type: 'text', placeholder: 'Enter title' } , id: 'title'}} />

            <InputPart props={{ label: 'Description', inputData: 
              { name: 'description', realType: 'string', type: 'textarea' } , id: 'description'}} />

            <Button props={{ content: 'Next', action: () => null }} />
          </div>
        </div>
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