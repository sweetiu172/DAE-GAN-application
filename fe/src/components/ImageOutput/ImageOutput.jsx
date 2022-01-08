import React from 'react'
import './ImageOutput.css'

function ImageOutput({image}) {
    // const imgSrc = image.data?.image_path
    // const tryRequire = (path) => {
    //     try {
    //      return require(`${path}`);
    //     } catch (err) {
    //      return null;
    //     }
    //   };
    const initPath = './image/content/generates/single/'
    return (
        <div className='center-block text-center'>
            { image !== undefined &&
            <img src={require(`${initPath}cc${image.image_path}.png`)} alt='Selected'/>
            }
        </div>
    )
}

export default ImageOutput;