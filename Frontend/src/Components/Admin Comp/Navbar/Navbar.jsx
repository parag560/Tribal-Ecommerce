import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowDropDown } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 5px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
  transition: 5s ease-in-out;
  border: 1px solid black;
`;

const DropdownContentitem = styled.p`
  padding: 0 35px;
`;

function Navbar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
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
    if (isLoggedin) {
      fetchImage();
    }
  });

  const purge = async () => {
    await persistor.purge();
    window.location.reload();
    console.log("Factory reset performed.");
  };

  return (
    <Container>
      <Wrapper>
        <Left><Link style={{textDecoration:"none",color:"black"}} to="/"><Left>Tribes India</Left></Link> </Left>
        <Center></Center>
        <Right>
          <div style={{ position: "relative", cursor: "pointer" }}>
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
              <ArrowDropDown onClick={() => setActive(!active)} />
            </div>
            {active ? (
              <DropdownContent>
                <DropdownContentitem onClick={purge}>
                  Logout
                </DropdownContentitem>
              </DropdownContent>
            ) : (
              <div></div>
            )}
          </div>
          <div style={{ marginLeft: "10px", }}>
          <Link to={"/addproduct"} style={{textDecoration: "none", color: "black"}}>
            Add Product
          </Link>
          </div>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
