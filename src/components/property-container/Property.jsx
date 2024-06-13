import AxiosInstance from "../../utils/AxiosInstance";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare, FaPhoneVolume } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Property = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userDetails")).id;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await AxiosInstance.get("/api/user/posts/");
        setPropertyList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (propertyId) => {
    localStorage.setItem("propertyId", propertyId);
  };

  const handleToggleOptions = (postId) => {
    setActivePostId((prevActivePostId) =>
      prevActivePostId === postId ? null : postId
    );
  };

  const handlePropertyDelete = async (postId) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/user/posts/${postId}/`
      );
      if (response.status === 204) {
        alert("Property Deleted Successfully");
        await AxiosInstance.get("/api/user/posts/").then((response) => {
          setPropertyList(response.data);
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="property-list">
      {propertyList &&
        propertyList.map((property, index) => (
          <div className="property" key={index}>
            <div className="property-host">
              <div className="host-info">
                <div className="host-image">{property.host_initials}</div>
                <div className="host-credentials">
                  <h3 className="host-name">
                    {property.host_name}{" "}
                    <span className="owner-tag">
                      {userId === property.host_id ? "(owner)" : null}
                    </span>
                  </h3>
                  <p className="host-date">
                    {dayjs(property.created_at).format("MMMM DD, YYYY h:mm A")}
                  </p>
                </div>
              </div>
              {/* post-options */}
              {activePostId === property.id ? (
                <div className="post-options">
                  {userId === property.host_id ? (
                    <div
                      className="post-option delete"
                      onClick={() => handlePropertyDelete(property.id)}
                    >
                      <RiDeleteBin6Fill /> Delete Property
                    </div>
                  ) : (
                    <Link
                      to={`tel:${property.contact_info}`}
                      className="post-option call"
                    >
                      <FaPhoneVolume /> Get Property
                    </Link>
                  )}
                </div>
              ) : null}
              <div className="property-cta">
                <CiMenuKebab
                  className="property-cta-btn"
                  onClick={() => handleToggleOptions(property.id)}
                />
              </div>
            </div>
            <div className="property-image">
              <img
                src={property.images[0].image}
                alt={"Propery Profile"}
                className="property-profile-image"
                key={index}
              />
            </div>
            <div className="property-description">
              <div className="title-price">
                <h2 className="property-title">{property.property_title}</h2>
                <span className="property-price">
                  KSHS {property.property_price}
                </span>
              </div>
              <div className="room-specs">
                <p className="rental-type">
                  Rental Type : {property.property_type}{" "}
                </p>
                <span className="col">Bedrooms : {property.bedroom_no}</span>
                <span className="col">Bathrooms : {property.bathroom_no}</span>
              </div>
              <div className="location">
                <p className="location-desc">
                  Location: {property.property_location}
                </p>
                <p className="location-desc">
                  Contact Information: {property.contact_info}
                </p>
              </div>
              <div className="action-btns">
                <div className="property-btns more-desc">
                  <Link
                    to={`/property/${property.slug}`}
                    className="more-desc-btn"
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    More Description <FaArrowUpRightFromSquare />
                  </Link>
                </div>
                <div className="property-btns call-owner">
                  <button className="call-owner-btn">Get Property</button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Property;
