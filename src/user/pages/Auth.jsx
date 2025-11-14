import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Card from '../../shared/components/UI/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/form-hooks'
import useHttpClient from '../../shared/hooks/http-hooks'
import { authActions } from '../../store/auth-slice'

import './Auth.css'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

export default function Auth() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    
    useEffect(() => {
       if (isLoggedIn) {
        navigate('/', { replace: false })   // redirect to home
      }
    }, [isLoggedIn, navigate])

    const [isLoginMode, setIsLoginMode] = useState(false)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    const [inputHandler, 
           formState, 
           setFormData
          ] = useForm(
            { email: { value: '',isValid: false },
              password: { value: '', isValid: false }
            }, false)

    console.log(formState)

    const authSubmitHandler = async event => {
      event.preventDefault()

      if(isLoginMode) {
        try{
          const responseData = await sendRequest(
            'http://localhost:4003/api/v1/users/signin', 
            'POST',
            JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value, 
            }), 
            { 'Content-Type': 'application/json' })

            dispatch(authActions.login({
              userId: responseData.user.id,
              isLoggedIn: true
            }))
        } catch(error) { console.log(error)}

      } else {
        try {
          const responseData = await sendRequest(
            'http://localhost:4003/api/v1/users/signup',
            'POST',
             JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value, 
              }),
             { 'Content-Type': 'application/json' })

             console.log(responseData.user.id)
             
             dispatch(authActions.login({
              userId: responseData.user.id,
              isLoggedIn: true
              }
             ))
        } catch(error) { console.log(error) }
      }
    }

    const switchModeHandler = () => {
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                  value: null,
                  isValid: false
                }
            }, false)
        }

        setIsLoginMode(prevMode => !prevMode)
    }

   return <>
    <ErrorModal onClear={clearError} error={error}/> 
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay /> }
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>

        { !isLoginMode &&
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
           />
         }

        { !isLoginMode && <ImageUpload id='image' center onInput={inputHandler} errorText='Something went wrong!' />}
          
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP' }
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
   </>
}