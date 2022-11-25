import React from 'react'
import styled from "styled-components";



const ProductCard=styled.div`
width:100%;
height: 100%;
display: flex;
flex-direction: column;
`;
const ImgContainer=styled.div`
width: 100%;
height: 50%;
img{
    width: 100%;
    height: 100%;
}
`;
const TitleContainer=styled.div`
text-align: center;
`;
function Product() {
  return (
    <ProductCard>
    <ImgContainer>
           <img src='https://5.imimg.com/data5/SELLER/Default/2021/3/SN/DI/GE/51878585/jute-bags-product-photography-services-500x500.jpg' alt=''/>
    </ImgContainer>
    <TitleContainer>
          <p>Jute Bag</p>
          <p>$4</p>
    </TitleContainer>
</ProductCard>
  )
}

export default Product