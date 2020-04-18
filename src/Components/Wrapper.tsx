import React from 'react';
import Loader from '../Components/Loader';
import App from '../App';
import { useLoaderStore } from '../Stores/Loader.store';

const Wrapper = () => {
    const { loader } = useLoaderStore();
    return (
        <div style={{ position: 'relative' }}>
            {loader && <Loader />}
            <App />
        </div>
    )
};

export default Wrapper;