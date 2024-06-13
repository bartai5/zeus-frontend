import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import "./PropertyDescription.css";

import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const PropertyDescription = () => {
  const propertyId = localStorage.getItem("propertyId");
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          `/api/user/posts/${propertyId}/`
        );
        setPropertyDetails(response.data);
        setPropertyImages(response.data.images);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [propertyId]);

  propertyImages.forEach((image) => {
    imageList.push(image.image);
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length
    );
  };
  console.log(propertyDetails);

  return (
    <section id="propertyDesc">
      {propertyDetails ? (
        <div className="desc__container" key={propertyDetails.id}>
          <div className="return-control">
            <Link
              to="/"
              className="return-link"
              onClick={() => localStorage.removeItem("propertyId")}
            >
              <FaArrowLeft /> Return to listing
            </Link>
          </div>

          <div className="property-preview">
            <div className="preview">
              <img
                src={imageList[currentIndex]}
                alt="carousel"
                className="current-image"
              />
            </div>
            <div className="s-preview">
              <button
                className="carousel-btns previous"
                onClick={handlePrevious}
              >
                <FaArrowLeftLong />
              </button>
              <div className="images-section-preview">
                {imageList.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="carousel"
                    className={currentIndex === index ? "active" : ""}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
              <button className="carousel-btns next" onClick={handleNext}>
              <FaArrowRightLong />
              </button>
            </div>
          </div>

          <div className="property-description">
            <div className="title-price">
              <h2 className="property-title">
                {propertyDetails.property_title}
              </h2>
              <span className="property-price">
                KSHS {propertyDetails.property_price}
              </span>
            </div>
            <div className="property-info">
              {propertyDetails.property_description}
            </div>
            <div className="room-specs">
              <p className="rental-type">
                Rental Type : {propertyDetails.property_type}
              </p>
              <span className="col">
                Bedrooms : {propertyDetails.bedroom_no}
              </span>
              <span className="col">
                Bathrooms : {propertyDetails.bathroom_no}
              </span>
            </div>
            <div className="location">
              <p className="location-desc">
                Location: {propertyDetails.property_location}
              </p>
              <p className="location-desc">
                Contact Details: {propertyDetails.contact_info}
              </p>
            </div>
            <div className="action-btns">
              <div className="property-btns call-owner">
                <button className="call-owner-btn">Get The House</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Ooooops an error occured. Please try again later.</div>
      )}
    </section>
  );
};

export default PropertyDescription;
