import React from 'react'
import './ImageOutput.css'

function ImageOutput() {
    const imgSrc = 'Black_Footed_Albatross_0001_796111_s-1_0'
    return (
        <div className='center-block text-center'>
            <img src={require(`../../image/${imgSrc}.png`)} alt='Selected'/>
        </div>
    )
}

export default ImageOutput;