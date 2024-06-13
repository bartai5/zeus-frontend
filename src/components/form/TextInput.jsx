const TextInput = ({ labelName, inputIcon, inputType, onChange, value, placeholder, inputName, cName }) => {
  return (
    <div className="form-element">
      <label>{labelName}</label>
      <div className="input-control">
        {inputIcon}
        <input
          type={inputType}
          placeholder={placeholder}
          name={inputName}
          value={value}
          onChange={onChange}
          className={cName}
          required
        />
      </div>
    </div>
  );
};

export default TextInput;
