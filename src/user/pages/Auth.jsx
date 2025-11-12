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
import { authActions } from '../../store/auth-slice'

import './Auth.css'

export default function Auth() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    
    useEffect(() => {
       if (isLoggedIn) {
        navigate('/', { replace: true })   // redirect to home
      }
    }, [isLoggedIn, navigate])

    const [isLoginMode, setIsLoginMode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const [inputHandler, 
           formState, 
           setFormData
          ] = useForm(
            { email: { value: '',isValid: false },
              password: { value: '', isValid: false }
            }, false)

    const authSubmitHandler = async event => {
      event.preventDefault()

      setIsLoading(true)

      if(isLoginMode) {
         try {
          const response = await fetch('http://localhost:4001/api/v1/users/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value, 
            }),
          })

          const responseData = await response.json()
          
          if(!response.ok){
            throw new Error(responseData.message)
          }

          setIsLoading(false)
          dispatch(authActions.login())

        } catch(err) { 
          setIsLoading(false)
          setError(err.message || 'Something went wrong, please try again.')
        }
      } else {
        try {
          const response = await fetch('http://localhost:4001/api/v1/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value, 
            }),
          })

          const responseData = await response.json()
          
          if(!response.ok){
            throw new Error(responseData.message)
          }

          setIsLoading(false)
          dispatch(authActions.login())

        } catch(err) {
          console.log(err)
          setIsLoading(false)
          setError(err.message || 'Something went wrong, please try again.')
        }
      }
    }

    const switchModeHandler = () => {
        if(!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }

        setIsLoginMode(prevMode => !prevMode)
    }

    const errorHandler = () => setError(null)

   return <>
    { error && <ErrorModal onClear={errorHandler} error={error}/>} 
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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
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