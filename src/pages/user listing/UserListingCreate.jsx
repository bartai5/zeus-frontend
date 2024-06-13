import AxiosInstance from "../../utils/AxiosInstance";
import DropDown from "../../components/form/DropDown";
import InputField from "../../components/form/InputField";
import InputTextarea from "../../components/form/InputTextarea";
import ButtonInput from "../../components/form/ButtonInput";
import NavBar from "../../components/navigation/NavBar";
import "./UserListingCreate.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserListingCreate = () => {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("userDetails"));

  const host_name = userInfo.first_name + " " + userInfo.last_name;
  const host_initials = host_name.charAt(0).toUpperCase() + host_name.charAt(1).toUpperCase();

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  const initialFormData = {
    host_initials: host_initials,
    host_name: host_name,
    property_title: "",
    slug: "",
    property_type: "",
    property_price: "",
    bedroom_no: "",
    bathroom_no: "",
    property_location: "",
    contact_info: "",
    property_description: "",
    images: [],
  };

  const [postData, setPostData] = useState(initialFormData);
  const [postImages, setPostImages] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setPostImages((prevImages) => [...prevImages, ...files]);
  };

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setPostImages((prevImages) => [
        ...prevImages,
        ...Array.from(e.target.files),
      ]);
    } else if (e.target.name === "property_title") {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
        slug: slugify(e.target.value.trim()),
      });
    } else {
      setPostData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      postImages.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("host_initials", postData.host_initials);
      formData.append("host_name", postData.host_name);
      formData.append("property_title", postData.property_title);
      formData.append("slug", postData.slug);
      formData.append("property_type", postData.property_type);
      formData.append("property_price", postData.property_price);
      formData.append("bedroom_no", postData.bedroom_no);
      formData.append("bathroom_no", postData.bathroom_no);
      formData.append("property_location", postData.property_location);
      formData.append("contact_info", postData.contact_info);
      formData.append("property_description", postData.property_description);

      const response = await AxiosInstance.post(
        "/api/user/create-post/",
        formData
      );
      console.log(response.data);
      alert("Listing Created Successfully");
      setPostData(initialFormData);
      setPostImages([]);
      navigate('/')
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating the listing");
    }
  };

  const removeImage = (index) => {
    const newImages = [...postImages];
    newImages.splice(index, 1);
    setPostImages(newImages);
  };

  return (
    <section className="user-listing-create">
      <NavBar />
      <form className="listing-container" method="POST" onSubmit={handleSubmit}>
        <div className="list-container image-upload">
          <div className="image-upload-title">
            <h2 className="i-title">Upload Property Images</h2>
            <p className="i-subtitle">
              Upload files you want to share to the listing
            </p>
          </div>
          <div
            className="drag-drop-section"
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {isDragging ? (
              <div className="col after-drag">
                <span className="drop-here">DROP HERE</span>
              </div>
            ) : (
              <div className="col before-drag">
                <FaCloudUploadAlt className="cloud-icon" />
                <p className="p-tag">Drag and drop files here</p>
                <p className="p-tag">OR</p>
                <button
                  className="btn-primary browse-files"
                  onClick={(e) => {
                    e.preventDefault;
                    inputRef.current.click();
                  }}
                >
                  Browse Files
                </button>
                <input
                  type="file"
                  name="images"
                  multiple
                  ref={inputRef}
                  className="file-browser"
                  onChange={handleChange}
                  accept="images/*"
                />
              </div>
            )}
          </div>
          <div className="uploaded-files">
            {postImages.map((image, index) => (
              <div key={index} className="file-preview">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="preview-image"
                />
                <div className="file-info">
                  <p className="file-name">{image.name}</p>
                  <p className="file-size">
                    {(image.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <IoClose
                  className="close-icon"
                  onClick={() => removeImage(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="list-container listing-section">
          <div className="my-form">
            <InputField
              inputName={"host_initials"}
              inputType={"text"}
              labelName={"Host Initials"}
              placeholder={"Enter Host Initials"}
              inputId="user_initials"
              value={postData.host_initials}
              onChange={handleChange}
            />
            <InputField
              labelName={"Property Title"}
              placeholder={"Enter Property Title"}
              inputName={"property_title"}
              inputType={"text"}
              value={postData.property_title}
              onChange={handleChange}
            />
            <InputField
              labelName={"Property Slug"}
              placeholder={"Enter Property Slug"}
              inputName={"slug"}
              inputType={"text"}
              value={postData.slug}
              onChange={handleChange}
              // inputId="user_initials"
            />
            <DropDown
              labelName={"Property Type"}
              inputName={"property_type"}
              onChange={handleChange}
              value={postData.property_type}
            />
            <InputField
              labelName={"Price"}
              placeholder={"Enter Price"}
              inputName={"property_price"}
              inputType={"number"}
              value={postData.property_price}
              onChange={handleChange}
            />
            <div className="bath-bed-container">
              <InputField
                labelName={"Bedrooms"}
                placeholder={"Enter Number of Bedrooms"}
                inputName={"bedroom_no"}
                inputType={"number"}
                value={postData.bedroom_no}
                onChange={handleChange}
              />
              <InputField
                labelName={"Bathrooms"}
                placeholder={"Enter Number of Bathrooms"}
                inputName={"bathroom_no"}
                inputType={"number"}
                value={postData.bathroom_no}
                onChange={handleChange}
              />
            </div>
            <InputField
              labelName={"Location"}
              placeholder={"Enter Location of the Property"}
              inputName={"property_location"}
              inputType={"text"}
              value={postData.property_location}
              onChange={handleChange}
            />
            <InputField
              labelName={"Contact Info"}
              placeholder={"Enter Contact Information"}
              inputName={"contact_info"}
              inputType={"text"}
              value={postData.contact_info}
              onChange={handleChange}
            />
            <InputTextarea
              labelName={"Description"}
              placeholder={"Provide a brief description of the property"}
              inputName={"property_description"}
              value={postData.property_description}
              onChange={handleChange}
            />
            <ButtonInput
              buttonType={"submit"}
              buttonText={"Create Listing"}
              cName={"btn-primary"}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default UserListingCreate;
