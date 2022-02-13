import React from 'react'
import Loader from '../layouts/Loader';

interface LoadOrShowState {
    toShow: JSX.Element;
    isLoaded: boolean;
    customLoader?: JSX.Element;
}

const LoadOrShow = ({ props }: { props: LoadOrShowState }) => {
    if(props.isLoaded)
        return props.toShow;
    else
        if(props.customLoader !== undefined)
            return props.customLoader
        return <Loader />
}

export default LoadOrShow