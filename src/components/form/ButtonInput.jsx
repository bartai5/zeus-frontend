const ButtonInput = ({buttonText, buttonType, onClick, cName}) => {
  return (
    <div className="form-element form-btn">
        <button type={buttonType} onClick={onClick} className={cName}>{buttonText}</button>
    </div>
  )
}

export default ButtonInput