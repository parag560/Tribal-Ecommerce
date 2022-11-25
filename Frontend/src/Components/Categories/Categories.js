import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  //padding-left:100px;
`;
const Title = styled.h3`
  margin-left: 150px;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  //align-items: center;
  justify-content: center;
`;

const Categorie = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props=>props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 400px;
  height: 200px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
function Categories() {
  return (
    <Container>
      <Wrapper>
        <Title>Top Categories</Title>
        <CardWrapper>
          <Categorie bg={"https://rukminim1.flixcart.com/image/880/1056/knan98w0/shirt/f/g/x/l-shirts-sahi-hai-original-imag2y6uee9f6hag.jpeg?q=50"} >
            <Link style={{ textDecoration: "none", color: "white" }} to="/products/mensclothing">
              <h5>Men's Clothing</h5>
            </Link>
          </Categorie>
          <Categorie bg={"https://www.thehaelli.com/images/large/THS049-Morning%20Love%20Saree-4.jpg"}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/products/womansclothing">
            <h5>Women's Clothing</h5>
            </Link>
          </Categorie>
          <Categorie bg={"https://assets.ajio.com/medias/sys_master/root/hc4/h8a/11019627659294/-1117Wx1400H-460180955-silver-MODEL.jpg"}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/products/accessories">
            <h5>Accessories</h5>
            </Link>
          </Categorie>
          <Categorie bg={"https://images.saatchiart.com/saatchi/1704621/art/8112269/7178875-HSC00001-7.jpg"}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/products/homedecor">
            <h5>Home Decor</h5>
            </Link>
          </Categorie>
          <Categorie bg={"https://imgshopimages.lbb.in/catalog/product/i/m/img_1208_1.jpg"}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/products/footwear">
            <h5>Foot Wear</h5>
            </Link>
          </Categorie>
          <Categorie bg={"https://images.unsplash.com/photo-1553025934-296397db4010?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/products/organics">
            <h5>Organics</h5>
            </Link>
          </Categorie>
        </CardWrapper>
      </Wrapper>
    </Container>
  );
}

export default Categories;
