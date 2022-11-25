import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined,ArrowDropDown } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import { useNavigate } from "react-router-dom"
import { current } from "@reduxjs/toolkit";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 5px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid lightgray;
  //margin: 10px 0;
`;
const Input = styled.input`
  border: none;
  padding: 12px;
  width: 100%;
`;
const Left = styled.div`
  font-family: "Lobster", cursive;
  font-size: 35px;
  order: 1;
  cursor: pointer;
`;
const Center = styled.div`
  align-items: center;
  order: 2;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  order: 3;
`;

const MenuItem = styled.div`
  margin-left: 25px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 102%;
  z-index: 3;
  background-color: white;
  left: 70%;
  transition:  5s ease-in-out;
`;

const DropdownContentitem = styled.p`
  padding: 0 35px;
`;

function Navbar() {
  const [active, setActive] = useState(false);
const navigate=useNavigate();
  const { isLoggedin } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);
  
  const [img, setImg] = useState();
  
 

  const fetchImage = async () => {
    const imageUrl = `https://avatars.dicebear.com/api/initials/${currentUser.username.charAt(
      0
    )}.svg`;
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };
  useEffect(() => {
    if(isLoggedin){
      fetchImage();
    }
   
  },[isLoggedin] );

  const purge = async () => {
    await persistor.purge()
   window.location.reload()
    console.log("Factory reset performed.")
  }

  return (
    <Container>
      <Wrapper>
       <Link style={{textDecoration:"none",color:"black"}} to="/"><Left>Tribes India</Left></Link> 
        <Center>
          <SearchContainer>
            <Input type="text" size="70" placeholder="Search anything" />
            <Search style={{ margin: "0 10px", cursor: "pointer" }} />
          </SearchContainer>
        </Center>
        <Right>
          {isLoggedin ? (
            <div
              
              style={{ position: "relative", cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    width: "12%",
                    height: "12%",
                    marginRight: "10px",
                  }}
                  src={img}
                  alt=""
                />
                <p>{currentUser.username}</p>
                <ArrowDropDown onClick={() => setActive(!active)}/>
              </div>
              {active ? (
                <DropdownContent>
                  <DropdownContentitem onClick={purge} >Logout</DropdownContentitem>
                {currentUser.isSailer&& <DropdownContentitem  ><Link style={{textDecoration:"none",color:"black"}} to="/seller">Dashboard</Link></DropdownContentitem>}  
                {!currentUser.isSailer&& <DropdownContentitem  > <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/yourorders"
                >
                  Your Orders
                </Link></DropdownContentitem>}  
                </DropdownContent>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <MenuItem>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/register"
                >
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </Link>
              </MenuItem>
            </div>
          )}

          <MenuItem>
          {currentUser&&<Badge badgeContent={currentUser?currentUser.cart.products.length:0} color="primary">
             <Link style={{color:"black"}} to="/cart"><ShoppingCartOutlined /></Link> 
            </Badge>}
          
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
