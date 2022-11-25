import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../publicrequest";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { userRequest } from "../../publicrequest";
import { useSelector } from "react-redux";
import { updateCart } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import Review from "./Review";
import { FaStar } from "react-icons/fa";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 0.8px solid black;
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const ReviewContainer = styled.div`
  margin-top: 20px;
`;
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Product = () => {
  let { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [info, setInfo] = useState();

  const [loading, setloading] = useState(true);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");

  const [bol1, setBol1] = useState();
  const [bol2, setBol2] = useState();
  const { isLoggedin } = useSelector((state) => state.user);
  const [arr, setArr] = useState([]);
  const [stars, setStars] = useState([]);
  const [stars1, setStars1] = useState([]);
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const dispatch = useDispatch();

  const TOKEN = currentUser?.accessToken;
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClick = async () => {
    if (currentUser.isSailer || !isLoggedin) {
      return;
    } else {
      const res = await userRequest.put(
        "/cart/insertproducttocart",
        {
          id: currentUser.cart._id,
          productobj: {
            productId: info._id,
            quantity: quantity,
            color: color,
            title: info.title,
            size: size,
            price: info.price,
            sailerId: info.sailerid,
          },
        },
        { headers: { token: `Bearer ${TOKEN}` } }
      );
      if (res) {
        console.log(res.data);
        dispatch(updateCart(res.data));
      }
    }

    //console.log({ ...info, quantity, color, size });
  };

  /* const revi = ()=>{
    if(arr.length === 1 && arr[0].averagerating === 5)
      {
        stars1 = Array(5).fill(0);
        setBol2(true);
      }
      else if(arr.length === 1 && arr[0].averagerating === 0)
      {
        stars = Array(5).fill(0);
        setBol1(true)
      }
      else if(arr.length === 1 && arr[0].averagerating !== 5 && arr[0].averagerating !==0 )
      {
        stars = Array(Math.round(arr[0].averagerating)).fill(0);
        stars1 = Array(5-Math.round(arr[0].averagerating)).fill(0);
        setBol1(true);
        setBol2(true);
      }
      else if(arr.length === 0 )
      {
        stars1 = Array(5).fill(0);
        setBol2(true);
      }
       

  };*/

  const revi = (arr) => {
    let st;
    let st1;
    if (arr.length === 0) {
      setBol1(false);
      st = Array(5).fill(0);
      setStars1(st);
    } else if (arr.length > 0) {
      setBol1(true);
      setBol2(true);

      st = Array(Math.round(arr[0].averagerating)).fill(0);
      setStars(st);
      st1 = Array(5 - Math.round(arr[0].averagerating)).fill(0);
      setStars1(st1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await publicRequest.get(`/products/productbyid/${id}`);

      setInfo(response.data);

      setArr(response.data.avgrating);
      if (arr) {
        revi(arr);
      }

      //setavgRating(Math.round(response.data.avgrating[0].averagerating));

      setloading(false);
    }
    fetchData();
  }, [arr, id]);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <Container>
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={info.img} alt="" />
        </ImgContainer>
        <InfoContainer>
          {bol1 &&
            stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={15}
                  color={colors.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          {bol2 &&
            stars1.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={15}
                  color={colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          <Title>{info.title}</Title>
          <Desc>{info.desc}</Desc>
          <Price>
            <span>&#x20B9;</span> {info.price}
          </Price>
          {info.categories[0] !== "homedecor" ? (
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {info.color.map((item) => {
                  return (
                    <FilterColor
                      color={item}
                      key={item}
                      onClick={() => setColor(item)}
                    />
                  );
                })}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {info.size.map((item) => {
                    return (
                      <FilterSizeOption key={item}>
                        {item.toUpperCase()}
                      </FilterSizeOption>
                    );
                  })}
                </FilterSize>
              </Filter>
            </FilterContainer>
          ) : (
            <div></div>
          )}

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
          <ReviewContainer>
            {currentUser && (
              <div>
                {" "}
                Add Product Review
                <Review
                  isSailer={currentUser ? currentUser.isSailer : true}
                  userid={currentUser ? currentUser._id : ""}
                  productId={info._id}
                />{" "}
              </div>
            )}
          </ReviewContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
