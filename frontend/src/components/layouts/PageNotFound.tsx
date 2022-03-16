import React from 'react'
import Loader from './Loader'

const PageNotFound = () => {
    return(
        <div className="primary-loader loader-404">
            <p className='txt--err loader__text'>404. Couldn't find the requested page :(</p>
        </div>
    )
}

export default PageNotFound;