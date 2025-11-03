import { useReducer } from 'react'
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

export default function Input({ element, id, label, type, placeholder, rows, errorText, validators }) {


    const [inputState, dispatch] = useReducer(inputReducer, { 
        value: '', 
        isTouched: false,
        isValid: false
    })

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