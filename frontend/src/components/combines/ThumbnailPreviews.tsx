import React from 'react'
import { useAutoState } from '../../hooks/useAutoState'

const ThumbnailPreview = ({ id, idx, setter, data }: 
        { id: string, idx: number, setter: Function, data: any, name: string }) => {

    const currId: string = 'thumbnail-preview-' + idx;
   
    function setThumbnail(e: React.FormEvent<any>, setter: Function, data: any) {
        const target = e.target as HTMLInputElement;

        const imgFile: File = new File([target.src], 'any.png', {
            type: 'image/png'
        });
        
       (document.getElementById('thumbnail-preview-0') as HTMLImageElement).src = target.src;
       setter({ ...data, [target.getAttribute('data-name')!]: imgFile })
    }

    return (
        <div onClick={(e) => useAutoState(e, setter, data, setThumbnail, [e, setter, data])}
            className="thumbnail__preview input--primary cust">
            <img id={currId} src="" data-name={name}/>
        </div>
    )
}

const ThumbnailPreviews = ({ id, name, amt, setter, data }: 
        { id: string, amt: number, setter: Function, data: any, name: string }) => {

    let previews: JSX.Element[] = []

    for(let i = 1; i < amt + 1; i++) {
        previews.push(
            <ThumbnailPreview key={i - 1} id={id} idx={i} setter={setter} data={data} name={name} />
        )
    }

    return (<>{ previews }</>)
}

export default ThumbnailPreviews