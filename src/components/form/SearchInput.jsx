const SearchInput = ({searchIcon, inputType, placeholder, value, inputName, onChange, cName}) => {
  return (
    <div className="search-input">
      {searchIcon}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={inputName}
        className={cName}
      />
    </div>
  );
};

export default SearchInput;
