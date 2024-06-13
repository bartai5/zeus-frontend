import { useState } from "react";
import "./create.css";
import AxiosInstance from "../../utils/AxiosInstance";

const CreatePost = () => {
    const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
    }

  const initialFormData = {
    image: "",
    title: "",
    slug: "",
    description: "",
  };

  const [postData, updateFormData] = useState(initialFormData);
  const [postImage, setPostImage] = useState(null);

  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      setPostImage({
        image: e.target.files,
      });
      console.log("====================================");
      console.log(e.target.files);
      console.log("====================================");
    }
    if ([e.target.name] == "title") {
      updateFormData({
        ...postData,
        [e.target.name]: e.target.value,
        ["slug"]: slugify(e.target.value.trim()),
      });
    } else {
      updateFormData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", postImage.image[0]);
    formData.append("title", postData.title);
    formData.append("slug", postData.slug);
    formData.append("description", postData.description);
    
    await AxiosInstance.post("/api/user/create/", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="create-post">
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="create-element">
          <label>image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="create-element">
          <label>title</label>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
          />
        </div>
        <div className="create-element">
          <label>slug</label>
          <input
            type="text"
            name="slug"
            value={postData.slug}
            onChange={handleChange}
          />
        </div>
        <div className="create-element">
          <label>description</label>
          <textarea
            name="description"
            value={postData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="create-element">
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
