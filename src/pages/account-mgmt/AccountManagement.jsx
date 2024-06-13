import { FaArrowLeft, FaTools } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AccountManagement.css";
import TextInput from "../../components/form/TextInput";
import AxiosInstance from "../../utils/AxiosInstance";
import { useState, useEffect } from "react";

const AccountManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });



  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await AxiosInstance.get(`/api/user/${id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserDetails()
  }, [id]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteUser = async () => {
    try {
      if (confirm("Are you sure you want to delete your account?")) {
        const response = await AxiosInstance.delete(`api/user/${id}/`);
        if (response.status === 204) {
          localStorage.clear();
          alert("Account deleted successfully");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete account. Please try again later.");
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.patch(
        `api/user/${id}/`,
        userDetails
      );
      if (response.status === 200) {
        alert("Profile updated successfully");
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        setUserDetails(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <section className="account__mgmt-section">
      <div className="mgmt-section">
        <Link to="/" className="back-btn">
          <FaArrowLeft /> Back to listing
        </Link>
        <form
          className="manage-profile"
          method="POST"
          onSubmit={handleUserUpdate}
        >
          <h2 className="acc-mgmt-title">
            <FaTools /> Account Management
          </h2>
          <div className="form-elements">
            <TextInput
              labelName={"First Name"}
              inputType={"text"}
              inputName={"first_name"}
              placeholder={"John"}
              cName={"input-text"}
              value={userDetails?.first_name}
              onChange={handleChange}
            />
            <TextInput
              labelName={"Last Name"}
              inputType={"text"}
              inputName={"last_name"}
              placeholder={"Doe"}
              cName={"input-text"}
              value={userDetails?.last_name}
              onChange={handleChange}
            />
            <TextInput
              labelName={"Email"}
              inputType={"email"}
              inputName={"email"}
              placeholder={"johndoe28@gmail.com"}
              cName={"input-text"}
              value={userDetails?.email}
              onChange={handleChange}
            />
            <TextInput
              labelName={"Username"}
              inputType={"text"}
              inputName={"username"}
              placeholder={"johndoe28"}
              cName={"input-text"}
              value={userDetails?.username}
              onChange={handleChange}
            />
            <div className="profile-buttons">
              <button className="profile-button update-profile" type="submit">
                Update Profile
              </button>
              <button
                onClick={handleDeleteUser}
                className="profile-button delete-profile"
                type="button"
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountManagement;
