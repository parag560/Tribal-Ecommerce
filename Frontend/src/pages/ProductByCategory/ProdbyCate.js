import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import ProdCard from "../ProductByCategory/ProdCard";
import styled from "styled-components";
import Footer from "../../Components/Footer/Footer";
import { publicRequest } from "../../publicrequest";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`;

const Container = styled.div`
  //padding-left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

function ProdbyCate() {
  const[data,setData]=useState([]);


  let { cate } = useParams();
  console.log(data);
  useEffect(() => {
    (async function () {
      let data = await publicRequest.get(`/products/productbycat/${cate}`);
      setData(data.data);
    })();
  },[cate] );
  if (cate === "mensClothing" || cate === "womensClothing") {
    cate = "Clothing";
  }

  return (
    <div>
      <Navbar />
      <div>
        <h2 style={{ marginLeft: "90px", marginTop: "10px" }}>
          {cate.charAt(0).toUpperCase() + cate.slice(1)}
        </h2>
      </div>
      <div>
        <Container>
          <CardContainer>
          {data.map((item,index)=>{
            return <ProdCard key={index} i={item}/>
          })}
           
          </CardContainer>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default ProdbyCate;
