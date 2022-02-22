import React from 'react'
import Loader from '../layouts/Loader'

const ShowOr404 = ({ el, data, isSuccess, isFetching } : 
    { el: JSX.Element, data: any, isSuccess: boolean, isFetching: boolean }) => {
        
    if(data === undefined)
        return(<Loader />)
    else if(!isSuccess)
        return(
            <div className="primary-loader">
                404. Could not find the requested page :(
            </div>
        )
    else
        return(el);
}

export default ShowOr404