import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Admin Comp/Navbar/Navbar";
import styled from "styled-components";
import { AddPhotoAlternate } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { userRequest } from "../../publicrequest";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const FormWrapper = styled.div`
  margin-top: 30px;
  margin-right: 60px;
  flex: 1;
`;
const ImgPreview = styled.img`
  width: 100%;
  height: 50%;
`;
const FormGroup = styled.div`
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    padding: 20px;
    font-size: 100;
    font-weight: 300;
    border: none;
    border-bottom: solid 1px #ffc801;
    outline: none;
  }
  input {
    padding: 20px;
    font-size: 100;
    font-weight: 300;
    border: none;
    border-bottom: solid 1px #ffc801;
    outline: none;
  }
`;
const ImgWrapper = styled.div`
  margin-top: 40px;
  flex: 1;
`;
function Addproduct() {
  let [categories, setCate] = useState([]);
  let [color, setColordata] = useState([]);
  let [size, setsizedata] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const sailerid = currentUser._id;
  const [title, settitle] = useState();
  const [desc, setdesc] = useState();
  const [price, setprodprice] = useState();
  let [img, setImg] = useState();


  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
 
  const TOKEN = currentUser?.accessToken;
 



  const handlecate=(e)=>{
    
      categories[0]=(e.target.value);
      console.log(categories);
  }
  const handleColor = (e) => {
    if (color.includes(e.target.value) || e.target.value === "") {
      return;
    } else {
      color.push(e.target.value);

      console.log(color);
    }
  };

  const handleSize = (e) => {
    if (size.includes(e.target.value || e.target.value === "")) {
      return;
    } else {
      size.push(e.target.value);

      console.log(size);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    } else {
      setImg(null);
    }
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
console.log(img);
console.log(categories);
const formData=new FormData();
formData.append("img",img);


 const res= await  userRequest.post("/products/registerproduct", {
      title,
      desc,
      sailerid,
      file:img,
      categories,
      size,
      color,
      price,
      isSailer:true,
      inStock:true
    },{headers: { token: `Bearer ${TOKEN}` }}).then(async()=>{ const res1= await  userRequest.post("/products/registerproduct1", formData,{headers: { token: `Bearer ${TOKEN}`,'content-type':'multipart/form-data' }});})
    //const res1= await  userRequest.post("/products/registerproduct1", formData,{headers: { token: `Bearer ${TOKEN}`,'content-type':'multipart/form-data' }});
  };

 
  return (
    <div>
      <Navbar />
      <Container>
        <FormWrapper>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <label htmlFor="proname">Product Name : </label>
              <input
                size={30}
                id="proname"
                type="text"
                required
                onChange={(e) => settitle(e.target.value)}
                placeholder="Add Product name"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="proname">Product Description</label>
              <textarea
                required
                id="prodesc"
                onChange={(e) => setdesc(e.target.value)}
                placeholder="Add Product desc"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="proname">Product price : </label>
              <input
                size={30}
                id="proname"
                type="number"
                required
                onChange={(e) => setprodprice(e.target.value)}
                placeholder="price"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="procolor">Select Product Category</label>
              <select onChange={(e) =>handlecate(e)}>
              <option value=""></option>
                <option value="mensclothing">Men's Clothing</option>
                <option value="womansclothing">Woman's Clothing</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
                <option value="homedecor">Home decor</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label htmlFor="prosize">Sizes Available</label>
              <select
                disabled={categories === "footwear"}
                onChange={(e) => handleSize(e)}
              >
                <option></option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">xl</option>
              </select>
            </FormGroup>

            {categories === "footwear" && (
              <FormGroup>
                <label htmlFor="prosize">Sizes Available</label>
                <select onChange={(e) => handleSize(e)}>
                  <option></option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </FormGroup>
            )}

            <FormGroup>
              <label htmlFor="procolor">Colors Available</label>
              <select onChange={(e) => handleColor(e)}>
                <option></option>
                <option value="red">Red</option>
                <option value="navyblue">Navyblue</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="grey">Grey</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Add Image</label>
              <label style={{ cursor: "pointer" }} htmlFor="proimg">
                <AddPhotoAlternate />
                <input
                  style={{ display: "none" }}
                  id="proimg"
                  required
                  type="file"
                  name="img"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => handleFile(e)}
                />
              </label>
            </FormGroup>
            <FormGroup>
              <button type="submit">Add Product</button>
            </FormGroup>
          </form>
        </FormWrapper>
       
      </Container>
    </div>
  );
}

export default Addproduct;
