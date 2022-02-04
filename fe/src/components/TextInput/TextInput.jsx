import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {Form, FormGroup, Label, Input, Button, Spinner} from 'reactstrap';
import './TextInput.css';
const TextInput = forwardRef((props, ref) => {
    const [formData, setFormData] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        handleFormSubmit()

    }

    const handleFormSubmit = () => {
        fetch('/get_text_input', {
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
            setIsLoading(true);
            return fetchMyAPI()
        })
        .then((json) => {
            props.parentCallback(json)
            setIsLoading(false)
        })
        .catch((err) => console.log(err))
    }


    async function fetchMyAPI() {
        let response = await fetch('/get_image')
        response = await response.json()
        return response
    }

    useImperativeHandle(ref, () => ({
        manualChange(event) {
            setFormData(event)
        },
    }))

    const handleChange = (event) => {
        setFormData(event.target.value)
    }

    const handleReset = () => {
        setFormData('')
        document.getElementById('text-input').value = ''
    }

    return(

        <Form onSubmit={handleSubmit}>
            <FormGroup className="input-group-lg">
                <Label for="text-input" style={{color:"#f8331a",fontSize:"30px"}}>Text Input</Label>
                <Input style={{height:"100px"}} type="textarea" name="text-input" id="text-input" onInput={handleChange}/>
                <>
                    {!isLoading ?
                        <Button style={{backgroundColor:"#7b1b3b",borderColor:"#7b1b3b"}} variant="flat" className='mt-5 ' type='submit' >success</Button>
                        : <Button  style={{backgroundColor:"#7b1b3b",borderColor:"#7b1b3b"}} variant="flat" className='mt-5' disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    }
                    {' '}
                    <Button style={{backgroundColor:"#198754",borderColor:"#198754"}} variant="flat" className='mt-5' onClick={handleReset}>reset</Button>
                </>
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
})

export default TextInput