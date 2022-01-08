import React, {useState} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './TextInput.css';
function TextInput({parentCallback}){
    const [formData, setFormData] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        handleFormSubmit()
    }

    const handleFormSubmit = () => {
        fetch('http://localhost:5000/get_text_input', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData, 
            }),
        })
        .then((res) => {
            res.json()
        })
        .then(message => {
            setFormData('')
            document.getElementById('text-input').value = ''
            return fetchMyAPI()
        })
        .then((json) => {
            parentCallback(json)
        })
        .catch((err) => console.log(err))
    }


    async function fetchMyAPI() {
        let response = await fetch('http://localhost:5000/get_image')
        response = await response.json()
        return response
    }

    const handleChange = (event) => {
        setFormData(event.target.value)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <FormGroup className="input-group-lg">
                <Label for="text-input">Text Area</Label>
                <Input type="textarea" name="text-input" id="text-input" onChange={handleChange}/>
                <Button className='mt-5 ' type='submit' color="success">success</Button>{' '}
            </FormGroup>
        </Form>
        // <section className='py4 cointainer'>
        //     <div className='row justify-content-center'>
        //         <div className='inputfield col-12 mb-5'>
        //             <div className='mb-4 col-5 mx-auto text-center'>
        //                 <label className='form-label h4'>Input</label>
        //             </div>
        //             <div className='mb-4 col-5 mx-auto text-center'>
        //                 <input type="text" className='from-control' />
        //             </div>
        //             <div className='imgcontainer col-12 mb-5'>
        //                 <img src={img} alt='Selected' className='selected'/>
        //             </div>
        //         </div>
                
                
        //     </div>
        // </section>
    )
}

export default TextInput