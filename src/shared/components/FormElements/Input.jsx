import './Input.css'

export default function Input({ element, id, label, type, placeholder, rows }) {
    
    const dynamicElement = element === 'input' ? 
    <input id={id} type={type} placeholder={placeholder} /> :
     <textarea id={id} rows={rows || 3}/>
    
    return (
        <div className={`form-control`}>
            <label htmlFor={id}>{label}</label>
            { dynamicElement }
        </div>
    )
}