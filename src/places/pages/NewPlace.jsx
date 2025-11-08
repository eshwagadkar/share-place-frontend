import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import Button from '../../shared/components/FormElements/Button'
import { useForm } from '../../shared/hooks/form-hooks'

import './PlaceForm.css'


export default function NewPlace() {

    const [inputHandler, formState] = useForm({
                title: {
                    value: '',
                    isValid: false
                },
                description: {
                    value: '',
                    isValid: false
                }, 
                address: {
                    value: '',
                    isValid: false
                }, 
            }, false)

   

    const placeSubmitHandler = event => {
        event.preventDefault()
    }

    return <form className='place-form' onSubmit={placeSubmitHandler}>
        
        <Input id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.' 
            onInput={inputHandler}
        />

        <Input id='description'
            element='textarea'
            label='Description' 
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (atleast 5 characters).' 
            onInput={inputHandler}
        />

        <Input id='address'
            element='input'
            label='Address' 
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid address.' 
            onInput={inputHandler}
        />

        <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
    
}