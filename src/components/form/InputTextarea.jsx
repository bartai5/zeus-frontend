const InputTextarea = ({labelName, inputName, placeholder, onChange, value}) => {
  return (
    <div className="filter-control">
        <label>{labelName}</label>
        <textarea name={inputName} placeholder={placeholder} onChange={onChange} value={value}></textarea>
    </div>
  )
}

export default InputTextarea