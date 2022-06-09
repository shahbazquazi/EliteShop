import React, { useEffect, useState } from "react";
import "./CreateNewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewProductAdmin,
  clearErrors,
} from "../../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../../layout/title/MetaData";
import Sidebar from "../../../pages/dashboard/Sidebar";
import { ADMIN_CREATE_PRODUCT_RESET } from "../../../constants/productConstant";
import { FaSpellCheck } from "react-icons/fa";
import {
  MdAttachMoney,
  MdDescription,
  MdAccountTree,
  MdStorage,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

function CreateNewProduct() {
  //image compression option
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true
  }
  //Dispatch
  const dispatch = useDispatch();
  //Alert
  const alert = useAlert();
  //To navigate
  const navigate = useNavigate();
  //Get the values from product state
  const { loading, error, success } = useSelector((state) => state.newProduct);
  //States
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  //Product categories
  const categories = [
    "Fashion",
    "Laptop",
    "Mobiles",
    "Cameras",
    "Appliances",
    "Beauty Products",
  ];

  //useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product is created successfully");
      navigate("/dashboard");
      dispatch({ type: ADMIN_CREATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  //Submit form data
  const createProductFormSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createNewProductAdmin(myForm));
  };

  //Image onchange
  const createProductImagesOnChange = (e) => {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);

      files.forEach(async (file) => {
          const reader = new FileReader();

          const compressedFile = await imageCompression(file, options);
          
          reader.onload = () => {
          if(reader.readyState === 2) {
             setImagesPreview((prevImg) => [...prevImg, reader.result]);
             setImages((prevImg) => [...prevImg, reader.result]);
          };
        };
         reader.readAsDataURL(compressedFile);
      });
  } 

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductFormSubmit}
          >
            <h1>Create Product</h1>

            <div>
              <FaSpellCheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <MdDescription />
              <textarea
                type="text"
                placeholder="Description"
                cols="30"
                rows="1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <MdAccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="Category">Category</option>
                {categories.map((item) => {
                 return <option key={item} value={item}>
                    {item}
                  </option>;
                })}
              </select>
            </div>

            <div>
              <MdStorage />
              <input
                type="text"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>


            <div className="createProductFormFile">
              <input 
              type="file" 
              name="avatar" 
              accept="image/*" 
              onChange={createProductImagesOnChange}
              multiple

              />
            </div>

            <div className="createProductFormImage">
              {imagesPreview.map((image, index) => {
                return <img key={index} src={image} alt="Product Preview" />;
              })}
            </div>

            <Button
              className="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateNewProduct;
