import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
width: 300px;
height: 500px;

//text-align: center;

`;
const ImgWrapper = styled.div`
width: 100%;
height: 70%;
img{
  width: 100%;
  height: 100%;
}
`;
const TitleWrapper = styled.div`

`;
const CateWrapper = styled.div`
padding-left: 10px;
`;
const DetailWrapper = styled.div`
padding-left:10px;
font-weight: 600;
`;
function Cards(props) {
  return (
    <div>
      <CardWrapper>
        <ImgWrapper>
          <img
            src={props.img}
            alt=""
          />
        </ImgWrapper>
        <TitleWrapper>
          <CateWrapper>
            <p>Bags</p>
          </CateWrapper>
          <DetailWrapper>
            <p>Jute Bag</p>
            <p>$4</p>
          </DetailWrapper>
        </TitleWrapper>
      </CardWrapper>
    </div>
  );
}

export default Cards;
