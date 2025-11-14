import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hooks'
import useHttpClient from '../../shared/hooks/http-hooks'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

import './PlaceForm.css'

export default function NewPlace() {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const userId = useSelector(state => state.auth.userId)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
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
                image: {
                    value: null,
                    isValid: false
                }
            }, false)


    const placeSubmitHandler = async event => {
        event.preventDefault()
        
        try{
            const formData = new FormData()
            formData.append('title', formState.inputs.title.value)
            formData.append('description', formState.inputs.description.value)
            formData.append('address', formState.inputs.address.value)
            formData.append('creator', userId)
            formData.append('image', formState.inputs.image.value)

            await sendRequest(
                `${backendURL}places`,
                'POST',
                 formData)   
            navigate('/', { replace: false })
        } catch(error) {}

    }

    return <>
    <ErrorModal error={error} onClear={clearError} />
    <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload id='image' onInput={inputHandler} errorText='Please provide an image' />
        <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
    </>
    
}