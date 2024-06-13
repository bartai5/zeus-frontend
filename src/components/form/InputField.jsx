const InputField = ({inputType,labelName, placeholder, inputName, onChange, value, inputId}) => {
  return (
    <div className="filter-control" id={inputId}>
        <label>{labelName}</label>
        <input type={inputType} placeholder={placeholder} name={inputName} value={value} onChange={onChange} required/>
    </div>
  )
}

export default InputField