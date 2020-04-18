import React from 'react';
import { Spinner } from 'reactstrap'

const LoaderIcon = () => {
    return (
        <div className="loader-icon">
             <Spinner color="danger" />
        </div>
    )
}

const Loader = () => {
    return (
        <>
            <div className='loader-wrapper'/>
            <LoaderIcon />
        </>
    );
}

export default Loader;