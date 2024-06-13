import { useState, useRef } from "react";
import TextInput from "../../components/form/TextInput";
import { IoMdLock } from "react-icons/io";
import ButtonInput from "../../components/form/ButtonInput";
import { Link, useNavigate } from 'react-router-dom'
import "./Auth.css";
import { RiUserFill } from "react-icons/ri";

import AxiosInstance from '../../utils/AxiosInstance'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/Constants";

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const clearForm = () => {
    setFormData({
      ...formData,
      password: '',
      username: ''
    })
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleLogin = async (e)=>{
    setLoading(!loading)
    e.preventDefault()
    try{
      const response = await AxiosInstance.post('/api/token/', formData);
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      const userDetailsRes = await AxiosInstance.get('/api/user/');
      localStorage.setItem('userDetails', JSON.stringify(userDetailsRes.data));
      clearForm();
      navigate('/')
    }
    catch(error){
      console.log('====================================');
      console.log(error);
      console.log('====================================');

      if(error.response && error.response.status === 401){
        alert('Invalid credentials');
        clearForm();
      }else{
        alert('An error occured. Please try again later');
        clearForm();
      }
    }
    finally{
      setLoading(false)
      clearForm();
    }
  }
  return (
    <div className="auth">
      <form method="POST" className="auth__form" ref={form} onSubmit={handleLogin}>
        <h2 className="form--title">Login</h2>
        <TextInput
          labelName={"Username"}
          inputIcon={<RiUserFill />}
          inputType={"text"}
          placeholder={"john28"}
          inputName={"username"}
          onChange={handleFormChange}
          value={formData.username}
          cName={"input--text"}
        />
        <TextInput
          labelName={"Password"}
          inputIcon={<IoMdLock />}
          inputType={"password"}
          placeholder={"**********"}
          inputName={"password"}
          onChange={handleFormChange}
          value={formData.password}
          cName={"input--text"}
        />
        <ButtonInput buttonText={loading ? "Authenticating..." : "Login"} buttonType={"submit"}  cName={'submit-btn'}/>
        <p className="auth__form--text">
          Don`t have an account yet? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
