import React from 'react'
import {FormGroup, Label, Input} from 'reactstrap';
import './TextInput.css';
function Search(){
    return(
        <FormGroup className="input-group-lg">
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
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

export default Search