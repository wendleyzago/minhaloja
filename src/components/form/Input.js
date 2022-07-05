
import style from "./Input.module.css"

function Input({type, name, placeholder, text, handleChange, value, maxlength}) {
    

    return (
    
        <div className={style.line_input}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder}
                onChange={(e) => handleChange(e.target.value) }  
                value={value || ""} 
                maxLength={maxlength}
            />
        </div>
    )
}

export default Input