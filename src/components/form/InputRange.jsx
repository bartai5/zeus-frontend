const InputRange = ({labelName, value, onChange}) => {
  return (
    <div className="filter-control">
        <label>{labelName}</label>
        <div className="price-range-input">
            <input type="number" placeholder="Min" value={value} onChange={onChange} name="minimum_price" className="price-range"/>
            <label >To</label>
            <input type="number" placeholder="Max" value={value} onChange={onChange} name="maximum_price" className="price-range"/>
        </div>
    </div>
  )
}

export default InputRange