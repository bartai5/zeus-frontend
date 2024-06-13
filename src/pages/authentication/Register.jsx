import { useState, useRef } from "react";
import TextInput from "../../components/form/TextInput";
import ButtonInput from "../../components/form/ButtonInput";
import { Link, useNavigate } from 'react-router-dom'
import "./Auth.css";
import AxiosInstance from "../../utils/AxiosInstance";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const clearForm = () => {
    setFormData({
      ...formData,
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: ''
    })
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleRegister = async (e)=>{
    setLoading(!loading);
    e.preventDefault();
    try{
      const response = await AxiosInstance.post('api/user/register', formData);
      if (response.status === 201){
        alert("Registration successful. Please login to continue");
        clearForm();
        navigate('/login');
      }
    }
    catch(error){
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  return (
    <div className="auth">
    <form method="POST" className="auth__form" ref={form} onSubmit={handleRegister}>
      <h2 className="form--title">Create An Account</h2>
      <TextInput
        labelName={"First Name"}
        inputType={"text"}
        placeholder={"John"}
        inputName={"first_name"}
        onChange={handleFormChange}
        value={formData.first_name}
        cName={"input--text"}
      />
      <TextInput
        labelName={"Last Name"}
        inputType={"text"}
        placeholder={"Doe"}
        inputName={"last_name"}
        onChange={handleFormChange}
        value={formData.last_name}
        cName={"input--text"}
      />
      <TextInput
        labelName={"Email Address"}
        inputType={"email"}
        placeholder={"johndoe28@gmail.com"}
        inputName={"email"}
        onChange={handleFormChange}
        value={formData.email}
        cName={"input--text"}
      />
      <TextInput
        labelName={"Username"}
        inputType={"text"}
        placeholder={"john28"}
        inputName={"username"}
        onChange={handleFormChange}
        value={formData.username}
        cName={"input--text"}
      />
      <TextInput
        labelName={"Password"}
        inputType={"password"}
        placeholder={"**********"}
        inputName={"password"}
        onChange={handleFormChange}
        value={formData.password}
        cName={"input--text"}
      />
      <ButtonInput buttonText={loading ? "Creating Account..." : "Register"} buttonType={"submit"}  cName={'submit-btn'}/>
      <p className="auth__form--text">
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </form>
  </div>
  )
}

export default Register