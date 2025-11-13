import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hooks'
import Card from '../../shared/components/UI/Card'
import useHttpClient from '../../shared/hooks/http-hooks'
import './PlaceForm.css'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import { useNavigate } from 'react-router-dom'

export default function UpdatePlace() {
    const [loadedPlace, setLoadedPlace] = useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const navigate = useNavigate()
    const userId = useSelector(state => state.auth.userId)
    const placeID = useParams().placeId

    const [inputHandler, formState, setFormData] = useForm({
               title: {
                    value: '',
                    isValid: false
                },
                description: {
                    value: '',
                    isValid: false
                }
    }, false )

    useEffect(() => {

        async function fetchPlace() {
            try {
              const responseData = await sendRequest(
                `http://localhost:4003/api/v1/places/${placeID}`)
              setLoadedPlace(responseData.place)  
                setFormData({
                  title: {
                    value: responseData.place.title,
                    isValid: true
                  },
                  description: {
                    value: responseData.place.description,
                    isValid: true
                  }
                 }, true)
            } catch(error) {}

        }

        fetchPlace()

     },[sendRequest, placeID, setFormData])

    const placeUpdateSubmitHandler = async event => {
        event.preventDefault()

        try{
          await sendRequest(`http://localhost:4003/api/v1/places/${placeID}`, 
                            'PATCH',
                            JSON.stringify({
                              title: formState.inputs.title.value,
                              description: formState.inputs.description.value
                            }),
                            { 'Content-Type': 'application/json' }
                          )
          navigate(`/${userId}/places`, { replace: false } )                
        } catch(error) {}
    }
    
    if(isLoading){ return <div className='center'><LoadingSpinner /></div> }

    if(!loadedPlace && !error) {
      return <div className='center'><Card><h2>Could not find place!</h2></Card></div>
    }

    return <>
       <ErrorModal onClear={clearError} error={error}/>
      {!isLoading && loadedPlace && <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
        
        <Input 
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialIsValid={true}
        />

        <Input 
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (min. 5 characters).'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialIsValid={true}
        />

        <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
      </form>}
    </>
}