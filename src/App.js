import React, { useEffect, useState } from 'react';
import './App.css';
import ImageUploader from 'react-images-upload';

const modelId = process.env.REACT_APP_MODEL_ID;
const modelUrl = `https://teachablemachine.withgoogle.com/models/${modelId}`;

const modelTopology = modelUrl + '/model.json';
const modelMetadataURL = modelUrl + '/metadata.json';

const App = () => {
    const [model, setModel] = useState(null);
    const [picture, setPicture] = useState(null);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const init = async () => {
            const model = await window.tmImage.load(modelTopology, modelMetadataURL);
            setModel(model);
            const classLabels = await model.getClassLabels();
            // const maxPredictions = model.getTotalClasses();
            console.log(classLabels, 'classLabels');
            const labels = classLabels.map((label => ({className: label, probability: 0} )));
            setPredictions(labels);
        };
        init();
    }, []);

    // https://github.com/googlecreativelab/teachablemachine-community/issues/72
    const predict = async () => {
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
    }

    const uploadImage = async (files) => {
        setPicture(files[0]);
    };

    return (
        <div className="App">
            <header className="App-header">
                {picture && <button onClick={predict} >Predict</button>}
                <div>
                { predictions.map(el => {
                    const { className, probability } = el;
                    return (
                        <div className="predictions">
                            <div>{`${className} Probability: ${probability.toFixed(3)}`}</div>
                        </div>
                    );
                })}
                </div>
                <ImageUploader
                    withIcon
                    buttonText="Choose image"
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
