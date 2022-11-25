import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";

import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
//import { ClearIcon } from "@material-ui/icons";
import ClearIcon from '@material-ui/icons/Clear'
import { userRequest } from "../../publicrequest";
import { updateCart,emptyCart } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
const KEY="pk_test_51KvFdhSDCgOqT7WDzq1383r3DbwDQmbuihpH6EkIeJ0MXbjCdmYOO7UOHoZvZqtJBa1hrBb7S5pBGl8IujvGOT08000uD7ntiq"
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 30vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [price, setPrice] = useState("");
  const [stripeToken, setStripeToken] = useState(null);
  const cid=currentUser.cart._id;
  const dispatch=useDispatch();
  const STRIPE_KEY = "sk_test_51KvFdhSDCgOqT7WDIZ4pnWvOLEPr3KtjZty7BG31858hAIr7RkJwoZQRITJoe3GcmmGgpZ8ybNPs8twdnc5HHU9e00ilTFveoI"
  const onToken= async(token)=>{
    console.log(token);
      setStripeToken(token)  
      console.log(stripeToken);
    if(token){
    //  console.log(stripeToken);
      const res=await userRequest.post(`/cart/placeorder/${currentUser._id}/${price}`);
      console.log(res);
      if(res){
        console.log(res);
       dispatch(emptyCart([]))
       
      } 
    }
  }
  const calcultePrice = () => {
    let cprice = 0;
    if (currentUser) {
      currentUser.cart.products.map((item) => {
        return (cprice += item.quantity * item.price);
      });
    } else {
      cprice = 0;
    }

    setPrice(cprice);
  };
  const ClearIndividualProduct=async (id)=>{
   // console.log(cid)
    console.log(id)
   const response=await userRequest.put(`/cart/deleteproductfromcartbyproductid/${cid}/${id}`);
  
  console.log(response.data);
    dispatch(updateCart(response.data));
     
    
  }
  useEffect(() => {
    let cprice = 0;
    if (currentUser) {
      currentUser.cart.products.map((item) => {
        return (cprice += item.quantity * item.price);
      });
    } else {
      cprice = 0;
    }

    setPrice(cprice);
    console.log(price);
    
  },[price,currentUser]);
  return (
    <Container>
      <Navbar />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>
              Shopping Bag({0})
            </TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {currentUser ? (
              currentUser.cart.products.map((item, index) => {
                return (
                  <div>
                    
                    <Product key={index}>
                      <ProductDetail>
                        <Image
                          src={`http://localhost:5000/uploads/${item.title}.png`}
                        />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {item.title}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {item.productId}
                          </ProductId>
                          <ProductColor color={item.color} />
                          <ProductSize>
                            <b>Size:</b> {item.size}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                      <button onClick={()=>ClearIndividualProduct(item.productId)} style={{border:"none", background:"transparent",cursor:"pointer"}}>
                      <ClearIcon ></ClearIcon>
                      </button>
                      
                        <ProductAmountContainer>
                          Quantity :
                          <ProductAmount>{item.quantity}</ProductAmount>
                        </ProductAmountContainer>
                        <ProductPrice>
                          <span>&#x20B9;</span> {item.price}
                        </ProductPrice>
                      </PriceDetail>
                    </Product>
                    <hr />
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <h3>Start Shopping</h3>
              </div>
            )}
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                <span>&#x20B9;</span> {price}
              </SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Tribes India"
              image="https://thumbs.dreamstime.com/b/your-stock-vector-needs-my-vector-very-neat-easy-to-edit-to-edit-you-can-download-eps-tribal-initial-t-logo-icon-vector-128600277.jpg"
              billingAddress
              shippingAddress
              description={`Your Total is ${price} INR`}
              amount={price*100}
              token={onToken}
              stripeKey={KEY}
            >

              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
