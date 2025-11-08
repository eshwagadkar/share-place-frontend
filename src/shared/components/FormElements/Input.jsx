import { useReducer, useEffect } from 'react'
import { validate } from '../../utils/validators'
import './Input.css'

const inputReducer = (state, action) => {

    switch (action.type) {
        case 'CHANGE': {
            return {
                ...state,
                value: action.payload,
                isValid: validate(action.payload, action.validators)
            }
        }

        case 'TOUCH': {
            return {
                ...state,
                isTouched: true  
            }
        } 

        default:
            return state
    }
}

export default function Input({ 
                    element, 
                    id,
                    label, 
                    type,
                    placeholder,
                    rows,
                    errorText, 
                    validators, 
                    initialValue,
                    initialIsValid,
                    onInput, 
                }) {

    const [inputState, dispatch] = useReducer(inputReducer, { 
        value :  initialValue || '', 
        isTouched: false,
        isValid: initialIsValid || false
    })

    const { value, isValid } = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    function changeHandler (event) {
        dispatch({ type: 'CHANGE', payload: event.target.value, validators })
    }

    function touchHandler () {
        dispatch({ type: 'TOUCH' })
    }
    
    const dynamicElement = element === 'input' ? 
    <input id={id}
           type={type}
           placeholder={placeholder} 
           onChange={changeHandler} 
           onBlur={touchHandler}
           value={inputState.value}
    /> :
    <textarea id={id} 
              rows={rows || 3} 
              onChange={changeHandler}
              onBlur={touchHandler}
              value={inputState.value}
    />
    
    return (
        <div className={`form-control ${(!inputState.isValid && inputState.isTouched) && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            { dynamicElement }
            {(!inputState.isValid && inputState.isTouched) && <p>{errorText}</p>}
        </div>
    )
}