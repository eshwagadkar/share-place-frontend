import { useReducer } from 'react'
import './Input.css'

const inputReducer = (state, action) => {

    switch (action.type) {
    
        case 'CHANGE': 
            return {
                ...state,
                value: action.payload,
                isValid: true
            }
        default:
            return state
    }


}

export default function Input({ element, id, label, type, placeholder, rows, errorText }) {


    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isValid: false })


    function changeHandler (event) {
        dispatch({ type: 'CHANGE', payload: event.target.value })
    }
    
    const dynamicElement = element === 'input' ? 
    <input id={id}
           type={type}
           placeholder={placeholder} 
           onChange={changeHandler} 
           value={inputState.value}

    /> :
    <textarea id={id} 
              rows={rows || 3} 
              onChange={changeHandler}
              value={inputState.value}
    />
    
    return (
        <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            { dynamicElement }
            {!inputState.isValid && <p>{errorText}</p>}
        </div>
    )
}