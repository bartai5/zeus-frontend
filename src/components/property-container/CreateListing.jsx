import {Link} from 'react-router-dom';
const CreateListing = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userInitials = userDetails.first_name.charAt(0) + userDetails.last_name.charAt(0);
  return (
    <div className="create-listing">
      <div className="listing-profile">
        <div className="listing__user-profile">{userInitials}</div>
        <p className="listing__profile-text">
          Hi there {userDetails.username}, Do you have a property that you need to rent out or sell?
        </p>
      </div>
      <hr className="split" />
      <div className="listing-cta">
        <Link to='/create-listing' className="listing-button">Create Listing</Link>
      </div>
    </div>
  );
};

export default CreateListing;
