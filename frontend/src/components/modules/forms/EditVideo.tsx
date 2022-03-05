import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEditVideoMutation } from '../../../services/channelApi';
import { useGetVideoQuery } from '../../../services/videoApi';
import Radios from '../../combines/Radios';
import Loader from '../../layouts/Loader';
import Button from '../Button';
import Form from '../Form';
import Input from '../inputs/Input';
import InputPart from '../inputs/InputPart';

interface INF_EditVideo {
    title: string;
    description: string;
    visibility: string;
    thumbnail: File | null;
}

const EditVideo = () => {
    const { video_id } = useParams();
    const [editVideo, {  }] = useEditVideoMutation();
    const { data: video, isSuccess } = useGetVideoQuery({ video_id, type: 'edit' });

    const [canUpdate, setCanUpdate] = useState(false);
    const [visibility, setVisibility] = useState('');
    const [updateVideo, setUpdateVideo] = useState<INF_EditVideo>({
        title: '',
        description: '',
        visibility: visibility,
        thumbnail: null,
    })

    useEffect(() => {
        if(isSuccess) {
            reset();
        }
    }, [isSuccess])

    useEffect(() => {
        if(JSON.stringify(video) !== JSON.stringify(updateVideo) || video!.visibility !== Number(visibility))
            setCanUpdate(true);
        else
            setCanUpdate(false);
    }, [updateVideo, visibility])

    function reset() {
        setUpdateVideo({ ...(video as any) });
        setVisibility(String(video!.visibility));
        const radio = document.getElementById('radio-visibility-' + video.visibility) as HTMLButtonElement;
        radio.click();
    }

    const editVideoElements = ( video &&
        <>
            <div data-real-type='radios' id='visibility-input'
                className="input--radios form__inpt form__part flex flex--col gap--1">

                <Input props={{ name: 'thumbnail', type: 'file', realType: 'image', id: 'video-thumbnail',
                    placeholder: 'Change thumbnail', setter: setUpdateVideo, data: updateVideo,
                    labelCls: 'w--40 cust mi--inline', url: video.thumbnail }} />

                <InputPart props={{ label: 'Title', setter: setUpdateVideo, data: updateVideo, id: 'title',
                    inputData: { 
                        name: 'title',
                        type: 'text',
                        realType: 'string',
                        value: updateVideo.title
                     } 
                }} />

                <InputPart props={{ label: 'Description', setter: setUpdateVideo, data: updateVideo, id: 'title',
                    inputData: { 
                        name: 'description',
                        type: 'textarea',
                        realType: 'string',
                        value: updateVideo.description
                     } 
                }} />

                <Radios props={{ name: 'visibility', setter: setVisibility, radioCls: 'small',
                    radios: [
                        { value: '1', title: 'Public', text: 'Your video is visible to everyone.' },
                        { value: '2', title: 'Unlisted', text: 'Your video is only accessible by a link.' },
                        { value: '3', title: 'Private', text: 'Your video is only visible to you.' },
                    ] 
                }} />
                <ul id='visibility-input-help-list' className="part__help-list"></ul>
            </div>

            <div className="flex flex--center--between gap--1 mt--1">
                <Button props={{ content: 'Delete', action: () => null }}/>
                
                <div className="btn--group">
                    <Button 
                        props={{ 
                            content: 'Reset', 
                            action: reset }}
                    
                    />

                    <Button 
                        props={{ 
                            content: 'Update', 
                            action: () => null, 
                            modifiers: canUpdate ? '' : 'disabled' }}
                    
                    />
                </div>
            </div>
        </>
    )


  return ( <Form props={{ children: editVideoElements ? editVideoElements : (
        <div className='pos--relative mt--1'>
          <Loader />
        </div>
  ), id: '1' }} /> )
}

export default EditVideo