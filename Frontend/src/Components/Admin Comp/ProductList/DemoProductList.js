import React from "react";
import { useState, useEffect } from "react";
import { userRequest } from "../../../publicrequest";
import { useSelector } from "react-redux";

import styled from "styled-components";

const Container = styled.div``;
const RowContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ProductIdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const ProductListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;
const ProductListDelete = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  cursor: pointer;
  
`;
const InStockContainer=styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
function DemoProductList() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const sailerid = currentUser._id;
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const TOKEN = currentUser?.accessToken;
  
  useEffect(() => {
    async function fetchData() {
      const response = await userRequest.get(
        `/products/productbysailor/${sailerid}`,
        { headers: { token: `Bearer ${TOKEN}` } }
      );
      setData(response.data);
      setloading(false);
    }
    fetchData();
  }, [data]);

  const handleDelete=async(id)=>{
      const res=await userRequest.delete(
        `/products/productdelete/${id}`,
        { headers: { token: `Bearer ${TOKEN}` } }
      );
      console.log(res);
  }

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Container>
      <RowContainer>
      <ProductIdContainer>
                  <p>Product Id</p>
                </ProductIdContainer>
                <ImgContainer>
                  <p>Product Image</p>
                </ImgContainer>
                <TitleContainer>
                  <p>Title</p>
                </TitleContainer>
                <PriceContainer>
                  <p>
                    Product Price
                  </p>
                </PriceContainer>
                <InStockContainer>
                    <p>In Stock</p>
                </InStockContainer>
                <ActionContainer>
                <p>Action</p>
                </ActionContainer>
      </RowContainer>
        {data.map((item,index) => {
          return (
            <div key={index}>
              <RowContainer>
                <ProductIdContainer>
                  <p>{item._id}</p>
                </ProductIdContainer>
                <ImgContainer>
                  <Image src={item.img} alt="" />
                </ImgContainer>
                <TitleContainer>
                  <p>{item.title}</p>
                </TitleContainer>
                <PriceContainer>
                  <p>
                    <span>&#x20B9;</span> {item.price}
                  </p>
                </PriceContainer>
                <InStockContainer>
                    <p>{item.inStock?"Yes":"No"}</p>
                </InStockContainer>
                <ActionContainer>
                  <ProductListEdit>Edit</ProductListEdit>
                  <ProductListDelete onClick={()=>handleDelete(item._id)}>Delete</ProductListDelete>
                </ActionContainer>
              </RowContainer>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default DemoProductList;
