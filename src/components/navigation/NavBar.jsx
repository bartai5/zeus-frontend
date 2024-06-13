import { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import EstateLogo from '../../assets/logo/estate-logo.svg';
import SearchInput from "../form/SearchInput";
import { FaSearch } from "react-icons/fa";
import { LiaToolsSolid } from "react-icons/lia";
import { LuLogOut } from "react-icons/lu";
import { RiListIndefinite } from "react-icons/ri";

const NavBar = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [toggleAccount, setToggleAccount] = useState(false);

  const userInitials =
    userDetails.first_name.charAt(0) + userDetails.last_name.charAt(0);

  const handleAccountMgmt = () => {
    setToggleAccount(!toggleAccount);
  };

  return (
    <section className="navigation">
      <div className="estate-logo">
        <Link to="/">
          <img src={EstateLogo} alt="Estate Logo" />
        </Link>
      </div>
      <div className="search-estate">
        <SearchInput
          searchIcon={<FaSearch />}
          inputType={"text"}
          placeholder={"Search for properties"}
          inputName={"search"}
          cName={"input-text"}
        />
        <button className="search-btn">Search</button>
      </div>
      <div className="user-profile" onClick={handleAccountMgmt}>
        <div className="profile-pic">{userInitials}</div>
        <span className="user-name">{userDetails.username}</span>
      </div>

      {toggleAccount ? (
        <div className="account-mgmt">
          <Link to="/my-listings" className="acc-mgmt-links my-listings">
            <RiListIndefinite /> My Listings
          </Link>
          <Link
            to={`/user/${userDetails.id}`}
            className="acc-mgmt-links manage-account"
          >
            <LiaToolsSolid /> My Account
          </Link>
          <Link to="/logout" className="acc-mgmt-links logout">
            <LuLogOut /> Logout
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default NavBar;
