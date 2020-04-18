import React from 'react';
import ImageUploader from 'react-images-upload';

const Uploader = () => {
    return (
        <ImageUploader
            withIcon
            buttonText="Choose image"
            // onChange={uploadImage}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            singleImage
            withPreview
        />
    );
};

export default Uploader;