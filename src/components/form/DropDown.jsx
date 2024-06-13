const DropDown = ({labelName, value, onChange, inputName}) => {
  return (
    <div className='filter-control'>
        <label>{labelName}</label>
        <select name={inputName} value={value} onChange={onChange} required>
            <option value="Rental Type">Rental Type</option>
            <option value="Studio Appartments">Studio Appartments</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condor">Condor</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Duplexes">Duplexes</option>
            <option value="Loft">Loft</option>
        </select>
    </div>
  )
}

export default DropDown