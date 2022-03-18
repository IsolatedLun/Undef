import React from 'react'
import Loader from './Loader'

interface INF_PageNotFound {
    text?: string;
    status?: 200 | 404
}

const PageNotFound = ({ props } : { props?: INF_PageNotFound }) => {
    let realProps = props

    if(!realProps) {
        realProps = { text: '404. Couldn\'t find the requested page :(', status: 404 }
    }

    return(
        <div className={`primary-loader loader-${realProps?.status}`}>
            <p className='txt--err loader__text'>{ realProps?.text }</p>
        </div>
    )
}

export default PageNotFound;