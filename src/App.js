import React, { useEffect, useState } from 'react';
import './App.css';
import ImageUploader from 'react-images-upload';
import { Button } from 'reactstrap';
import { useLoaderStore } from './Stores/Loader.store';

const modelId = process.env.REACT_APP_MODEL_ID;
const modelUrl = `https://teachablemachine.withgoogle.com/models/${modelId}`;

const modelTopology = modelUrl + '/model.json';
const modelMetadataURL = modelUrl + '/metadata.json';

const App = () => {
    const { loaderOn, loaderOff } = useLoaderStore();

    const [model, setModel] = useState(null);
    const [picture, setPicture] = useState(null);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const init = async () => {
            loaderOn();
            const model = await window.tmImage.load(modelTopology, modelMetadataURL);
            setModel(model);
            loaderOff();
        };
        init();
    }, [loaderOn, loaderOff]);

    // https://github.com/googlecreativelab/teachablemachine-community/issues/72
    const predict = async () => {
        loaderOn();
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = async function () {
                const prediction = await model.predict(img);
                setPredictions(prediction);
            }
            img.src = reader.result;
        }
        reader.readAsDataURL(picture)
        loaderOff();
    }

    const uploadImage = async (files) => {
        setPicture(files[0]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p className="app-title">Japanese Family Crest Predictor</p>
                <div>
                    {predictions.map(el => {
                        const { className, probability } = el;
                        return (
                            <div className="predictions">
                                <div>{`${className} - ${probability.toFixed(3)}`}</div>
                            </div>
                        );
                    })}
                </div>
                {picture && <Button className="predict-button" onClick={predict} >Predict</Button>}
                <ImageUploader
                    className="image-uploader"
                    buttonText="Select an image"
                    onChange={uploadImage}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    singleImage
                    withPreview
                />
            </header>
        </div>
    );
};

export default App;
