import React from 'react'
import { useAutoState } from '../../hooks/useAutoState'
import { dataUrlToFile } from '../funcs/utilFuncs';
import Loader from '../layouts/Loader';

const ThumbnailPreview = ({ id, idx, setter, data, name }: 
        { id: string, idx: number, setter: Function, data: any, name: string }) => {

    const currId: string = 'thumbnail-preview-' + idx;
   
    async function setThumbnail(e: React.FormEvent<any>, setter: Function) {
        const imgEl = e.target as HTMLImageElement;

       (document.getElementById('thumbnail-preview-0') as HTMLImageElement).src = imgEl.src;
        const preview = await dataUrlToFile(imgEl.src);
        setter((prevState: any) => ({ ...prevState, [imgEl.getAttribute('data-name')!]: preview }));
    }

    return (
        <div onClick={(e) => useAutoState(e, setter, () => setThumbnail(e, setter), [])}
            className="thumbnail__preview input--primary cust pos--relative">
            <img id={currId} src="" data-name={name} />
            <Loader id={currId + '-loader'} />
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