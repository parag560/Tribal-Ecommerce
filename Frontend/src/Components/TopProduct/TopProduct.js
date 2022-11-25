import React from "react";
import Carousel from "react-elastic-carousel";
import Cards from "./Card"
import styled from "styled-components";
const Title=styled.h3`
margin-left:150px;
`
function TopProduct() {
  return (
    <div>
    <div>
      <Title>
        Top products
      </Title>
    </div>
<div style={{marginLeft:"0px" }}>
      <Carousel itemsToShow={3} itemsToScroll={3} enableAutoPlay={true} pagination={false} autoPlaySpeed={10000} easing={"ease"}>
        <Cards img="https://5.imimg.com/data5/NB/GV/AC/SELLER-89808167/digital-saree-draping-service-without-models-500x500.jpg"/>
        <Cards img="https://5.imimg.com/data5/SELLER/Default/2021/3/SN/DI/GE/51878585/jute-bags-product-photography-services-500x500.jpg"/>
        <Cards img="https://ckstudio.in/wp-content/uploads/2021/03/Model-Mayank-Creative-King-Studio-15.jpg"/>
        <Cards img="https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
        <Cards img="https://5.imimg.com/data5/NB/GV/AC/SELLER-89808167/digital-saree-draping-service-without-models-500x500.jpg"/>
        <Cards img="https://5.imimg.com/data5/SELLER/Default/2021/3/SN/DI/GE/51878585/jute-bags-product-photography-services-500x500.jpg"/>
       
      </Carousel>
      
    </div>
    </div>
    
  );
}

export default TopProduct;
